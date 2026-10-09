import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Updated to handle favorite articles
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
        const food = action.payload;
        // Get the item ID with fallback options for flexibility
        const foodId = food.idFood || food.idMeal || food.id;
  
        const existingIndex = state.favoriterecipes.findIndex(
          (item) => (item.idFood || item.idMeal || item.id) === foodId
        );
  
        if (existingIndex >= 0) {
          // If it exists, remove it from favorites
          state.favoriterecipes.splice(existingIndex, 1);
        } else {
          // If it doesn't exist, add it to favorites
          state.favoriterecipes.push(food);
        }
      },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
