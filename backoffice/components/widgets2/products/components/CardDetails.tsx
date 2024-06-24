import React from 'react'
import BadgeStock from './Badge'
import ReviewPart from './ReviewPart'
import { useQuery } from '@tanstack/react-query'

import { useRouter } from 'next/router'
import { getProductById } from '../api/getProductById'
import { Badge } from '@/components/ui/badge'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import CardDetails_ from './CardDetails_'
import Loading from '@/components/Loading/Loading'

const CardDetails = () => {
    const router = useRouter()
    const id = router.query.id
    const { data: productData, isLoading } = useQuery({ queryKey: ['PRODUCT_BY_ID', id], queryFn: () => getProductById(id) })
    return (
        <div className='p-5 w-full'>
            <Badge>Product Details</Badge>
            {
                isLoading ? <Loading/>:
                    <>
                        <CardDetails_ productData={productData?.data} />
                        <div className=' mt-3 shadow-lg w-full h-[35rem]'>
                            <ReviewPart slug={productData?.data && productData?.data.slug} description={productData?.data && productData?.data.description} />
                        </div>
                    </>
            }

        </div>
    )
}

export default CardDetails