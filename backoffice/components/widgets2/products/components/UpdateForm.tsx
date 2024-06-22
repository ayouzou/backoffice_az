import { Button } from '@/components/form-element/button'
import FileUpload from '@/components/form-element/file-uplode'
import { Input } from '@/components/form-element/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { schema } from './schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { getProductById } from '../api/getProductById'
import { Switch } from '@/components/ui/switch'
import { updateProductById } from '@/components/widgets/products/api/updateProductById'
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'

const UpdateForm = () => {
  const [uploadedAssets, setUploadedAssets] = useState<string[]>([])
  const { auth } = useAuth()
  const router = useRouter()
  const { slug, id } = router.query
  const queryClient = useQueryClient()
  const { data: productData } = useQuery({ queryKey: ['PRODUCT_ID', id], queryFn: () => getProductById(id) })
  console.log("productData", productData)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      product_name: productData?.data?.product_name || '',
      price: productData?.data?.price || 0,
      quantity_available: productData?.data?.quantity_available || 0,
      colors: productData?.data?.colors || [],
      sizes: productData?.data?.sizes || [],
      is_active: productData?.data?.is_active || false,
      category: productData?.data?.category || '',
      description: productData?.data?.description || '',
    }
  })
  const { isPending, mutate } = useMutation({
    mutationFn: (data: Record<string, string | string[] | number | boolean | any>) => {
      return updateProductById(data, auth)
    },
    onSettled(res) {
      if (!res?.error) {
        queryClient.invalidateQueries({ queryKey: ['PRODUCT_ID', id] })
      }
    }
  })

  const submitData = (data: z.infer<typeof schema>) => {
    return mutate({
      ...data,
      images: uploadedAssets || productData?.data?.images,
      id: id,
    })
  }
  return (
    <Form {...form} >
      <div>
        <Badge className='text-2xl  ml-4'>Update Product</Badge>
        <div className='flex gap-2 items-center px-3 ml-3 mt-3'><IoHome /> <Link href={`/store/${slug}`}>Dashboard</Link> <FaChevronRight /> <h2>All Products</h2></div>
        <form onSubmit={form.handleSubmit(submitData)}>
          <div className='flex p-8 gap-5 '>
            <div className='w-[800px] h-[45rem] bg-white shadow-lg'>
              <div className='m-4 mt-1'>
                <div className='w-full flex flex-col gap-y-2'>
                  <FormField
                    control={form.control}
                    name="product_name"
                    render={({ field }) => (
                      <FormItem>
                        <label>Product Name</label>
                        <Input {...field} defaultValue={productData?.data?.product_name} />
                        {productData?.data?.product_name}
                        <FormMessage />
                      </FormItem>)}
                  />

                </div>
                <div className='flex gap-4 mt-4'>
                  <div className='w-full flex flex-col gap-y-2'>
                    <FormField
                      control={form.control}
                      name='price'
                      render={({ field }) => (
                        <FormItem>
                          <label>Product Price</label>
                          <FormControl>
                            <Input {...field} defaultValue={productData?.data?.price} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='w-full flex flex-col gap-y-2'>
                    <FormField
                      control={form.control}
                      name='quantity_available'
                      render={({ field }) => (
                        <FormItem>
                          <label>Product Qte</label>
                          <FormControl>
                            <Input {...field} defaultValue={productData?.data?.quantity_available} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-3">
                  <FormField
                    control={form.control}
                    name='colors'
                    render={({ field }) => {
                      const { onChange } = field
                      return (
                        <FormItem>
                          <ToggleGroup type="multiple" {...field} onValueChange={onChange} defaultValue={productData?.data?.colors}>
                            Colors :
                            <ToggleGroupItem value="BLACK" aria-label="Toggle black">
                              Black
                            </ToggleGroupItem>
                            <ToggleGroupItem value="WHITE" aria-label="Toggle white">
                              White
                            </ToggleGroupItem>
                            <ToggleGroupItem value="BLUE" aria-label="Toggle blue">
                              Blue
                            </ToggleGroupItem>
                            <ToggleGroupItem value="YELLOW" aria-label="Toggle yellow">
                              Yellow
                            </ToggleGroupItem>
                            <ToggleGroupItem value="GREEN" aria-label="Toggle green">
                              Green
                            </ToggleGroupItem>
                          </ToggleGroup>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='sizes'
                    render={({ field }) => {
                      const { onChange } = field
                      return (
                        <FormItem>
                          <ToggleGroup type="multiple" {...field} defaultValue={productData?.data?.sizes} onValueChange={onChange}>
                            Size :
                            <ToggleGroupItem value="xs" aria-label="Toggle xs">
                              Xs
                            </ToggleGroupItem>
                            <ToggleGroupItem value="sm" aria-label="Toggle sm">
                              Sm
                            </ToggleGroupItem>
                            <ToggleGroupItem value="md" aria-label="Toggle md">
                              Md
                            </ToggleGroupItem>
                            <ToggleGroupItem value="lg" aria-label="Toggle lg">
                              Lg
                            </ToggleGroupItem>
                            <ToggleGroupItem value="xl" aria-label="Toggle xl">
                              Xl
                            </ToggleGroupItem>
                            <ToggleGroupItem value="2xl" aria-label="Toggle 2xl">
                              2Xl
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </FormItem>
                      )
                    }}
                  />

                </div>
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => {
                      const { onChange, value } = field
                      return (
                        <>
                          <Switch id="is_active" defaultChecked={productData?.data?.is_active}  {...field} onCheckedChange={onChange} />
                          <Label htmlFor="is_active">Active</Label>
                        </>
                      )
                    }
                    } />

                </div>
                <div className='flex items-center mt-3 gap-14'>
                  <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                      <FormItem>
                        <Label>Category</Label>
                        <Select onValueChange={field.onChange} defaultValue={productData?.data?.category} >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="home">Home</SelectItem>
                              <SelectItem value="fashion">Fashion</SelectItem>
                              <SelectItem value="tech">Tech</SelectItem>
                              <SelectItem value="cosmatics">Cosmatics</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col mt-4 gap-y-4">
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="Description">Description</Label>
                        <Textarea className='resize-none' {...field} placeholder="Type your message here." />
                      </FormItem>
                    )}
                  />

                </div>
                <h1 className='text-xl p-3 pb-0'>Product Image</h1>
                <div className='m-4 mt-1'>
                  <FileUpload name="logo" multiple={true} setUploadedAssets={setUploadedAssets} />
                  <div className='mt-2 flex gap-3'>
                    {productData?.data?.images?.map((img, index) => (
                      <img src={img} alt="" className='w-10 h-10' key={index} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='w-[300px] h-full flex gap-3'>
              <Button className='w-56'>Update</Button>
              {/* <Button type='submit' className='w-44 bg-white text-black border hover:bg-gray-200'>Save as Draft</Button> */}
            </div>
          </div>
        </form>
      </div >

    </Form >
  )
}

export default UpdateForm