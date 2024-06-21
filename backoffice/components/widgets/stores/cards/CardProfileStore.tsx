import useAuth from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { getStoreBySlug } from '../api/getStoreBySlug'
import { useRouter } from 'next/router'
import { getStoreLink } from '@/components/widgets2/overview/getStoreLink'

const CardProfileStore = () => {
    const { auth } = useAuth()
    const router = useRouter()
    const slug = router.query.slug
    const { data: storeInfoData } = useQuery({ queryKey: ['STORE_INFO', slug], queryFn: () => getStoreBySlug({ slug }, auth) })
    const store = storeInfoData?.storeInfo?.store
    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-12 ">
            <div className="container mx-auto px-4 md:px-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3 bg-gray-100 dark:bg-gray-800 p-8 flex items-center justify-center">
                            <div className="text-center">
                                <div className="inline-block bg-gray-900 dark:bg-gray-50 dark:text-gray-900 text-white rounded-full p-4">
                                    <img src={store?.logo} className="w-20 h-20" />
                                </div>
                                <h2 className="text-2xl font-bold mt-4">{store?.name}</h2>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Category:{store?.category}.</p>
                            </div>
                        </div>
                        <div className="md:w-2/3 p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-bold">Address</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">{store?.address}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Template</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                                        {store?.template}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Description</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">{store?.description}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Email</h3>
                                    {/* <p className="text-gray-500 dark:text-gray-400 mt-2">{auth?.user?.email}</p> */}
                                </div>
                            </div>
                            <div className="mt-8 text-right">
                                <Link
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
                                    href={getStoreLink(store?.template as 'XMTA' | 'RAYBAN', store?.slug as string)}  target='_blank'>
                                    View Store
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardProfileStore

function StoreIcon(props: any) {
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
            <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
            <path d="M2 7h20" />
            <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
        </svg>
    )
}