import { createSlice } from "@reduxjs/toolkit";

interface ISearchState {
    searchString: string;
    returnToPageUrl: string;
}

const initialState: ISearchState = {
    searchString: "",
    returnToPageUrl: "/"
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchString: (state, action) => {
            state.searchString = action.payload;
        },
        setReturnToPageUrl: (state, action) => {
            state.returnToPageUrl = action.payload;
        }
    }
});

export const { setSearchString, setReturnToPageUrl } = searchSlice.actions;
export default searchSlice.reducer;
