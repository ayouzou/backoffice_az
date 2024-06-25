
import { Card } from '@/components/ui/card'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getReviewsProduct } from '../api/getReviewsProduct'
import UsernameCustomer from './usernameCustomer'

const ReviewPart = ({ slug, description }: any) => {
    const { data: productData, refetch: refetchReviews } = useQuery({ queryKey: ['REVIEW_ID_PRODUCT', slug], queryFn: () => getReviewsProduct({ slug }) })
    return (
        <div >
            <Tabs defaultValue="reviews" className="w-full p-5  ">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="faq">Faq</TabsTrigger>
                </TabsList>
                <TabsContent value="reviews" >
                    <Card className='h-[480px]  p-5'>
                        <h1 className='text-6xl '>5.0</h1>
                        <div className='flex flex-col gap-y-8 mt-5  overflow-y-scroll h-96'>
                            {
                                productData?.review && productData?.review.map((item, index) => (
                                    <div className='flex gap-4' key={index}>
                                        <img src="https://vetra.laborasyon.com/assets/images/products/1.jpg" className='w-10 h-10 rounded-full' alt="" />
                                        <div className='flex flex-col gap-y-2'>
                                        <UsernameCustomer customerId={item.user_id} />
                                            <p>{item.comment}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </Card>
                </TabsContent>
                <TabsContent value="description">
                    <Card className='p-10'>
                        <p >{description}</p>
                    </Card>
                </TabsContent>
                <TabsContent value="faq">
                    <Card>

                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ReviewPart