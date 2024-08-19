import React, { useEffect, useState } from "react";
import { RenderList } from "./RenderList";
import { useMovieDataQuery } from "../services/get-data-movie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { SliderItem } from "./SliderItem";
import { Autoplay, Pagination } from "swiper/modules";
import { useMovieDataPopular } from "../services/get-data-movie-popular";
import { Link, useNavigate } from "react-router-dom";
import bgMusic from "../assets/music/bg-music.mp3"; // Path ke file musik
import clickSound from "../assets/music/click.mp3"; // Path ke file suara

export const MovieList = () => {
  const [LoadData, setLoadData] = useState([]);
  const [PageNow, setPageNow] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Menyimpan nama film yang dicari
  const [dataSlider, setdataSlider] = useState([]);
  const [dataPopular, setdataPopular] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const { data: fetchUser } = useMovieDataQuery({
    language: "en-US",
    page: PageNow,
  });

  const { data: fetchUser2 } = useMovieDataPopular({
    language: "en-US",
    page: PageNow,
  });

  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  useEffect(() => {
    const audio = new Audio(bgMusic);
    audio.loop = true;
    audio.muted = true; // Mulai dengan mode mute

    audio
      .play()
      .then(() => {
        // Setelah play berhasil, hilangkan mute
        setTimeout(() => {
          audio.muted = false;
        }, 1000);
      })
      .catch((error) => {
        console.log("Autoplay failed: ", error);
      });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  //slider data now playing
  useEffect(() => {
    if (fetchUser && !isSearching) {
      setdataSlider(fetchUser.results);
    }
  }, [fetchUser, isSearching]);

  //now playing
  useEffect(() => {
    if (fetchUser && !isSearching) {
      setLoadData(fetchUser.results);
    }
  }, [fetchUser, isSearching]);

  //data movie popular
  useEffect(() => {
    if (fetchUser2 && !isSearching) {
      setdataPopular(fetchUser2.results);
    }
  }, [fetchUser2, isSearching]);

  // search harus di enter
  const handleSearchEnter = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/${searchQuery}`);
    }
  };
  return (
    <>
      <div className="relative h-[100vh] top-0 left-0 w-full">
        <div className="z-50 flex justify-between items-center h-[75px] mx-7 relative">
          <Link to="/" onClick={playSound} className="font-serif text-[#dd060b] font-bold sizemovielist">
            Movielist
          </Link>
          <div className="w-1/3 h-2/3 relative">
            <input className="w-full h-full rounded-full border border-red-300 pl-6 pr-10" placeholder="What do you want to watch?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={handleSearchEnter}></input>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute right-2 w-6 h-6 top-1/2 transform -translate-y-1/2 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <div className="flex h-2/3 gap-2 w-[200px] justify-between">
            <button className="items-center border border-red-600 flex w-1/2 justify-center rounded-full text-red-500 ont-semibold">Login</button>
            <button className="bg-red-600 items-center flex w-1/2 justify-center rounded-full text-white font-semibold">Register</button>
          </div>
        </div>
        <div className="absolute h-screen top-0 left-0 w-[100%] z-0">
          <Swiper spaceBetween={0} slidesPerView={1} modules={[Autoplay, Pagination]} loop={true} autoplay={{ delay: 2000, disableOnInteraction: false }} pagination={{ clickable: true }}>
            {dataSlider.map((value) => {
              return (
                <SwiperSlide key={value.id}>
                  <SliderItem dataSlider={value} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div className="mt-[50px]">
        <header className="flex justify-between items-center mb-5 px-[20px]">
          <h1 className={`text-3xl font-bold ${searchQuery ? "self-start" : ""}`}>{searchQuery ? `Search Result "${searchQuery}"` : "NOW PLAYING"}</h1>
          <Link to="/moviesAll" onClick={playSound} className="text-red-500 text-3xl font-bold">
            See All Movie
          </Link>
        </header>
        <div className="flex flex-wrap w-screen justify-center">
          {LoadData.map((value, index) => (
            <RenderList key={index} dataMovie={value} />
          ))}
        </div>
      </div>

      <div className="mt-[50px]">
        <header className="flex justify-between items-center mb-5 px-[20px]">
          <h1 className="text-3xl font-bold">POPULAR MOVIE</h1>
          <Link to="/moviesAll" onClick={playSound} className="text-red-500 text-3xl font-bold">
            See All Movie
          </Link>
        </header>
        <div className="flex flex-wrap w-screen justify-center">
          {dataPopular.map((value, index) => (
            <RenderList key={index} dataMovie={value} />
          ))}
        </div>

        {/* <h1>{PageNow}</h1>
        <button
          onClick={() => {
            setPageNow(PageNow - 1);
          }}
        >
          minus
        </button>
        <button
          onClick={() => {
            setPageNow(PageNow + 1);
          }}
        >
          plus
        </button> */}
      </div>
    </>
  );
};
