import React, { useEffect, useState } from "react";
import { RenderList } from "./RenderList";
import { useMovieDataQuery } from "../services/get-data-movie";
import { Link } from "react-router-dom";
import { searchMovie } from "../services/search-movie";
import clickSound from "../assets/music/click.mp3";

const AllMovie = () => {
  const [LoadData, setLoadData] = useState([]);
  const [PageNow, setPageNow] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Menyimpan nama film yang dicari
  const [isSearching, setIsSearching] = useState(false); // Menyimpan status pencarian
  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  const { data: fetchUser } = useMovieDataQuery({
    language: "en-US",
    page: PageNow,
    query: searchQuery, // Gunakan searchQuery dalam query untuk fitur pencarian
  });

  useEffect(() => {
    if (fetchUser && !isSearching) {
      setLoadData(fetchUser.results);
    }
  }, [fetchUser, isSearching]);

  const goToNextPage = () => {
    setPageNow(PageNow + 1);
  };

  const goToPreviousPage = () => {
    if (PageNow > 1) {
      setPageNow(PageNow - 1);
    }
  };

  const search = async (q) => {
    if (q.length > 2) {
      setSearchQuery(q); // Menyimpan nama film yang dicari
      setIsSearching(true); // Set status pencarian menjadi true
      const query = await searchMovie(q);
      setLoadData(query.results);
    } else {
      // Jika panjang query kurang dari 3 karakter, atur ke kondisi awal
      setSearchQuery("");
      setIsSearching(false);
    }
  };

  return (
    <>
      <div className="bg-slate-900 h-[100px] items-center flex w-[100%]">
        <div className="z-50 flex justify-between items-center h-[75px] mx-7 relative w-[100%]">
          <Link to="/" onClick={playSound} className="font-serif text-[#dd060b] font-bold sizemovielist">
            Movielist
          </Link>
          <div className="w-1/3 h-2/3 relative">
            <input className="w-full h-full rounded-full border border-red-300 pl-6 pr-10" placeholder="What do you want to watch?" onChange={(e) => search(e.target.value)}></input>
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
      <div className="mt-[40px]">
        <header className="flex justify-between items-center mb-5 px-[20px]">
          <h1 className={`pl-[18px] text-3xl font-bold ${isSearching ? "self-start" : ""}`}>{isSearching ? `Search Result "${searchQuery}"` : "ALL MOVIES"}</h1>
          {isSearching ? (
            <div></div>
          ) : (
            <div className="flex items-center">
              <button
                onClick={() => {
                  goToPreviousPage();
                  playSound();
                }}
                disabled={PageNow === 1}
                className="px-3 py-2 mr-2 text-white bg-red-500 rounded-full"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  goToNextPage();
                  playSound();
                }}
                className="px-3 py-2 text-white bg-red-500 rounded-full"
              >
                Next
              </button>
            </div>
          )}
        </header>
        <div className="flex flex-wrap w-screen justify-center">
          {LoadData.map((value, index) => (
            <RenderList key={index} dataMovie={value} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllMovie;
