import React, { useMemo, useState } from 'react'
import { IoHome } from "react-icons/io5";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../ui/select'
import { Input } from '../../ui/input'
import { TbFloatLeft } from "react-icons/tb";
import { CiViewTable } from "react-icons/ci";
import ProductCards from './productCards';
import { FaAngleLeft, FaChevronRight } from 'react-icons/fa';
import ProductTable from './ProductTable';
import { getProductsByStoreSlug } from '@/components/widgets/products/api/getProductsByStoreSlug';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Loading from '@/components/Loading/Loading';

const AllProducts = () => {
    const [changeIcon, setChangeIcon] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const { auth } = useAuth()
    const router = useRouter()
    const { slug } = router.query
    const { data: productsData, isLoading, isError } = useQuery({ queryKey: ['STORE_PRODUCTS', slug], queryFn: () => getProductsByStoreSlug(slug, auth) })
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all' || !selectedCategory) return productsData?.data || [];
        return productsData?.data && productsData?.data.filter(product => product.category === selectedCategory);
    }, [selectedCategory, productsData])


    const displayedProducts = useMemo(() => {
        return filteredProducts && filteredProducts.slice(0, itemsPerPage);
    }, [filteredProducts, itemsPerPage])

    return (
        <div className='w-full'>
            <Badge className='px-3 ml-3 text-2xl'>All-Products</Badge>
            <div className='flex gap-2 items-center px-3 ml-3 mt-3'><IoHome /> <Link href={`/store/${slug}`}>Dashboard</Link> <FaChevronRight /> <h2>All Products</h2></div>
            {/* <h1 className='p-3 text-2xl'>AllProducts</h1> */}

            {
                isLoading ? <Loading/>:
                 <>
                    <div className='bg-white shadow-md h-20  mx-4 my-2'>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-10 p-4">
                                <p className="text-md text-gray-600   w-40">All Products</p>
                                <Select onValueChange={(value) => setSelectedCategory(value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter by category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Category</SelectLabel>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="fashion">Fashion</SelectItem>
                                            <SelectItem value="home">Home</SelectItem>
                                            <SelectItem value="tech">Tech</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <div className="flex w-36  items-center space-x-2">
                                    <Input type="number" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} placeholder="Resullt on grid" />
                                </div>
                            </div>
                            <div className="bg-black mr-5 rounded hover:bg-zinc-800 cursor-pointer" onClick={() => setChangeIcon(!changeIcon)}>
                                {
                                    changeIcon ? <TbFloatLeft className='w-8 h-8 text-white' /> : <CiViewTable className='w-8 h-8 text-white' />
                                }
                            </div>
                        </div>
                    </div>
                    <div className='mx-4'>
                        {
                            changeIcon ? <ProductCards data={displayedProducts} /> : <ProductTable data={displayedProducts} />
                        }
                    </div>
                    <div className='flex justify-between p-5'>
                        <span>SHOWING 1-{itemsPerPage} OF {filteredProducts?.length}</span>
                        <div className='flex  items-center gap-2'>
                            <FaAngleLeft />
                            <span className='bg-black text-white px-3 py-1 rounded'>1</span>
                            <FaChevronRight />
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default AllProducts