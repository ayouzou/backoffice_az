import { Input } from '@/components/form-element/input'
import { MessageCircleIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import useAuth from '@/hooks/useAuth'
import { io } from "socket.io-client";
import { getAllConversationBySlug } from './api/getAllConversationBySlug'
import Conversations from './Conversations'

const socket = io("http://localhost:3000")
export type CustomerProps = {
    _id: string
    username: string;
    email: string;
    active: boolean;
    storeSlugs: string[];
    creation_date: string;
    last_update: string;
    last_login: string
}

const SidebarChat = ({ setCurrentChat }: any) => {
    const router = useRouter()
    const { slug } = router.query
    const { auth } = useAuth()

    const { data: conversationInfo } = useQuery({ queryKey: ['CONVERSATION_INFO', slug], queryFn: () => getAllConversationBySlug(slug) })
    return (
        <div className="flex flex-col border-r bg-gray-100/40 h-[48rem]">
            <div className="flex flex-col  h-[80px] items-center justify-between px-6">
                <Link href="#" className="flex items-center py-2 gap-2 font-semibold" prefetch={false}>
                    <MessageCircleIcon className="h-6 w-6" />
                    <span>Chat App</span>
                </Link>
                <div className="relative ">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search users..."
                        className="pl-9 pr-4 h-8 bg-white dark:bg-gray-950 rounded-md text-sm"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-auto ">
                <div className="grid gap-1 p-2" >
                    {
                        conversationInfo && conversationInfo?.map((c: any, index: number) => (
                            <div onClick={() => setCurrentChat(c)} key={index}>
                                <Conversations conversation={c} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SidebarChat