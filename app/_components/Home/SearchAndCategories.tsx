import { SearchIcon } from "lucide-react";
import React from "react";
import Categories from "./Categories";
import { Button } from "@/components/ui/button";
import SearchBox from "../search/SearchBox";


const SearchAndCategories = () => {
  return (
    <div className="flex flex-col items-center mt-5">
      <SearchBox />
      <Categories/>
    </div>
  );
};

export default SearchAndCategories;
