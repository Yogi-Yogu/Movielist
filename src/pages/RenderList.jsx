import React from "react";
import { Link } from "react-router-dom";
import clickSound from "../assets/music/click.mp3"; // Path ke file suara

export const RenderList = ({ dataMovie }) => {
  const maxPanjangJudul = 30;
  const truncatedTitle = dataMovie.title.length > maxPanjangJudul ? dataMovie.title.slice(0, maxPanjangJudul) + "..." : dataMovie.title;
  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };
  return (
    <Link to={`/detail/${dataMovie.id}`} onClick={playSound} className="w-[33%] max-w-[300px] p-4 transition-transform transform hover:scale-105">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[500px]">
        <div className="relative aspect-w-2 aspect-h-3">
          <img src={`https://image.tmdb.org/t/p/original/${dataMovie.poster_path}`} alt={dataMovie.title} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
        </div>
        <div className=" py-4">
          <h3 className="text-center font-bold text-gray-800">{truncatedTitle}</h3>
          <p className="text-center text-gray-600">{dataMovie.release_date}</p>
        </div>
      </div>
    </Link>
  );
};
