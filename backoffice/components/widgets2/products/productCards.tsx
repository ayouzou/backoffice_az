import React from 'react'
import Card from './Card'
import { FaAngleLeft, FaChevronRight } from 'react-icons/fa'
type Product = {
    product_name: string;
    price: number;
    availability_status: "In Stock" | "Out of Stock";
    is_active: boolean;
    creation_date: Date;
};
const ProductCards = ({ data }: any) => {
    return (
        <>
            <div className='p-5 grid grid-cols-4 gap-4 mt-5'>
                {data && data.map((item:any, index:number) => (
                    <Card key={index} {...item} />
                ))}
            </div>

        </>

    )
}

export default ProductCards