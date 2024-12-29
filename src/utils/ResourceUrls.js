const baseUrl = import.meta.env.VITE_API_URL;
export const api_urls = {
    items: {
        get_all: (page, size) => `${baseUrl}items`
    }
}