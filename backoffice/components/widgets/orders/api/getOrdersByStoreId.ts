import { Session } from "../../../../types/auth";

const GET_ORDERS_BY_STORE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

export const getOrdersByStoreId = async (
  body: Record<string, string | string[] | number | boolean>,
  session: Session
) => {
  try {
    if (!session.user?.token) throw new Error("No token found");
    const url = `${GET_ORDERS_BY_STORE_ENDPOINT}/${body.storeId}`;
    const response = await fetch(url, {
      method: "GET",

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
