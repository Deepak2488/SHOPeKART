const wishlist = [];

const handleWishlist = (state = wishlist, action) => {
    const product = action.payload;
    switch (action.type) {
        case "ADD_TO_WISHLIST":
            // Check if Product already exists
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                return state
            }
            return [
                ...state,
                {
                    ...product,
                },
            ];

        case "REMOVE_FROM_WISHLIST":
            return state.filter(item => item.id !== product.id)

        default:
            return state;
    }
};

export default handleWishlist;