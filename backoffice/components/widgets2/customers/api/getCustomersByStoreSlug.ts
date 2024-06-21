import { Session } from "../../../../types/auth";

const GET_CUSTOMERS_ENDPOINT_BY_ID = `http://localhost:3000/api/customers/all`;

export async function getCustomersByStoreSlug(slug: any, session: Session) {
    try {
        if (!session?.user?.token) throw new Error("Unauthorized");
        const token = session.user.token;
        const url = `${GET_CUSTOMERS_ENDPOINT_BY_ID}/${slug}`;
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
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return {
            error: "Unable to get store information. Please try again.",
        };
    }
}