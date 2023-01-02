import React, { useState } from "react";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import ScrollRow from "./ScrollRow";
import { TbMoodCry } from "react-icons/tb";
import { MdClose } from "react-icons/md";

const SearchMenu = () => {
  const [input, setInput] = useState("");
  const [{ items, search }, dispatch] = useStateValue();

  const getSearch = (e) => {
    e.preventDefault();
    const searchFilter = items?.filter((el) => el.name.includes(input));
    dispatch({
      type: actionType.GET_SEARCH,
      search: searchFilter,
    });
    setInput("");
  };

  const clearSearch = () => {
    dispatch({
      type: actionType.CLEAR_SEARCH,
    });
  };

  return (
    <div className="text-center my-10">
      <form className="w-full flex items-center justify-center">
        <input
          className="w-[40%] border-none outline-none shadow-md px-4 py-3 rounded-l-md"
          type="text"
          placeholder="What do you wanna eat?"
          value={input}
          onChange={(e) => setInput(e.target.value.trimStart())}
        />
        <button
          className="bg-red-500 text-white shadow-md px-4 py-3 rounded-r-md"
          type="submit"
          onClick={getSearch}
          disabled={!input}
        >
          Search
        </button>
      </form>
      {search?.length != undefined && (
        <div className="flex justify-end ">
          <p className=" rounded-md bg-gray-500 cursor-pointer hover:drop-shadow-lg p-2 text-white text-xl">
            <MdClose onClick={clearSearch} />
          </p>
        </div>
      )}
      {/* Search results */}
      {search?.length !== 0 ? (
        <ScrollRow items={search} scroll={false} />
      ) : (
        <div className=" flex items-center justify-center">
          <p className="flex items-center text-textColor text-lg gap-2">
            <TbMoodCry />
            No results found. Please try another dish...
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchMenu;
