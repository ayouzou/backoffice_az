

const CREATE_PRODUCT_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/messages`

export const createMessage = async (
  body: Record<string, string | string[] | number | boolean>,
) => {
  try {
    const url = `${CREATE_PRODUCT_ENDPOINT}`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Error sending  message");
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};
