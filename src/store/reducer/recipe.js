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
    setSearchRecipe(state, action) {
      state.searchRecipeData = action.payload;
    },
  },
});

export const { setRecipe, setSearchRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
