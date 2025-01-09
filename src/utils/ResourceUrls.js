const baseUrl = import.meta.env.VITE_API_URL;
const userBaseUrl = import.meta.env.VITE_USER_API_URL;
const inventoryBaseUrl = import.meta.env.VITE_INVENTORY_API_URL;
const orderBaseUrl = import.meta.env.VITE_ORDER_API_URL;


export const api_urls = {
    items: {
        upload: `${inventoryBaseUrl}products`,
        get_all: (page, size) => `${inventoryBaseUrl}products?page=${page}&size=${size}`,
        download_file: (fileName) => `${inventoryBaseUrl}files/${fileName}`,
        
        categories: {
            upload: `${inventoryBaseUrl}categories/category`,
            get_all_top_level: `${inventoryBaseUrl}categories/top-level`,
            get_subCategories: (parentId) => `${inventoryBaseUrl}categories/sub-categories?parentId=${parentId}`,
        },
    },
    users: {
        get_all: `${userBaseUrl}users`,
        login: `${userBaseUrl}users/login`,
        register: `${userBaseUrl}users`,
        check_account: (email) => `${userBaseUrl}users/account_status?email=${email}`,
    },
    orders: {
        get_all: `${orderBaseUrl}orders`
    }
}