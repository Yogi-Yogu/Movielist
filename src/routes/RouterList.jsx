import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MovieList } from "../pages/MovieList";
import { Detail } from "../pages/Detail";
import SearchResult from "../pages/SearchResult";
import AllMovie from "../pages/AllMovie";

export const RouterList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/moviesAll" element={<AllMovie />} />
      </Routes>
    </BrowserRouter>
  );
};
