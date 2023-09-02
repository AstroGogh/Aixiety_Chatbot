import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SendHorizonal } from "lucide-react"
import { Loader2 } from "lucide-react"

interface Props {
    isLoading: boolean,
    inputText: string,
    handleKeyDown: any,
    handleSendMessage: any,
    setInputText: any
}

export default function MessageInput({
    isLoading,
    inputText,
    handleKeyDown,
    handleSendMessage,
    setInputText
}: Props) {

    return (
            <div className="flex items-center justify-between border mx-1 p-2 rounded-l">
                <textarea
                    className="resize-none outline-none w-full"
                    placeholder="Type here"
                    rows={1}
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button
                    className="border-none"
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    variant={"outline"}
                    
                >
                    {isLoading
                        ? <Loader2 className=" animate-spin" />
                        : <SendHorizonal  />
                    }
                </Button>
            </div>
    );
}
