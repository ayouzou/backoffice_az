import { Session } from "../../../../types/auth";

const GET_REVIEWS_PRODUCT_ENDPOINT_BY_ID = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

export async function getReviewsProduct(
  body: Record<string, any>,
  session: Session
) {
  try {
    if (!session?.user?.token) throw new Error("Unauthorized");
    const productId: string = body.productId;
    const token = session.user.token;
    const url = `${GET_REVIEWS_PRODUCT_ENDPOINT_BY_ID}/?productId=${productId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error();
    }
    const review: Record<string, string | any>= await response.json();

    return { review, error: null };
  } catch (error) {
    return {
      review: null,
      error: "Unable to get Reviews",
    };
  }
}
