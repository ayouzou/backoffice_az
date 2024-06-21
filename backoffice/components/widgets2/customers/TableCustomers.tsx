import { Button } from '@/components/form-element/button'

import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useAuth from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { MessageCircleIcon, SearchIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { getCustomersByStoreSlug } from './api/getCustomersByStoreSlug'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

export type CustomerProps = {
    _id: string
    username: string;
    email: string;
    active: boolean;
    storeSlugs: string[];
    creation_date: string;
    last_update: string;
    last_login: string
}

function formatDate(date: string) {
    const date_ = new Date(date);
    const formatted = date_.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    return formatted;
}
const TableCustomers = () => {
    const { auth } = useAuth()
    const router = useRouter()
    const { slug } = router.query
    const { isLoading, data: customers } = useQuery({ queryKey: ['STORE_CUSTOMERS', slug], queryFn: () => getCustomersByStoreSlug(slug, auth) })
    const [search, setSearch] = useState('')

    const filteredCustomers =customers?.data && customers?.data.filter((customer: CustomerProps) => customer.username.toLowerCase().includes(search.toLowerCase()))
    return (
        <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-5 w-full max-w-md p-10 pb-0">
                <Input
                    type="search"
                    placeholder="Search..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className="flex-1 rounded-l-md border-r-0 focus:ring-0 focus:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                />
            </div>
            <div className="relative w-full overflow-auto p-10 pt-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Last Login</TableHead>
                            <TableHead>Last Update</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            filteredCustomers?.map((customer: CustomerProps) => (
                                <TableRow key={customer._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {/* <Avatar>
                                                <img src="/placeholder.svg" alt="User Avatar" />
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar> */}
                                            <div className="grid gap-0.5 text-sm">
                                                <div className="font-medium">{customer.email}</div>
                                                <div className="text-gray-500 dark:text-gray-400">{customer.username}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{customer.username}</TableCell>
                                    <TableCell>
                                        {
                                            customer.active ? <Badge variant="default">Active</Badge> : <Badge variant="destructive">no-Active</Badge>
                                        }
                                    </TableCell>
                                    <TableCell>{formatDate(customer.creation_date)}</TableCell>
                                    <TableCell>{formatDate(customer.last_login)}</TableCell>
                                    <TableCell>{formatDate(customer.last_update)}</TableCell>
                                    <TableCell>
                                        <Link href={''}>
                                            <Button variant="outline" size="icon">
                                                <MessageCircleIcon className="h-4 w-4" />
                                                <span className="sr-only">Chat with customer</span>
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}

export default TableCustomers