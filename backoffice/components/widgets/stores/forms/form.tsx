import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { storeFormSchema } from "./schema"
import { Button } from "@/components/form-element/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/form-element/input"
import FileUpload from "@/components/form-element/file-uplode"
import { useEffect, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createStore } from "./../api/createStore"
import useAuth from "@/hooks/useAuth"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
export function StoreForm({ defaultValues, btnText, onEdit, isLoading, setIsDialogOpen }: { defaultValues?: z.infer<typeof storeFormSchema>, onEdit?: (values: z.infer<typeof storeFormSchema>) => void, isLoading?: boolean, btnText?: string, setIsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [uploadedAssets, setUploadedAssets] = useState<string[]>([])
    const queryClient = useQueryClient()
    const { auth } = useAuth()
    const form = useForm<z.infer<typeof storeFormSchema>>({
        resolver: zodResolver(storeFormSchema),

    })

    const { isPending, mutate } = useMutation({
        mutationFn: async (store: Record<string, string>) => {
            return createStore(store, auth)
        },
        onSettled(res) {
            if (!res?.error) {
                setIsDialogOpen && setIsDialogOpen(false)
                queryClient.invalidateQueries({ queryKey: ['STORES'] })
            }
        }
    })

    function onSubmit(values: z.infer<typeof storeFormSchema>) {
        if (!onEdit) {
            return mutate({
                ...values,
                logo: uploadedAssets[uploadedAssets.length - 1]
            })
        }
        onEdit(values)
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className="flex flex-col justify-between gap-2">
                    <div className="flex flex-col gap-2 w-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Name of your store.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-2 w-full">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="w-full" >
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Address of your store.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
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

                    </div>
                    <div className="flex  gap-2 w-full">
                        <FormField
                            control={form.control}
                            name="description"
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
                </div>

                <FormField
                    control={form.control}
                    name="template"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Template</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange}
                                    defaultValue={field.value} className="flex items-center justify-evenly">
                                    <div className="flex items-center justify-center space-x-2 bg-slate-200">
                                        <RadioGroupItem value="XMTA" id="option-one" />
                                        <FormLabel htmlFor="option-one">XMTA</FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-slate-500 justify-center">
                                        <RadioGroupItem value="RAYBAN" id="option-one" />
                                        <FormLabel htmlFor="option-one">RayBan</FormLabel>
                                    </div>
                                </RadioGroup>

                            </FormControl>
                            <FormDescription>
                                Template of your store.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FileUpload label="Logo" setUploadedAssets={setUploadedAssets} name="logo" multiple={false} />
                <Button className="w-full" type="submit" isLoading={isPending || isLoading}>
                    {btnText ?? 'Create'}
                </Button>
            </form>
        </Form>
    )
}
