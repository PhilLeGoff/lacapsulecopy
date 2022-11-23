import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const hiddenSlice = createSlice({
    name: 'hidden',
    initialState,
    reducers: {
        addHidden: (state, action) => {
            console.log('payload', action.payload);
            state.value.push(action.payload);
        },
        removeAllHidden: (state) => {
            state.value = []
        }
    }
});

export const { addHidden, removeAllHidden } = hiddenSlice.actions;
export default hiddenSlice.reducer;