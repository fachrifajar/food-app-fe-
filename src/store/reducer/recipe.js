import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeData: null,
  searchRecipeData: null,
};

export const recipeSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setRecipe(state, action) {
      state.recipeData = action.payload;
    },
    searchRecipe(state, action) {
      state.searchRecipeData = action.payload;
    },
  },
});

export const { setRecipe, searchRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
