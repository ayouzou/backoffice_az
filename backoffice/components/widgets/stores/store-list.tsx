import { StoreCard } from './store-card'
import { useQuery } from '@tanstack/react-query'
import { getStoresByUserId } from './api/getStoresByUserId'
import useAuth from '@/hooks/useAuth'
import StoreCardSkeleton from '@/components/widgets/stores/store-card-skeleton'
import CardsStores from './cards/cardsStores'
import Loading from '@/components/Loading/Loading'

export default function StoresList() {
    const { auth } = useAuth()
    const { isLoading, data: storesData } = useQuery({ queryKey: ['STORES'], queryFn: () => getStoresByUserId(auth) })
    return (
        <div className="space-y-8">
            <div className="flex flex-col items-center gap-2">
                {!storesData || isLoading ? <Loading/> :
                    (
                        <section className="container px-4 py-12 md:px-6 lg:py-16">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 ">
                                {storesData?.stores?.map((store) => (
                                    <div key={store.slug}>
                                        <CardsStores {...store} key={store._id} href={store.slug}  />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )
                }
            </div >
        </div>
    )
}