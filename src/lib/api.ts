const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (API_KEY) {
        headers.append('x-api-key', API_KEY);
    }
    return headers;
}

export async function getProducts(searchString = '') {
    if (!BASE_URL) throw new Error("BASE_URL is not defined");

    const url = new URL(`${BASE_URL}/products`);
    const trimmedSearch = searchString.trim();
    if (trimmedSearch) {
        url.searchParams.append('searchString', trimmedSearch);
    }
    
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: getHeaders()
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'Error fetching products'}`);
    }

    return response.json();
}

export async function getProductById(id: string) {
    if (!BASE_URL) throw new Error("BASE_URL is not defined");
    if (!id) {
        throw new Error('Product ID is required');
    }
    const url = `${BASE_URL}/products/${id}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders()
    });

    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'Error fetching product'}`);
    }

    return response.json();
}
