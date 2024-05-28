import { Button } from "@/components/form-element/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { ArrowBigRightDashIcon, CircleDotIcon, DollarSignIcon, ExternalLink, EyeIcon, Pencil, Trash } from "lucide-react"
import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { StoreForm } from "@/components/widgets/stores/forms/form"
import { z } from "zod"
import { storeFormSchema } from "./forms/schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateStoreById } from "./api/updateStoreById"
import useAuth from "@/hooks/useAuth"
import { deleteStoreById } from "./api/deleteStoreById"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
interface Props {
    _id?: string
    name?: string
    description?: string
    category?: string
    address?: string
    template?: 'XMTA' | 'RAYBAN'
    href?: string,
    created_at?: string
    actions: ('view' | 'edit' | 'delete' | 'go')[]
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

export function StoreCard({ _id, name, description, created_at, category, address, template, href, actions }: Props) {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </div>
                <div className="w-fit flex items-center gap-2 px-2 rounded-md bg-secondary text-secondary-foreground ">
                    {actions.map((action) => {
                        if (action === 'go') {
                            return (
                                <Button key={action} onClick={() => {
                                    window.open(href as string, '_blank')
                                }} variant="secondary" className=" shadow-none hover:text-gray-400">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View
                                </Button>
                            );
                        }
                        else if (action === "view") {
                            return (
                                <Link key={action} to={`/store/$slug`} params={{
                                    slug: href as string
                                }}>
                                    <Button variant="secondary" className=" shadow-none hover:text-gray-400">
                                        <EyeIcon className="mr-2 h-4 w-4" />
                                        View
                                    </Button>
                                </Link>
                            );
                        } else if (action === "delete") {
                            return <DeleteStorePopUp key={action} storeId={_id as string} />
                        } else if (action === "edit") {
                            return <EditStorePopUp key={action} defaultValues={{
                                name: name as string,
                                description: description as string,
                                address: address as string,
                                category: category as string,
                                template: template as 'XMTA' | 'RAYBAN'
                            }} storeId={_id as string} />
                        }
                    })}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <CircleDotIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                        {category}
                    </div>
                    <div className="flex items-center">
                        20k
                        <DollarSignIcon className="mr-1 h-3 w-3" />
                    </div>
                    <div>Created {formatDate(created_at as string)}</div>
                </div>
            </CardContent>
        </Card>
    )
}
const EditStorePopUp = ({ defaultValues, storeId }: { defaultValues: z.infer<typeof storeFormSchema>, storeId: string }) => {
    const { auth } = useAuth()
    const { slug } = useParams({
        from: '/store/$slug'
    })
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(false);
    const { isPending: isUpdating, mutate: updateStoreMutation } = useMutation({
        mutationFn: (data: Record<string, string>) => {
            return updateStoreById(data, auth)
        },
        onSettled(res) {
            if (!res?.error) {
                queryClient.invalidateQueries({ queryKey: ['STORE_INFO', slug] })
                setIsOpen(false);
            }
        }
    })

    return (<Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Pencil className='cursor-pointer w-4 h-4 hover:text-gray-400' />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <ScrollArea className="h-screen w-full">
                <DialogHeader>
                    <DialogTitle>Create a store</DialogTitle>
                    <DialogDescription>
                        Provide details on your store.
                    </DialogDescription>
                </DialogHeader>
                <StoreForm defaultValues={defaultValues} onEdit={(data) => updateStoreMutation({
                    ...data,
                    id: storeId
                })} isLoading={isUpdating} btnText='Edit' />
            </ScrollArea>
        </DialogContent>
    </Dialog>)
}


const DeleteStorePopUp = ({ storeId }: { storeId: string, }) => {
    const { auth } = useAuth()

    const { slug } = useParams({
        from: '/store/$slug'
    })
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate: deleteStoreMutation } = useMutation({
        mutationFn: (data: Record<string, string>) => {
            return deleteStoreById(data, auth)
        },
        onSettled(res) {

            if (!res?.error) {
                queryClient.invalidateQueries({ queryKey: ['STORES', slug] })
                navigate({
                    from: '/store/$slug',
                    to: '/stores',
                })
            }
        }
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash className='cursor-pointer w-4 h-4' />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        product and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-red-900 text-white hover:bg-red-700' onClick={() => deleteStoreMutation({ id: storeId })}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}