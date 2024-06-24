import { Session } from "../../../../types/auth";

const DELETE_PRODUCT_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const deleteProductById = async (
  body: Record<string, string>,
  session: Session
) => {
  try {
    if (!session.user?.token) throw new Error("No token found");
    console.log(session);
    const url = `${DELETE_PRODUCT_ENDPOINT}`;
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user?.token}`,
      },
    });
    if (!response.ok) throw new Error("Error deleting product in store");
    // const data = await response.json();
    // console.log("data", data);
    return { error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Unable to delete product" };
  }
};
