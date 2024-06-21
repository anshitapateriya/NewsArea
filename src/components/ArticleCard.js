import React from 'react';

const ArticleCard = ({ article }) => {
  const handleSaveArticle = () => {
    localStorage.setItem('savedArticle', JSON.stringify(article));
  };

  return (
    <div className="article-card relative bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">{article.title}</h2>
      <p className="text-gray-700 mb-6">{article.description}</p>
      <a
        onClick={handleSaveArticle}
        href={`/article/${article.title}`}
        className="ml-2 absolute left-4 bottom-4 px-4  bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300"
      >
        Read more
      </a>
    </div>
  );
};

export default ArticleCard;
