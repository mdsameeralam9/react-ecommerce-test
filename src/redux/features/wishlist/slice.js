import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivateInstance, setAccessToken } from "../../../services/APIConfig";

/**
 * Wishlist API endpoints:
 * 1. GET: http://localhost:3000/api/wishlist
 * 2. POST: http://localhost:3000/api/wishlist/add
 * 3. DELETE: http://localhost:3000/api/wishlist/remove/1
*/

export const getWishList = createAsyncThunk(
  "wishlist/getList", 
  async (token, thunkAPI) => {
    try {
      // Set the token before making the request
      setAccessToken(token);
      
      const response = await axiosPrivateInstance.get("/wishlist", { 
        signal: thunkAPI.signal 
      });
      console.log("wishlist/getList ===>", response.data.products)
      return response.data.products || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToWishList = createAsyncThunk(
  "wishlist/add", 
  async ({token, product}, thunkAPI) => {
    try {
      // Set the token before making the request
      setAccessToken(token);
      const response = await axiosPrivateInstance.post("/wishlist/add", product, { 
        signal: thunkAPI.signal 
      });
      return response.data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromWishList = createAsyncThunk(
  "wishlist/remove", 
  async ({productId, token}, thunkAPI) => {
    try {
      // Set the token before making the request
      setAccessToken(token);
      const response = await axiosPrivateInstance.delete(`/wishlist/remove/${productId}`, { 
        signal: thunkAPI.signal 
      });

      if(!response?.data?.ok) throw new Error("Something went wrong");
    
      return { id: productId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    isPending: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get wishlist cases
      .addCase(getWishList.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isPending = false;
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      })
      
      // Add to wishlist cases
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isPending = false;
      })
      
      // Remove from wishlist cases
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.id);
        state.isPending = false;
      });
  }
});

export default wishListSlice.reducer;
