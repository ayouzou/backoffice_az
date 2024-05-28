import { Session } from "../../../../types/auth";

const UPDATE_STORE_ENDPOINT = `https://server-ecom2.onrender.com/api/stores`;

export async function updateStoreById(
  body: Record<string, string>,
  session: Session
) {
  try {
    if (!session?.user?.token) throw new Error("Unauthorized");
    const token = session.user.token;
    const response = await fetch(UPDATE_STORE_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data: Record<string, string> = await response.json();
    if (!response.ok) {
      throw new Error();
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: "Unable to create store",
    };
  }
}
