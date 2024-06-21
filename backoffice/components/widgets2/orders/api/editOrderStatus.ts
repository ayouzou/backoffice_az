import { Session } from "../../../../types/auth";

const EDIT_ORDER_STATUS_ENDPOINT = `http://localhost:3000/api/orders`;

export const editOrderStatus = async (
  body: Record<string, string | string[] | number | boolean>,
  session: Session
) => {
  try {
   
    const url = `${EDIT_ORDER_STATUS_ENDPOINT}/${body.orderId}`;
    const response = await fetch(url, {
      method: "PUT",
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