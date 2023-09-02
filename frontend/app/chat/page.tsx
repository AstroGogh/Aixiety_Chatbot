'use client'

import ChatBox from "@/components/chat/chat-box"

function Chat() {
    return (
        <div className="flex items-center justify-center">
            <div className="w-full md:w-3/4">
                <div className="flex items-center justify-center">
                    <ChatBox />
                </div>
            </div>
        </div>
    );
}

export default Chat;
