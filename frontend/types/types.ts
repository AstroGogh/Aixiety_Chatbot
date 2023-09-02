export interface Message{
    role: "assistant" | "user",
    name?: string,
    text: string
}

export interface History{
    instruction: string,
    response: string
}