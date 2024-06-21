import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React from 'react'
import BadgeStock from './Badge'
import { Badge } from '@/components/ui/badge'
const CardDetails_ = ({ productData }: { productData: any }) => {
    return (
        <div className=' mt-3 shadow-lg w-full h-[33rem] flex p-4 gap-6'>
            <Carousel className="w-full max-w-md ml-10">
                <CarouselContent>
                    {productData?.images?.map((_: any) => (
                        <CarouselItem key={_}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <img src={_} className='w-full h-full object-contain rounded-md' alt="" />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className='ml-20 w-[36rem] pt-20'>
                <div className='flex flex-col gap-y-5'>
                    <h1 className='text-2xl font-semibold'>{productData && productData.product_name}</h1>
                    <BadgeStock quantity={productData?.quantity_available} />
                    <div className='flex gap-2'>
                        Colors : {productData?.colors?.map((item: any) => (
                            <Badge key={item}>{item}</Badge>
                        ))}
                    </div>
                    <div className='flex gap-2'>
                        Size : {productData?.sizes?.map((item: any) => (
                            <Badge key={item}>{item}</Badge>
                        ))}
                    </div>
                    <p className='text-md'>{productData && productData.description}</p>
                    <span className='text-2xl font-semibold'>${productData && productData.price}</span>
                    <span className='text-xl'>Product Quantity : {productData && productData.quantity_available}</span>
                </div>
            </div>
        </div>
    )
}

export default CardDetails_