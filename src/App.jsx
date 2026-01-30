import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import FindATheatre from "./components/FindATheatre.jsx";


const App = () => {
    const API_KEY = 'cc2c024bcd6c0a5f0a726342c6b2b805';
    return (
        <div>
            <Header />
            <main className="bg-black">
            <Hero/>
            {/* 第一排：正在热映 */}
            <MovieGrid
                title="Now Playing"
                fetchUrl={`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`}
            />

            {/* 第二排：高分经典 */}
            <MovieGrid
                title="Top Rated"
                fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`}
            />
            <FindATheatre />
            </main>
        </div>

    )
}
export default App
