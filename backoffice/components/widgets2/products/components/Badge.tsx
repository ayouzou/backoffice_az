import React, { useEffect, useState } from 'react'

const Badge = ({ quantity }: { quantity: any }) => {
    const [inStock, setInstock] = useState<boolean>(true)

    return (
        <span className={`text-sm pt-1 pb-1 w-20 ${inStock ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}  px-2 rounded-2xl`}>
            {inStock ? "In Stock" : "Out of Stock"}
        </span>
    )
}

export default Badge