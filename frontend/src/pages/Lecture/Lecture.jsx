/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { Search, Clock, PlayCircle, Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import lectureData from '../../BlogData/Dataset.json';

function Lecture() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const rowsPerPage = 6;

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const allTopics = lectureData.lectures.flatMap(category => 
    category.topics.map(topic => ({
      id: `${category.subject}-${topic.name}`.replace(/\s+/g, '-').toLowerCase(),
      subject: category.subject,
      name: topic.name,
      date: topic.date,
      youtubeVideos: topic.youtube,
      thumbnail: topic.youtube[0] ? getYouTubeThumbnail(topic.youtube[0].link) : null
    }))
  );

  const filteredTopics = searchTerm 
    ? allTopics.filter(topic => 
        topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allTopics;

  const totalPages = Math.ceil(filteredTopics.length / rowsPerPage);
  const paginatedTopics = filteredTopics.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative w-11/12 md:w-3/4 lg:w-1/2">
            <button className="absolute top-2 right-2 text-white" onClick={() => setSelectedVideo(null)}>
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video">
              <iframe 
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo)}`} 
                frameBorder="0" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Finance Courses
          </h1>
          <p className="text-gray-400 text-lg">Master Finance with comprehensive video tutorials</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedVideo(topic.youtubeVideos[0].link)}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                <div className="relative aspect-video">
                  <img 
                    src={topic.thumbnail} 
                    alt={topic.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white opacity-80" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                    {topic.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-400 mt-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{topic.date}</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>45 min</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Lecture;
