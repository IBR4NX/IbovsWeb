import { configureStore } from "@reduxjs/toolkit";
import themeSlice  from "../features/theme/themeSlice";
import mobileMenu  from "../features/navigation/mobileMenuSlice";

export const store = configureStore({
    reducer:{
        theme: themeSlice,
        menu:mobileMenu,
    },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
