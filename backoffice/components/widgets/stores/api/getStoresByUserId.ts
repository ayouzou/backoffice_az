import { Session } from "../../../../types/auth";

const GET_STORES_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/stores`;

type Store = {
  category: string;
  _id: string;
  slug: string;
  name: string;
  description: string;
  seller_id: string;
  created_at: string;
  updated_at: string;
  template: "XMTA" | "RAYBAN";
};
export async function getStoresByUserId(session: Session) {
  try {
    if (!session?.user?.token) throw new Error("Unauthorized");
    const token = session.user.token;
    const url = `${GET_STORES_ENDPOINT}?userId=${session.user.id}`;
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
    const data: { stores: Store[] } = await response.json();
    return data;
  } catch (error) {
    return { stores: null, error };
  }
}
