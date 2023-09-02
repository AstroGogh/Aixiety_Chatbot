import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import { History } from "@/types/types"

interface chatCard {
    role: string,
    text: string
}

export default function ChatCard( {role, text}: chatCard) {

    const cardStyle = role === "assistant"
        ? "mb-[25px] ml-[25px] mt-[20px]"
        : "mb-[25px] mr-[25px] mt-[20px] flex items-end justify-end"

    return (
        <div className={cardStyle}>
            <Card className="w-8/12 md:w-1/2">
                <CardHeader>
                    <CardTitle className={role == "assistant"? "text-lime-500" : "text-black"}>{role == "assistant" ? "Aixiety" : "Anda"}</CardTitle>
                    <CardDescription>{text? text: "**Typing**"}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}