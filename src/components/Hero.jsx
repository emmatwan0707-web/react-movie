import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const API_KEY = 'cc2c024bcd6c0a5f0a726342c6b2b805';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
                const data = await response.json();
                setMovies(data.results.slice(0, 5));
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? movies.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === movies.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    if (movies.length === 0) {
        return <div className="w-full h-[600px] bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    const currentMovie = movies[currentIndex];
    const imageBaseUrl = "https://image.tmdb.org/t/p/original";

    return (
        <div className="w-full h-[555px] relative group bg-black text-white">
            <div
                style={{ backgroundImage: `url(${imageBaseUrl}${currentMovie.backdrop_path})` }}
                className="w-full h-full bg-center bg-cover duration-500 ease-in-out"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
            </div>

            <div className="absolute top-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-2xl">
                <span className="text-gray-300 font-bold tracking-wider text-sm mb-2 uppercase">
                   Now Playing
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                    {currentMovie.title}
                </h1>
                <p className="text-gray-300 text-lg mb-2">
                    Release Date: {currentMovie.release_date}
                </p>
                <p className="text-gray-200 text-base mb-8 line-clamp-3">
                    {currentMovie.overview}
                </p>

                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full w-fit transition duration-300">
                    Get Tickets
                </button>
            </div>

            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 hover:bg-black/50 text-white cursor-pointer transition" onClick={prevSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </div>

            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 hover:bg-black/50 text-white cursor-pointer transition" onClick={nextSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {movies.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`transition-all duration-300 cursor-pointer rounded-full ${currentIndex === slideIndex ? "w-4 h-4 bg-white" : "w-2 h-2 bg-gray-500"}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Hero;