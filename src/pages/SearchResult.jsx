import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { searchMovie } from "../services/search-movie";
import { RenderList } from "./RenderList";

const SearchResult = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const fetchData = async () => {
      setIsSearching(true);
      try {
        const response = await searchMovie(searchQuery);
        setSearchResults(response.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsSearching(false);
      }
    };

    if (searchQuery.trim() !== "") {
      // Hanya lakukan pencarian jika searchQuery tidak kosong
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div>
      <div className="bg-slate-900 h-[100px] items-center flex w-[100%]">
        <div className="z-50 flex justify-between items-center h-[75px] mx-7 relative w-[100%]">
          <Link to="/" className="font-serif text-[#dd060b] font-bold sizemovielist">
            Movielist
          </Link>

          <div className="w-1/3 h-2/3 relative">
            <input className="w-full h-full rounded-full border border-red-300 pl-6 pr-10" placeholder="What do you want to watch?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute right-2 w-6 h-6 top-1/2 transform -translate-y-1/2 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <div className="flex h-2/3 gap-2 w-[200px] justify-between">
            <button className="items-center border border-red-600 flex w-1/2 justify-center rounded-full text-red-500 ont-semibold">Login</button>
            <button className="bg-red-600 items-center flex w-1/2 justify-center rounded-full text-white font-semibold">Register</button>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mt-4 mb-2 ml-7">Search Results for "{searchQuery}"</h1>
      {isSearching ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-wrap w-screen justify-center">
          {searchResults.map((value, index) => (
            <RenderList key={index} dataMovie={value} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
