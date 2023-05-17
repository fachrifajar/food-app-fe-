import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeData: null,
};

export const recipeSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setRecipe(state, action) {
      state.recipeData = action.payload;
    },
  },
});

export const { setRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
