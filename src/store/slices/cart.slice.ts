import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LocalStorage from "../../lib/localStorage";
import Axios from "../../lib/axios";

interface ICartState {
    products: {
        id: number;
        name: string;
        description: string;
        price: number;
        imgSrc: string;
    }[]
}

const initialState: ICartState = {
    products: []
};

const fetchCartProducts = createAsyncThunk("cart/fetchCartProducts", async () => {
    const cart = new LocalStorage("cart");
    const apiRequester = new Axios();

    if (!cart.value) {
        cart.value = [];
        cart.save();
        return [];
    }

    const productsList: ICartState["products"] = await Promise.all(
        cart.value.map(async (id: string) => {
            const searchParams = {
                id,
            };
            const response = await apiRequester.get(
                "/product",
                searchParams
            );

            if (!response) return;

            return response.data;
        })
    );

    return productsList;
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            const cart = new LocalStorage("cart");
            const productIds: number[] = state.products.map((product) => product.id);
            cart.value = productIds;
            cart.save();
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchCartProducts.fulfilled, (state, action) => {
            state.products = action.payload;
          });
    },
});

export const { setProducts } = cartSlice.actions;
export default cartSlice.reducer;
