import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const ArticleDetail = () => {
  const { title } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedArticle = JSON.parse(localStorage.getItem('savedArticle'));
    if (savedArticle) {
      setArticle(savedArticle);
      setLoading(false);
    } else {
      axios.get(`https://newsapi.org/v2/everything?apiKey=bc8ac58b8bc84dde937b9a0ab1fb6212&q=${title}`)
        .then(response => {
          const fetchedArticles = response.data.articles;
          if (fetchedArticles.length > 0) {
            setArticle(fetchedArticles[0]);
          } else {
            setError('No article found');
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching the article:', error);
          setError('Error fetching the article');
          setLoading(false);
        });
    }

    // Check if article is already saved
    const savedFavArticles = JSON.parse(localStorage.getItem('savedFavArticles')) || [];
    if (savedFavArticles.some(favArticle => favArticle.title === title)) {
      setIsSaved(true);
    }
  }, [title]);

  const handleSaveToFavorites = () => {
    const savedFavArticles = JSON.parse(localStorage.getItem('savedFavArticles')) || [];
    const articleExists = savedFavArticles.some(favArticle => favArticle.title === article.title);

    if (articleExists) {
      alert('Article already saved to favorites!');
    } else {
      savedFavArticles.push(article);
      localStorage.setItem('savedFavArticles', JSON.stringify(savedFavArticles));
      setIsSaved(true);
      alert('Article saved to favorites!');
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!article) return <div>No article found</div>;

  return (
    <div className="article-detail p-4 bg-white rounded shadow">
      <h1 className="text-3xl mt-28 font-bold mb-4">{article.title}</h1>
      <button 
        className={`px-4 py-2 mb-4 rounded-full ${isSaved ? 'bg-green-500' : 'bg-red-500'} text-white rounded mt-4 hover:bg-blue-700`}
        onClick={handleSaveToFavorites}
        disabled={isSaved}
      >
        {isSaved ? 'Saved as favourate' : 'Favorites'}
      </button>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-64 object-cover rounded mb-4"
          style={{ maxWidth: '100%', height: 'auto' }} 
        />
      )}
      <p className="text-gray-700">{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
