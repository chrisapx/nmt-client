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
            get_all: `${inventoryBaseUrl}categories`,
            get_subCategories: (parentId) => `${inventoryBaseUrl}categories/sub-categories?parentId=${parentId}`,
        },
        search: (searchInput, page, size) => `${inventoryBaseUrl}products/search?input=${searchInput}&page=${page}&size=${size}`,
    },
    users: {
        get_all: `${userBaseUrl}users`,
        login: `${userBaseUrl}users/login`,
        register: `${userBaseUrl}users`,
        edit_profile: (email) => `${userBaseUrl}users?emailOrWorkPhone=${email}`,
        verify: (email, otp) => `${userBaseUrl}users/verify?emailOrWorkPhone=${email}&otp=${otp}`,
        reset_password: (email, newPassword) => `${userBaseUrl}users/password?emailOrWorkPhone=${email}&newPassword=${newPassword}`,
        resend_token: (email, type) => `${userBaseUrl}users/otp?emailOrWorkPhone=${email}&type=${type}`,
        check_account: (email) => `${userBaseUrl}users/account_status?email=${email}`,
    },
    orders: {
        create: `${orderBaseUrl}orders`,
        get_by_id: (orderId) => `${orderBaseUrl}orders/order?orderId=${orderId}`,
        get_user_orders: `${orderBaseUrl}orders/user`,
        update: (orderId) => `${orderBaseUrl}orders?orderId=${orderId}`,
        update_status: (orderId, orderStatus) =>
            `${orderBaseUrl}orders/order-status?orderId=${orderId}&orderStatus=${orderStatus}`,
        delete: (orderId) => `${orderBaseUrl}orders?orderId=${orderId}`,
        get_all_orders: (page, size) => `${orderBaseUrl}orders?page=${page}&size=${size}`,
        calculate_amount: (orderId) => `${orderBaseUrl}orders/amount/${orderId}`,
        get_items: (orderId) => `${orderBaseUrl}orders/${orderId}/items`,
        confirm: (orderId) => `${orderBaseUrl}orders/confirm/${orderId}`,
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
