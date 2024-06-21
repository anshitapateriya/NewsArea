import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ARTICLES_PER_PAGE = 10;

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async ({ category, page }) => {
 
  const url = `https://saurav.tech/NewsAPI/top-headlines/category/${category.toLowerCase()}/in.json`;
  
  const response = await axios.get(url);
  const allArticles = response.data.articles;

  const filteredArticles = allArticles.filter(article => article.content && article.urlToImage);


  const paginatedArticles = filteredArticles.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);
  
  return {
    articles: paginatedArticles,
    totalResults: filteredArticles.length
  };
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    category: 'sports', 
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
        state.totalPages = Math.ceil(action.payload.totalResults / ARTICLES_PER_PAGE);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setPage } = articlesSlice.actions;

export default articlesSlice.reducer;
