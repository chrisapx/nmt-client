const baseUrl = import.meta.env.VITE_API_URL;
const userBaseUrl = import.meta.env.VITE_USER_API_URL;
const inventoryBaseUrl = import.meta.env.VITE_INVENTORY_API_URL;
const orderBaseUrl = import.meta.env.VITE_ORDER_API_URL;

export const api_urls = {
    items: {
        upload: `${inventoryBaseUrl}products`,
        get_all: (page, size, filters = {}) => {
            const params = new URLSearchParams({ page, size, ...filters });
            return `${inventoryBaseUrl}products?${params}`;
        },
        get_by_id: (itemId) => `${inventoryBaseUrl}products/${itemId}`,
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
        get_all: (page, size) => `${orderBaseUrl}orders?page=${page}&size=${size}`,
    },
    carts: {
        create: `${orderBaseUrl}carts`,
        add_item: `${orderBaseUrl}carts`,
        update_cart: (cartId) => `${orderBaseUrl}carts/cart?cartId=${cartId}`,
        get_open_cart: `${orderBaseUrl}carts/user/open`,
        get_user_carts: `${orderBaseUrl}carts/user`,
        get_cart_by_id: (cartId) => `${orderBaseUrl}carts?cartId=${cartId}`,
        delete_cart: (cartId) => `${orderBaseUrl}carts?id=${cartId}`,
        remove_item: (cartItemId) => `${orderBaseUrl}carts/cart-item?cartItemId=${cartItemId}`,
        select_item: (cartItemId) => `${orderBaseUrl}carts/cart-item/select?cartItemId=${cartItemId}`,
        unselect_item: (cartItemId) => `${orderBaseUrl}carts/cart-item/un-select?cartItemId=${cartItemId}`,
        increment_item: (cartItemId) => `${orderBaseUrl}carts/cart-item/increment?cartItemId=${cartItemId}`,
        decrement_item: (cartItemId) => `${orderBaseUrl}carts/cart-item/decrement?cartItemId=${cartItemId}`,
        set_item_quantity: (cartItemId, quantity) =>
            `${orderBaseUrl}carts/cart-item/quantity?cartItemId=${cartItemId}&quantity=${quantity}`,
        clear_cart: (cartId) => `${orderBaseUrl}carts/${cartId}/cart-items`,
        get_item_count: `${orderBaseUrl}carts/cart-items/user/count`,
        get_cart_items: (cartId) => `${orderBaseUrl}carts/${cartId}/items`,
        get_cart_total_cost: (cartId) => `${orderBaseUrl}carts/${cartId}/total-cost`,
    },
};
