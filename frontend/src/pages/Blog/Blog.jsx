import React, { useState } from 'react';
import { TrendingUp, ThumbsUp, Calendar, Search, X } from 'lucide-react';
import blogData from '../../BlogData/BlogData.json';

const categoryColors = {
  "Stock Market": "bg-emerald-900",
  "Finance": "bg-blue-900",
  "Investment Strategies": "bg-purple-900",
  "Market Trends": "bg-indigo-900",
  "Stock Picks": "bg-cyan-900",
  "Trading Strategies": "bg-teal-900",
  "Macroeconomics": "bg-violet-900",
  "Dividend Investing": "bg-blue-900",
  "Investing": "bg-green-900",
  "Investor Mindset": "bg-pink-900"
};

function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [articles, setArticles] = useState(blogData.articles);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleLike = (articleId, e) => {
    e.stopPropagation();
    setArticles(prevArticles => 
      prevArticles.map(article => {
        if (article.id === articleId) {
          return {
            ...article,
            likes: article.isLiked ? article.likes - 1 : article.likes + 1,
            isLiked: !article.isLiked
          };
        }
        return article;
      })
    );
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(articles.map(article => article.category))];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h1 className="text-4xl font-bold flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            <TrendingUp className="text-emerald-400" />
            Stock Market Insights
          </h1>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="w-full md:w-48 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <div 
              key={article.id} 
              className="bg-gray-800 rounded-xl p-6 hover:transform hover:scale-[1.02] transition-all cursor-pointer shadow-lg hover:shadow-2xl border border-gray-700 hover:border-emerald-500"
              onClick={() => setSelectedArticle(article)}
            >
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex justify-between items-start mb-4">
                <span className={`${categoryColors[article.category]} text-xs font-semibold px-3 py-1 rounded-full`}>
                  {article.category}
                </span>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={16} />
                  <span className="text-sm">{article.published_date}</span>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-3 text-emerald-400 hover:text-emerald-300 transition-colors">{article.title}</h2>
              <p className="text-gray-300 mb-4 line-clamp-3">{article.summary}</p>
              
              <div className="flex justify-between items-center">
                <button 
                  onClick={(e) => handleLike(article.id, e)}
                  className={`flex items-center gap-1 ${article.isLiked ? 'text-emerald-400' : 'text-gray-400'} hover:text-emerald-500 transition-colors`}
                >
                  <ThumbsUp size={18} />
                  <span>{article.likes}</span>
                </button>
                <div className="text-sm text-gray-400">{article.author}</div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded hover:bg-gray-600 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700">
            <div className="sticky top-0 bg-gray-800 p-6 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-emerald-400">{selectedArticle.title}</h2>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-[400px] object-cover rounded-lg mb-6"
              />
              <div className="flex justify-between items-center mb-6">
                <span className={`${categoryColors[selectedArticle.category]} text-sm font-semibold px-3 py-1 rounded-full`}>
                  {selectedArticle.category}
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} />
                    <span>{selectedArticle.published_date}</span>
                  </div>
                  <span className="text-gray-400">{selectedArticle.author}</span>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                {selectedArticle.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {selectedArticle.tags.map(tag => (
                  <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded hover:bg-gray-600 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;