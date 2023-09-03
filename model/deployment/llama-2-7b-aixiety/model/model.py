import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from typing import Dict, List
from huggingface_hub import login
import os

BOS, EOS = "<s>", "</s>"
B_INST, E_INST = "[INST]", "[/INST]"
B_SYS, E_SYS = "<<SYS>>\n", "\n<</SYS>>\n\n"
DEFAULT_SYSTEM_PROMPT = """\
Jika Anda seorang psikolog berlisensi, harap berikan pasien ini tanggapan yang bermanfaat untuk kekhawatiran mereka."""

MODEL_NAME = "VinVanGogh/llama-2-7b-aixiety-v2"

def format_to_llama_chat_style(history) -> str:
    # history is now a list of dictionaries with "instruction" and "response" keys
    prompt = ""
    current_length = 0

    for i, dialog in enumerate(history[:-1]):
        instruction, response = dialog["instruction"], dialog["response"]

        # Calculate the length of the current dialog
        dialog_length = len(instruction.strip()) + len(response.strip())

        # Check if adding this dialog would exceed the maximum length
        if current_length + dialog_length > 1024:
            break  # Stop adding more dialogues if the limit is reached

        # prepend system instruction before first instruction
        if i == 0:
            instruction = f"{B_SYS}{DEFAULT_SYSTEM_PROMPT}{E_SYS}" + instruction
        else:
            # the tokenizer automatically adds a bos_token during encoding,
            # for this reason the bos_token is not added for the first instruction
            prompt += BOS
        prompt += f"{B_INST} {instruction.strip()} {E_INST} {response.strip()} " + EOS

    # new instruction from the user
    new_instruction = history[-1]["instruction"].strip()

    # the tokenizer automatically adds a bos_token during encoding,
    # for this reason the bos_token is not added for the first instruction
    if len(history) > 1:
        prompt += BOS
    else:
        # prepend system instruction before the first instruction
        new_instruction = f"{B_SYS}{DEFAULT_SYSTEM_PROMPT}{E_SYS}" + new_instruction

    prompt += f"{B_INST} {new_instruction} {E_INST}"
    return prompt


class Model:
    def __init__(self, data_dir: str, config: Dict, **kwargs) -> None:
        self._data_dir = data_dir
        self._config = config
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print("THE DEVICE INFERENCE IS RUNNING ON IS: ", self.device)
        self.tokenizer = None
        self.pipeline = None    

    def load(self):
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        model_8bit = AutoModelForCausalLM.from_pretrained(
            MODEL_NAME,
            device_map="auto",
            load_in_8bit=True,
            trust_remote_code=True)

        self.pipeline = pipeline(
            "text-generation",
            model=model_8bit,
            tokenizer=self.tokenizer,
            torch_dtype=torch.bfloat16,
            trust_remote_code=True,
            device_map="auto",
        )

    def predict(self, request: Dict) -> Dict:
        with torch.no_grad():
            try:
                # Use the format_to_llama_chat_style function to format the prompt
                history = request.pop("history")
                prompt = format_to_llama_chat_style(history)
                data = self.pipeline(
                    prompt,
                    do_sample=True,
                    top_k=10,
                    eos_token_id=self.tokenizer.eos_token_id,
                    max_length=2048,
                )[0]

                data = data['generated_text'].replace(prompt, "")
                return {"data": data}

            except Exception as exc:
                return {"status": "error", "data": None, "message": str(exc)}
    
