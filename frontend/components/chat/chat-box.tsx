'use client'

import { useState, useRef, useEffect, useCallback } from "react"
import ChatWindow from "./chat-window";
import MessageInput from "./message-input";
import ChatProfile from "./chat-profile";

import { History } from "@/types/types";

export default function ChatBox() {

    const [histories, setHistories] = useState<History[]>([{
        instruction: '',
        response: 'Halo! Bagaimana kabarnya? Semoga baik-baik saja ya 😊. Ada yang bisa saya bantu hari ini?'
    }])

    const [inputText, setInputText] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSendMessage = useCallback(async () => {
        if (inputText.trim() !== "" && !isLoading) {
            setIsLoading(true)
            setInputText("")

            const history: History = { instruction: inputText.trim(), response: "" }
            // const histories = [...histories, history]
            setHistories([...histories, history])

            const histTemp = [...histories, history]
            console.log(histTemp)

            // "https://10.128.0.62:8080/v1/models/model:predict"
            fetch("https://aixiety.my.id/v1/models/model:predict", {
                method: 'POST',
                body: JSON.stringify({ "history": histTemp.slice(1) }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'*/*',
                    'Origin': '*'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }

                   return response.json()
                })
                .then(data => {
                    console.log(histories)

                    histTemp[histTemp.length - 1].response = data['data'];
                    console.log(histTemp)
                    setHistories(histTemp);
                })
                .catch(error => {
                    console.error('Error:', error)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [inputText, isLoading, histories])

    //@ts-ignore
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSendMessage()
            e.preventDefault()
        }
    }

    const scrollAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isLoading && scrollAreaRef.current) {
            scrollAreaRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [isLoading])

    return (
        <section className="w-full">
            <div className="h-[12vh]">
                <ChatProfile />
            </div>
            <div className="h-[73vh] ">
                <ChatWindow histories={histories} scrollAreaRef={scrollAreaRef} />
            </div>
            <div className="h-[15vh] flex flex-col justify-center p-4">
                <MessageInput
                    isLoading={isLoading}
                    inputText={inputText}
                    handleKeyDown={handleKeyDown}
                    handleSendMessage={handleSendMessage}
                    setInputText={setInputText}
                />
            </div>
        </section>
    );
}
