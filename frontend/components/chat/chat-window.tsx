
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card";

import { AlertOctagon } from "lucide-react";


import ChatCard from "@/components/chat/chat-card"
import { History } from '@/types/types'
import React from "react"


interface ChatWindowProps {
    histories: History[]
    scrollAreaRef: React.RefObject<HTMLDivElement>
}

export default function ChatWindow({ histories, scrollAreaRef }: ChatWindowProps) {
    return (
        <ScrollArea className="w-full h-full border-y-2 border-slate">
            <div className="flex justify-center items-center py-2">
                <Card>
                    <CardContent className="flex justify-center items-center py-2 gap-2">
                        <AlertOctagon />
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Aixiety sedang dalam tahap pengembangan,
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Harap mensortir jawaban yang diberikan.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {histories.map((history, index) => {
                const { instruction, response } = history

                return (
                    <React.Fragment key={index}>
                        {instruction ? <ChatCard role="user" text={instruction} /> : null}
                        <ChatCard role="assistant" text={response} />
                    </React.Fragment>
                )
            })}

            <div ref={scrollAreaRef} />
        </ScrollArea>
    )
}