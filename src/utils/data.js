import I1 from "../img/i1.png";
import R1 from "../img/r1.png";
import F2 from "../img/f2.png";
import Cu6 from "../img/cu6.png";
import { GiChickenOven, GiFriedFish, GiApothecary, GiBowlOfRice, GiWineGlass, GiFruiting } from "react-icons/gi"
import { IoIosIceCream } from "react-icons/io"

export const heroProduct = [
    {
        id: 1,
        name: "Icecream",
        desc: "Choco & Strawberry",
        price: "3.25",
        img: I1,
    },
    {
        id: 2,
        name: "Rice",
        desc: "Vegetarian Rice",
        price: "5.75",
        img: R1,
    },
    {
        id: 3,
        name: "Soup",
        desc: "Spicy Squid Soup",
        price: "8.00",
        img: Cu6,
    },
    {
        id: 4,
        name: "Fruit",
        desc: "Fresh Pineapple",
        price: "2.25",
        img: F2,
    },
];

export const categories = [

    {
        id: 3,
        category: "chicken",
        paramName: "chicken",
        icon: GiChickenOven
    },
    {
        id: 4,
        category: "fish",
        paramName: "fish",
        icon: GiFriedFish
    },
    {
        id: 5,
        category: "soup",
        paramName: "soup",
        icon: GiApothecary
    },
    {
        id: 6,
        category: "rice",
        paramName: "rice",
        icon: GiBowlOfRice
    },
    {
        id: 7,
        category: "drinks",
        paramName: "drinks",
        icon: GiWineGlass
    },
    {
        id: 1,
        category: "icecream",
        paramName: "icecream",
        icon: IoIosIceCream
    },
    {
        id: 2,
        category: "fruit",
        paramName: "fruit",
        icon: GiFruiting
    },
]