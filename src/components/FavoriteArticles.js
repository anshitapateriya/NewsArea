import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';

const FavoriteArticles = () => {
  const [favoriteArticles, setFavoriteArticles] = useState([]);

  useEffect(() => {
    // Fetch saved articles from local storage
    const savedArticles = JSON.parse(localStorage.getItem('savedFavArticles')) || [];
    setFavoriteArticles(savedArticles);
  }, []);

  return (
    <div className="favorite-articles">
      <h2 className="text-2xl font-bold mb-4">Favorite Articles</h2>
      {favoriteArticles.length === 0 ? (
        <p>No favorite articles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteArticles;
