
const GET_PRODUCTS_BY_STORE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/products/two`;

export type Product = {
    reviews: string[];
    _id: string;
    images: string[];
    product_name: string;
    description: string
    price: any;
    availability_status: "In Stock" | "Out of Stock";
    quantity_available: any;
    is_active: boolean;
    creation_date: Date;
    colors: string[];
    sizes: string[];
    store_id: string;
    slug: string;
    category_id: string[];
    available_sizes: string[];
    available_colors: string[];
    category: string

};
export const getProductById = async (id: any) => {
    console.log("id", id)
    try {
        const url = `${GET_PRODUCTS_BY_STORE_ENDPOINT}/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error("Error fetching products by store");
        const data: Product = await response.json();
        return { data, error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error };
    }
};
