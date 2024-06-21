
import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import useAuth from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { getStoresByUserId } from "../widgets/stores/api/getStoresByUserId"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function DropdownMenuCheckboxes() {
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const { auth } = useAuth()
    const { data: storesData, } = useQuery({ queryKey: ['STORES'], queryFn: () => getStoresByUserId(auth) })
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Switch stores</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                {storesData?.stores?.map((item) => (
                    <DropdownMenuCheckboxItem onCheckedChange={setShowStatusBar} key={item.slug}>
                        <Link href={`/store/${item.slug}`}>
                            {item.name}
                        </Link>
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
