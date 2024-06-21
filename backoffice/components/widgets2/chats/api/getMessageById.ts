const GET_STORES_ENDPOINT_BY_ID = `http://localhost:3000/api/messages`;

export async function getMessagesById({ conversationId }: any) {

    try {
        const url = `${GET_STORES_ENDPOINT_BY_ID}/${conversationId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error();
        }
        const messagesInfo = await response.json();
        return { messagesInfo, error: null };
    } catch (error) {
        return {
            error: "Unable to get conversation information. Please try again.",
        };
    }
}