const GET_STORES_ENDPOINT_BY_ID = `http://localhost:3000/api/conversation`;

export async function getAllConversationBySlug(
    slug: any
) {
    console.log(slug)
    try {
        const url = `${GET_STORES_ENDPOINT_BY_ID}/all/${slug}`;
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error();
        }
        const conversationInfo = await response.json();
        return conversationInfo
    } catch (error) {
        return {
            error: "Unable to get Converstaion information. Please try again.",
        };
    }
}