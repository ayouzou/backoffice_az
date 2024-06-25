import React, { useEffect } from 'react'
import Sidebar from './sidebar'
import { UserNav } from '../widgets/user-nav'
import { DropdownMenuCheckboxes } from '../element/TeamSwitcher'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Backpack, ChevronLeft } from 'lucide-react'
import { BsBack } from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query'
import { getStoreBySlug } from '../widgets/stores/api/getStoreBySlug'

export default function LayoutDash({ children }: { children: React.ReactNode }) {
    const { auth } = useAuth()
    const router = useRouter()
    const {slug} = router.query
    useEffect(() => {
        !auth.isAuthenticated ?
            router.push('/login') : ""
    })
    const { data: storeInfoData, isLoading } = useQuery({ queryKey: ['STORE_INFO', slug], queryFn: () => getStoreBySlug({ slug }, auth) })

    return (
        <>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <div className='flex gap-5 items-center'>
                        <span className='bg-black text-white py-2 px-5 rounded-2xl'>{storeInfoData?.storeInfo?.store.name}</span>
                        <Link href={'/stores'} className='flex items-center hover:underline'> <ChevronLeft/> Back to stores</Link>
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                        <DropdownMenuCheckboxes />
                        <UserNav />
                    </div>
                </div>
            </div>
            <div className="flex p-4  ">
                <Sidebar />
                {children}
            </div>
        </>
    )
}




