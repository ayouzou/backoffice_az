import { Session } from "../../../../types/auth";

const DELETE_STORE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/stores`;

export async function deleteStoreById(
  body: Record<string, string | undefined>,
  session: Session
) {
  try {
    if (!body.id) throw new Error("No store id provided");
    if (!session?.user?.token) throw new Error("Unauthorized");
    const token = session.user.token;
    const response = await fetch(DELETE_STORE_ENDPOINT, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error();
    }
    const data: { stores: Record<string, string>[] } = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: "Unable to get stores",
    };
  }
}
