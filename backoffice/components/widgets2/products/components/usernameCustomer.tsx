import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { getCustomerById } from '../api/getCustomerById'

const UsernameCustomer = (customerId:any) => {
    const { data: customerData } = useQuery({ queryKey: ['CUSTOMER_ID_REVIEW', customerId], queryFn: () => getCustomerById(customerId) })
    return (
        <h3 className="font-semibold">{customerData?.data.username}</h3>
    )
}

export default UsernameCustomer