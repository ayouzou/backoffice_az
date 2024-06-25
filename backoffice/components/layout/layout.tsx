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
import Loading from '../Loading/Loading'

export default function LayoutDash({ children }: { children: React.ReactNode }) {
    const { auth } = useAuth()
    const router = useRouter()
    const { slug } = router.query
    useEffect(() => {
        !auth.isAuthenticated ?
            router.push('/login') : ""
    })
    const { data: storeInfoData, isLoading } = useQuery({ queryKey: ['STORE_INFO', slug], queryFn: () => getStoreBySlug({ slug }, auth) })
    if (isLoading) { return <Loading /> }
    if (!storeInfoData?.storeInfo?.store) {
        return <main className="flex-1 px-4 py-8 md:px-6 md:py-12 mt-52">
            <div className="mx-auto max-w-md space-y-4 rounded-lg border p-6">
            <LockIcon/>
                <h1 className="text-2xl font-bold">Protected Route</h1>
                <p className="text-muted-foreground">
                    This is a protected route. Only authorized user can access this content.
                </p>
            </div>
        </main>
    }
    return (
        <>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <div className='flex gap-5 items-center'>
                        <span className='bg-black text-white py-2 px-5 rounded-2xl'>{storeInfoData?.storeInfo?.store?.name}</span>
                        <Link href={'/stores'} className='flex items-center hover:underline'> <ChevronLeft />Back to stores</Link>
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




function LockIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  }