import { z } from 'zod'


export const schema = z.object({
    product_name: z.string().min(3).max(100),
    price: z.string().min(1).max(1000000),
    quantity_available: z.string().min(1).max(1000000),
    sizes: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    is_active: z.boolean(),
    description: z.string().min(10).max(10000),
    category: z.string()
})