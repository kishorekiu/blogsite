import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BlogDraft {
  title: string;
  description: string;
  slug?: string;
}

export interface BlogState {
  tempBlogData: BlogDraft | null;
}

const initialState: BlogState = {
  tempBlogData: {
    title: "Kishore",
    description: "Kishore slice",
    slug: "",
  },
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    saveTemBlog: (state, action: PayloadAction<BlogDraft>) => {
      state.tempBlogData = action.payload;
    },
    clearTempBlog: (state) => {
      state.tempBlogData = null;
    },
  },
});

const { reducer, actions } = blogSlice;
export const { clearTempBlog, saveTemBlog } = actions;
export default reducer;
