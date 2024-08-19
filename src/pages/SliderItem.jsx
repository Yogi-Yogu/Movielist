import React from "react";
import { Link } from "react-router-dom";
import clickSound from "../assets/music/click.mp3";

export const SliderItem = (props) => {
  const { id, backdrop_path, title, overview } = props.dataSlider;
  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };
  return (
    <div className="relative bg-center bg-cover bg-no-repeat min-h-screen m-0 p-0" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})` }}>
      <div className="absolute w-full top-0 left-0 h-full bg-opacity-50 bg-black"></div>
      <div className="absolute bottom-0 flex items-end w-1/2 h-2/3 ml-5">
        <div className="text-white p-4 absolute top-0 font-sans flex flex-col gap-9 items-baseline h-full ">
          <h1 className="text-8xl font-semibold mb-2">{title}</h1>
          <p className="text-2xl text-white mb-4">{overview}</p>
          <Link to={`/detail/${id}`} onClick={playSound} className="w-[20%] bg-red-600 text-white rounded-full px-4 py-2 mt-4 inline-block font-semibold hover:bg-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-9 h-6 inline-block mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
            Watch Trailer
          </Link>
        </div>
      </div>
    </div>
  );
};
