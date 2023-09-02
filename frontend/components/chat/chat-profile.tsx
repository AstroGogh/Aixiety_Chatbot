
import { AlertOctagon, ChevronLeft } from "lucide-react";
import {Button} from "@/components/ui/button"
import Image from "next/image";

function ChatProfile() {
    return (
        <div className="w-full h-full flex items-center justify-between mx-2 px-2">
            <a
                className="border-none"
                href="/"

            >
                <ChevronLeft />
            </a>

            <Image src="/logo.png" width={100} height={100} alt="AIXIETY" />
            <div></div>
        </div>
    );
}

export default ChatProfile;