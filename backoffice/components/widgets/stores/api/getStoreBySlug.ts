import { Session } from "../../../../types/auth";

const GET_STORES_ENDPOINT_BY_ID = `${process.env.NEXT_PUBLIC_API_URL}/stores`;
// const GET_STORES_ENDPOINT_BY_ID = `http://localhost:3000/api/stores`;


type Store = {
    _id: string;
    slug: string;
    logo:string;
    name: string;
    category: string;
    description: string;
    seller_id: string;
    created_at: string;
    updated_at: string;
    address: string;
    template: "XMTA" | "RAYBAN";
};
export async function getStoreBySlug(body: { slug: any }, session: Session) {
    try {
        if (!session?.user?.token) throw new Error("Unauthorized");
        const slug: string = body.slug;
        const token = session.user.token;
        const url = `${GET_STORES_ENDPOINT_BY_ID}/${slug}/backoffice?userId=${session.user.id}`;
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
        const storeInfo: { store: Store;} = await response.json();
        return { storeInfo, error: null };
    } catch (error) {
        return {
            error: "Unable to get store information. Please try again.",
        };
    }
}