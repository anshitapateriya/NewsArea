import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles, setCategory, setPage } from '../slices/articlesSlice';
import ArticleList from '../components/ArticleList';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

const Home = () => {
  const dispatch = useDispatch();
  const { articles, category, page, totalPages, status, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles({ category, page }));
  }, [category, page, dispatch]);

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <div>{error}</div>;

  return (
    <div className="home">
      <div className="flex justify-between items-center mb-4">
        <CategoryFilter onSelectCategory={(category) => dispatch(setCategory(category))} />
      </div>
      <ArticleList articles={articles} />
      <Pagination page={page} totalPages={totalPages} onPageChange={(page) => dispatch(setPage(page))} />
    </div>
  );
};

export default Home;
