import LayoutDash from '@/components/layout/layout'
import CardDetails from '@/components/widgets2/products/components/CardDetails'
import { useRouter } from 'next/router'
import React from 'react'

const index = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <LayoutDash>
            <CardDetails/>
        </LayoutDash>
    )
}

export default index