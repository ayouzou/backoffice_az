
import SidebarChat from "./SidebarChat"
import MainChats from "./MainChats"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getMessagesById } from "./api/getMessageById"

export default function LayoutChats() {

    const [currentChat, setCurrentChat] = useState<any>(null)
    const conversationId = currentChat?._id
    const { data: messagesInfo } = useQuery({ queryKey: ['MESSAGES_INFO_2', conversationId], queryFn: () => getMessagesById({ conversationId }) })
    return (
        <div className="grid w-full grid-cols-[950px_1fr]">
            <MainChats currentChat={currentChat} messagesInfo={messagesInfo} />
            <SidebarChat setCurrentChat={setCurrentChat} />
        </div>
    )
}

