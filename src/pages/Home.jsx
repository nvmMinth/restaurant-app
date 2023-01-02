import React from "react";
import { useStateValue } from "../context/StateProvider";
import Delivery from "../img/delivery.png";
import { heroProduct } from "../utils/data";
import ScrollRow from "../components/ScrollRow";
import Title from "../features/Title";

const Home = () => {
  const [{ items }, dispatch] = useStateValue();

  return (
    <>
      <section id="home" className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* LEFT */}
        <div className="gap-4 py-8 flex-1 flex flex-col justify-center items-start ">
          <div className="bg-orange-100 rounded-full flex justify-center items-center px-4 py-1 gap-2">
            <p className="text-orange-500 font-semibold">Bike Delivery</p>
            <div className="w-8 h-8 bg-white rounded-full drop-shadow-xl ">
              <img
                src={Delivery}
                alt="bike-delivery"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <p className="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-bold leading-tight tracking-wide text-headingColor text-center md:text-left">
            The Fastest Delivery in {""}
            <span className="text-orange-600 text-[3rem] md:text-[3.5rem] lg:text-[4.5rem]">
              Your City
            </span>
          </p>
          <div className="text-center md:text-left">
            <p className="text-base text-textColor pb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae molestiae excepturi ratione libero, aut vitae cum quod
              adipisci fugit autem. Lorem ipsum dolor sit amet lorem ipsum!
            </p>
            <button
              type="button"
              className="bg-gradient-to-br text-white from-orange-400 to-orange-600 px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-100 ease-in-out"
            >
              Place Order
            </button>
          </div>
        </div>
        {/* RIGHT */}

        <div className="flex-1 bg-heroPattern bg-no-repeat bg-cover lg:bg-[length:70%_100%] lg:bg-right-top py-4 flex flex-wrap justify-center items-center gap-x-10 gap-y-20 ">
          {heroProduct.map(({ id, name, desc, img, price }) => (
            <div
              key={id}
              className="min-h-max py-4 w-[250px] lg:h-[180px] lg:w-[180px]  bg-cardOverlay backdrop-blur-md rounded-xl drop-shadow-3xl text-center flex flex-col items-center
               justify-center "
            >
              <img
                src={img}
                alt={name}
                className="w-[100px] md:w-[140px] -mt-20"
              />
              <p className="text-base text-textColor font-semibold">{name}</p>
              <p className="text-sm text-gray-600 my-2">{desc}</p>
              <p className="text-sm font-semibold text-headingColor">
                <span className="text-xs text-red-600">$</span> {price}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Title title={"Healthy Organic Fruits"} />
      <ScrollRow
        scroll={true}
        items={items?.filter((item) => item.category == "fruit")}
      />
    </>
  );
};

export default Home;
