import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import useAuth from '@/hooks/useAuth'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getCustomersByStoreSlug } from '../customers/api/getCustomersByStoreSlug'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

const Conversations = (conversation: any) => {
    const [users, setUsers] = useState<any>([])
    const router = useRouter()
    const { slug } = router.query
    const { auth } = useAuth()
    const { isLoading, data: customers } = useQuery({ queryKey: ['STORE_CUSTOMERS', slug], queryFn: () => getCustomersByStoreSlug(slug, auth) })
    useEffect(() => {
        const frienId = conversation.conversation.members.find((m: any) => m !== auth.user?.id)
        const res = customers?.data.find((m: any) => m._id === frienId)
        setUsers(res)
    }, [customers])
    return (
        <Link href="#" className="flex items-center gap-3 rounded-md bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-750"
            prefetch={false}>
            <Avatar className="border w-8 h-8">
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
                <div className="font-medium">{users?.username}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">Hey, how is it going?</div>
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-medium">
                3
            </div>
        </Link>
    )
}
export default Conversations