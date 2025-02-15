import { Session } from "../../../../types/auth";

const CREATE_PRODUCT_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/products`

export const createProduct = async (
  body: Record<string, string | string[] | number | boolean>,
  session: Session
) => {
  try {
    if (!session.user?.token) throw new Error("No token found");
    const url = `${CREATE_PRODUCT_ENDPOINT}`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user?.token}`,
      },
    });
    if (!response.ok) throw new Error("Error creating product in store");
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};
