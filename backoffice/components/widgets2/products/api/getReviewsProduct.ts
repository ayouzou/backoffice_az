const GET_REVIEWS_PRODUCT_ENDPOINT_BY_ID = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;
type Review = {
    comment: string
    _id: string
    created_at: string
    user_id: string
    updated_at: string
}
export async function getReviewsProduct(body: Record<string, any>) {
    try {
        const productSlug: string = body.slug;
        const url = `${GET_REVIEWS_PRODUCT_ENDPOINT_BY_ID}/product/${productSlug}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error();
        }
        const review: Review[] = await response.json();
        return { review, error: null };
    } catch (error) {
        return {
            review: null,
            error: "Unable to get Reviews",
        };
    }
}
