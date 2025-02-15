
import { Session } from "../../../../types/auth";

const CREATE_STORE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/stores`;

export async function createStore(
  body: Record<string, string>,
  session: Session
) {
  try {
    if (!session?.user?.token) throw new Error("Unauthorized");
    const token = session.user.token;
    const response = await fetch(CREATE_STORE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
    
      throw new Error("There was a server error");
    }
    const data: Record<string, string> = await response.json();
    return { data, error: null };
  } catch (e) {
    return { data: null, error: "There was a server error" };
  }
}
