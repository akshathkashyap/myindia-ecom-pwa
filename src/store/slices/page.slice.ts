import { createSlice } from '@reduxjs/toolkit';

interface IPageState {
    pageId: 'home' | 'product';
    previousPageScrollPx: number;
}

const initialState: IPageState = {
    pageId: 'home',
    previousPageScrollPx: 0
};

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPageId: (state, action) => {
            state.pageId = action.payload;
        },
        setpreviousPageScrollPx: (state, action) => {
            state.previousPageScrollPx = action.payload;
        }
    }
});

export const { setPageId, setpreviousPageScrollPx } = pageSlice.actions;
export default pageSlice.reducer;
