const GET_PRODUCTS_BY_STORE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/customers/customer`;

export const getCustomerById = async (
    customerId: {
        customerId: string
    }
) => {
    try {
        const url = `${GET_PRODUCTS_BY_STORE_ENDPOINT}/${customerId.customerId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error("Error fetching products by store");
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error };
    }
};
