import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useState } from "react"
import FileUpload from "@/components/form-element/file-uplode"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useAuth from "@/hooks/useAuth"
import Link from "next/link"
import { storeFormSchema } from "@/components/widgets/stores/forms/schema"
import { getStoreBySlug } from "@/components/widgets/stores/api/getStoreBySlug"
import { useRouter } from "next/router"
import { updateStoreById } from "./updateStoreById"

export default function FormUpdateStore() {
    const router = useRouter()
    const slug = router.query.slug
    const queryClient = useQueryClient()
    const { auth } = useAuth()
    const [uploadedAssets, setUploadedAssets] = useState<string[]>([])
    const { data: storeInfoData, isLoading } = useQuery({ queryKey: ['STORE_INFO', slug], queryFn: () => getStoreBySlug({ slug }, auth) })
    const form = useForm<z.infer<typeof storeFormSchema>>({
        resolver: zodResolver(storeFormSchema),
        defaultValues: {
            name: storeInfoData?.storeInfo?.store?.name as string || '',
            description: storeInfoData?.storeInfo?.store?.description as string || '',
            address: storeInfoData?.storeInfo?.store?.address as string || '',
            category: storeInfoData?.storeInfo?.store?.category as string || '',
            template: storeInfoData?.storeInfo?.store?.template as 'XMTA' | 'RAYBAN' || ''
        }
    })
    const { isPending, mutate } = useMutation({
        mutationFn: async (store: Record<string, string>) => {
            return updateStoreById(store, auth)
        },
        onSettled(res) {
            if (!res?.error) {
                queryClient.invalidateQueries({ queryKey: ['STORE_INFO', slug] })
                  window.location.href =`/store/${slug}`
            }
        }
    })
    function onSubmit(values: z.infer<typeof storeFormSchema>) {
        const logo = uploadedAssets[uploadedAssets.length - 1]
        console.log("logo", logo)
        console.log("values", values)
        return mutate({
            ...values,
            id: storeInfoData?.storeInfo?.store?._id as string,
            logo: logo || storeInfoData?.storeInfo?.store?.logo as string
        })
    }
    return (
        <div className="container mx-auto my-12 px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <Link href={'/stores'}>Back to Overview</Link>
                    <h1 className="text-3xl font-bold mb-4">Update Your Store</h1>
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <FormField control={form.control} name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} defaultValue={storeInfoData?.storeInfo?.store?.name} placeholder="Enter your store name" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField control={form.control} name="description"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a little bit about your store"
                                                    className="resize-none"
                                                    {...field}
                                                    defaultValue={storeInfoData?.storeInfo?.store?.description}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField control={form.control} name="address"
                                    render={({ field }) => (
                                        <FormItem className="w-full" >
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                    defaultValue={storeInfoData?.storeInfo?.store?.address}
                                                    placeholder="Enter your store address" />
                                            </FormControl>
                                            <FormDescription>
                                                Address of your store.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField control={form.control} name="category"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={storeInfoData?.storeInfo?.store?.category}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category......." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="TECH">Tech</SelectItem>
                                                    <SelectItem value="HOME">Home</SelectItem>
                                                    <SelectItem value="FOOD">Food</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                                <FormField control={form.control} name="template"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Template</FormLabel>
                                            <FormControl>
                                                <RadioGroup onValueChange={field.onChange}
                                                    defaultValue={storeInfoData?.storeInfo?.store?.template} className="flex items-center justify-evenly">
                                                    <div className=" space-x-2 border rounded-md p-4 cursor-pointer">
                                                        <img src="https://res.cloudinary.com/dbtwal7ju/image/upload/v1719170016/dsbsuw4p116ynjpxmo0t.png" alt="XMTA" width={200} height={150} className="w-full h-auto" />
                                                        <RadioGroupItem value="XMTA" id="option-one" />
                                                        <FormLabel htmlFor="option-one">XMTA</FormLabel>
                                                    </div>
                                                    <div className=" space-x-2  border rounded-md p-4 cursor-pointer">
                                                        <img src="https://res.cloudinary.com/dbtwal7ju/image/upload/v1719170020/ig6nnuvnkc4khxibkbzh.png" alt="RAYBAN" width={200} height={150} className="w-full h-auto" />
                                                        <RadioGroupItem value="RAYBAN" id="option-one" />
                                                        <FormLabel htmlFor="option-one">RayBan</FormLabel>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <FileUpload label="Logo" setUploadedAssets={setUploadedAssets} name="logo" multiple={false} />
                                    <img src={storeInfoData?.storeInfo?.store?.logo} className="w-10 h-10 mt-5" alt="" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">Update Store</Button>
                            </div>
                        </form>
                    </Form>
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                            <CardDescription>This is how your store will look with the selected template.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4">
                                <Link href={'https://temp-1-az.vercel.app/az'} target="_blank" className="border rounded-md p-4">
                                    <img src="https://res.cloudinary.com/dbtwal7ju/image/upload/v1719170016/dsbsuw4p116ynjpxmo0t.png" alt="RAYBAN" width={400} height={200} className="w-full h-auto" />
                                    <div className="mt-4">
                                        <h3 className="text-lg font-bold">RAYBAN</h3>
                                        <p className="text-muted-foreground">A clean and modern design.</p>
                                    </div>
                                </Link>
                                <Link href={'https://niftables-assignment.vercel.app/'} target="_blank" className="border rounded-md p-4">
                                    <img src="https://res.cloudinary.com/dbtwal7ju/image/upload/v1719170020/ig6nnuvnkc4khxibkbzh.png" alt="XMTA" width={400} height={200} className="w-full h-auto" />
                                    <div className="mt-4">
                                        <h3 className="text-lg font-bold">XMTA</h3>
                                        <p className="text-muted-foreground">A vibrant and eye-catching design.</p>
                                    </div>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}