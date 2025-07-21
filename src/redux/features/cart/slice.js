import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to fetch cart data from an API
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const response = await fetch("https://fakestoreapi.com/carts/1");
    const data = await response.json();
    return data.products.map(p => ({
        id: p.productId,
        quantity: p.quantity,
        price: 100 // Mock price, ideally fetched from product DB
    }));
});



const cartSlice = createSlice({
    name: "cart-slice",
    initialState: {
        cart: [],
        length: 0,
        totalPrice: 0,
        status: "idle", // idle | loading | succeeded | failed
        error: null
    },
    reducers: {
        addToCart: (state, action) => {
            console.log("addToCart called ===>", state, action)
            const item = action.payload;
            state.cart.push(item);
            state.length += 1;
            state.totalPrice += item.price;
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const index = state.cart.findIndex(item => item.id === itemId);
            if (index !== -1) {
                const item = state.cart[index];
                state.totalPrice -= item.price * item.quantity;
                state.cart.splice(index, 1);
                state.length -= 1;
            }
        },
        clearCart: (state) => {
            state.cart = [];
            state.length = 0;
            state.totalPrice = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.length = action.payload.length;
                state.totalPrice = action.payload.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );
                state.status = "succeeded";
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// module.exports = {
//     cartReducer: cartSlice.reducer,
//     cartActions: cartSlice.actions,
//     fetchCart
// };
