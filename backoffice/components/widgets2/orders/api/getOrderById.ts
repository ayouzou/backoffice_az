import { Session } from "../../../../types/auth";

const GET_ORDERS_BY_STORE_ENDPOINT = `http://localhost:3000/api/orders/two`;

export const getOrderById = async (body: Record<string, string | string[] | number | boolean | any>,) => {
    try {
        const url = `${GET_ORDERS_BY_STORE_ENDPOINT}/${body.orderId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error("Error creating product in store");
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error };
    }
};