import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleList = ({ articles }) => {
  const validArticles = articles.filter(article => 
    article.content !== null && 
    article.urlToImage !== null && 
    !article.title.includes('[Removed]')
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {validArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
