import React, { useState, useEffect } from 'react';

const MovieGrid = ({ title, fetchUrl }) => {
    const [movies, setMovies] = useState([]);
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(fetchUrl);
                const data = await response.json();
                setMovies((data.results || []).slice(0,15));
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchMovies();
    }, [fetchUrl]);

    return (
        <section id="now-playing" className="px-8 md:px-16 py-12 bg-black">
            {/* 标题部分 */}
            <div className="flex items-center justify-between mb-8 border-l-4 border-red-600 pl-4">
                <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">
                    {title}
                </h2>
                <button className="text-sm text-gray-400 hover:text-red-500 transition uppercase tracking-widest font-bold">
                    View All
                </button>
            </div>

            {/* 网格布局核心 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-10 gap-x-6">
                {movies.map((movie) => (
                    <div key={movie.id} className="flex flex-col group">
                        {/* 海报容器 */}
                        <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-gray-900 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-red-900/20">
                            <img
                                src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />

                            {/* 悬浮层：显示评分和简述 */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <span className="text-yellow-400 font-bold text-sm mb-1">
                                    ★ {movie.vote_average.toFixed(1)}
                                </span>
                                <button className="bg-white text-black text-xs font-bold py-2 rounded uppercase hover:bg-red-600 hover:text-white transition">
                                    Quick View
                                </button>
                            </div>
                        </div>

                        {/* 电影信息 */}
                        <h3 className="mt-4 text-white font-bold text-sm line-clamp-1 group-hover:text-red-500 transition">
                            {movie.title}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1">
                            {movie.release_date ? movie.release_date.split('-')[0] : 'Coming Soon'}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MovieGrid;