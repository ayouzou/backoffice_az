import { Label } from "@/components/ui/label"
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
import { storeFormSchema } from "../stores/forms/schema"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from "@/hooks/useAuth"
import { createStore } from "../stores/api/createStore"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function FormStore() {
    const queryClient = useQueryClient()
    const { auth, logout } = useAuth()
    const [uploadedAssets, setUploadedAssets] = useState<string[]>([])
    const form = useForm<z.infer<typeof storeFormSchema>>({
        resolver: zodResolver(storeFormSchema),
    })
    const { isPending, mutate } = useMutation({
        mutationFn: async (store: Record<string, string>) => {
            return createStore(store, auth)
        },
        onSettled(res) {
            if (!res?.error) {
                queryClient.invalidateQueries({ queryKey: ['STORES'] })
                window.location.href = '/stores'
            }
        }
    })
    function onSubmit(values: z.infer<typeof storeFormSchema>) {

        return mutate({
            ...values,
            logo: uploadedAssets[uploadedAssets.length - 1]
        })
    }
    return (
        <div className="container mx-auto my-2 px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <Link href={'/stores'} >Back to stores</Link>
                    <h1 className="text-3xl font-bold mb-4">Create Your Store</h1>
                    <p className="text-muted-foreground ">Fill out the form below to get started.</p>
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
                                                <Input {...field} placeholder="Enter your store name" />
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
                                                <Input {...field} placeholder="Enter your store address" />
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
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category......." />
                                                    </SelectTrigger>
                                                </FormControl>
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
                                                    defaultValue={field.value} className="flex items-center justify-evenly">
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
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">Create Store</Button>
                            </div>
                        </form>
                    </Form>
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <Card className="">
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