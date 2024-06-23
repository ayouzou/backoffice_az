import { Button } from '@/components/form-element/button'
// import { StoreForm } from '@/components/widgets/stores/forms/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
// import StoresList from '@/components/widgets/stores/store-list'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { SessionProvider } from '@/context/auth'


import { ScrollArea } from '@/components/ui/scroll-area'
// import LayoutDash from '@/components/layout/layout'
import StoresList from './store-list'
import { StoreForm } from './forms/form'
import { UserNav } from '../user-nav'
import Link from 'next/link'




export default function StoresListPage() {

    return (
        <SessionProvider>
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Stores</CardTitle>
                        <div className='flex items-center gap-6'>
                            <Link href='/create-store' className='bg-black text-white px-2 py-3 rounded-lg'>Create Store</Link>
                            {/* <CreateStorePopUp /> */}
                            <UserNav />
                        </div>
                    </div>
                    <CardDescription>
                        this is your Stores
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <StoresList />
                </CardContent>
            </Card>
        </SessionProvider>
    )
}


const CreateStorePopUp = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create store
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px] ">
                <ScrollArea className="w-full">
                    <DialogHeader>
                        <DialogTitle>Create a store</DialogTitle>
                        <DialogDescription>
                            Provide details on your store.
                        </DialogDescription>
                    </DialogHeader>
                    <StoreForm setIsDialogOpen={setIsOpen} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}