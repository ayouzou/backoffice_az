import useAuth from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { getStoreBySlug } from '../api/getStoreBySlug'
import { useRouter } from 'next/router'
import { getStoreLink } from '@/components/widgets2/overview/getStoreLink'
import Loading from '@/components/Loading/Loading'

const CardProfileStore = () => {
    const { auth } = useAuth()
    const router = useRouter()
    const slug = router.query.slug
    const { data: storeInfoData, isLoading } = useQuery({ queryKey: ['STORE_INFO', slug], queryFn: () => getStoreBySlug({ slug }, auth) })
    const store = storeInfoData?.storeInfo?.store
    return (
        <div className=" ">
            {
                isLoading ? <Loading /> :
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/3 bg-gray-100 dark:bg-gray-800 p-8 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="inline-block  dark:text-gray-900 text-white rounded-full p-4">
                                            <img src={store?.logo} className="w-20 h-20 rounded-full" />
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
                                    <div className="mt-8 text-right flex justify-end gap-2">
                                        <Link
                                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
                                            href={`/store/${slug}/Update-store`}>
                                            Update Store
                                        </Link>
                                        <Link
                                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
                                            href={getStoreLink(store?.template as 'XMTA' | 'RAYBAN', store?.slug as string)} target='_blank'>
                                            View Store
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}
export default CardProfileStore