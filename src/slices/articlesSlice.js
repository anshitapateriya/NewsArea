import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async ({ category, page }) => {
  let url = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&apiKey=e133766df6b94e0d8ae97249d54e166d`;
  if (category) {
    url += `&category=${category.toLowerCase()}`;
  }
  const response = await axios.get(url);
  console.log(response);
  return response.data;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    category: '',
    page: 1,
    totalPages: 1,
    status: 'idle',
    error: null,
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
      state.page = 1; 
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.totalPages = Math.ceil(action.payload.totalResults / 20);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setPage } = articlesSlice.actions;

export default articlesSlice.reducer;
