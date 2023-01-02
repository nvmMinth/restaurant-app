import React, { useState } from "react";
import { categories } from "../utils/data";
import ScrollRow from "../components/ScrollRow";
import { useStateValue } from "../context/StateProvider";
import Title from "../features/Title";
import SearchMenu from "./SearchMenu";

const Menu = ({ showSearch }) => {
  const [filter, setFilter] = useState("chicken");
  const [{ items }, dispatch] = useStateValue();

  return (
    <div id="menu" className="w-full my-6">
      {!showSearch && <Title title={"Explore Our Menu"} />}
      {showSearch && <SearchMenu />}

      <div className="w-full flex flex-wrap items-center justify-center my-4 gap-2 md:gap-6">
        {categories.map(({ id, category, paramName, icon }) => {
          const Icon = icon;
          return (
            <div
              key={id}
              onClick={() => setFilter(paramName)}
              className={`${
                filter === paramName && "bg-red-500"
              } group bg-cardOverlay2 w-36 h-16 md:w-24 md:h-28  hover:bg-red-500 rounded-lg drop-shadow-xl gap-3 flex md:flex-col items-center justify-center transition-all duration-150 ease-in-out cursor-pointer`}
            >
              <div
                className={`${
                  filter === paramName ? "bg-white" : "bg-red-500 "
                } drop-shadow-lg w-10 h-10 rounded-full group-hover:bg-white flex items-center justify-center`}
              >
                <Icon
                  className={`${
                    filter === paramName ? "text-textColor" : "text-white"
                  }  text-lg group-hover:text-textColor`}
                />
              </div>
              <p
                className={`${filter === paramName && "text-white"}
              text-textColor group-hover:text-white text-sm capitalize`}
              >
                {category}
              </p>
            </div>
          );
        })}
      </div>

      <ScrollRow
        items={items?.filter((item) => item.category == filter)}
        scroll={false}
      />
    </div>
  );
};

export default Menu;
