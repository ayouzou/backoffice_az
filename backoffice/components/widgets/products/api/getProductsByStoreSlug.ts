import { Session } from "../../../../types/auth";

const GET_PRODUCTS_BY_STORE_ENDPOINT = `http://localhost:3000/api/products`;

type Product = {
  reviews: string[];
  _id: string;
  product_name: string;
  price: number;
  availability_status: "In Stock" | "Out of Stock";
  is_active: boolean;
  creation_date: Date;
  category: string
};
export const getProductsByStoreSlug = async (
  slug: any,
  session: Session
) => {
  try {
    if (!session.user?.token) throw new Error("No token found");
    const url = `${GET_PRODUCTS_BY_STORE_ENDPOINT}/${slug}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user?.token}`,
      },
    });
    if (!response.ok) throw new Error("Error fetching products by store");
    const data: Product[] = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};
