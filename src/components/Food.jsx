import React, {useState}from 'react';
import smokeburger from "../assets/smokeburger.png";
import classicburger from "../assets/classicburger.png";
import veggieburger from "../assets/veggieburger.png";
import chickenbreast from "../assets/chickenbreast.png";
import chickenbites from "../assets/ChickenBites.png";
import crinklefries from "../assets/crinklefries.png";
import cheesefries from "../assets/cheesefries.png";
import coke from "../assets/coke.png";
import lemonade from "../assets/lemonade.png";
import sprite from "../assets/sprite.png";

const menuData = {
    burger: [
        {
            id: 1,
            title: "Smoke Burger®",
            desc: "Angus beef, American cheese, applewood smoked bacon.",
            cals: "830 cals",
            isVeg: false,
            image: smokeburger,
        },
        {
            id: 2,
            title: "Classic Burger®",
            desc: "Cheeseburger with lettuce, tomato and ShackSauce.",
            cals: "500 cals",
            isVeg: false,
            image: classicburger,
        },
        {
            id: 3,
            title: "Veggie Burger™",
            desc: "Mushroom-based veggie patty with cheese.",
            cals: "910 cals",
            isVeg: true,
            image: veggieburger,
        },
    ],
    chicken: [
        {
            id: 4,
            title: "Chicken Breast",
            desc: "Crispy chicken breast with lettuce and herb mayo.",
            cals: "550 cals",
            isVeg: false,
            image: chickenbreast,
        },
        {
            id: 5,
            title: "Chicken Bites",
            desc: "Crispy whole white meat chicken bites.",
            cals: "300 cals",
            isVeg: false,
            image: chickenbites,
        },
    ],
    fries: [
        {
            id: 6,
            title: "Crinkle Cut Fries",
            desc: "Classic crinkle cut fries.",
            cals: "420 cals",
            isVeg: true,
            image: crinklefries,
        },
        {
            id: 7,
            title: "Cheese Fries",
            desc: "Topped with cheese sauce.",
            cals: "560 cals",
            isVeg: true,
            image: cheesefries,
        },
    ],
    drinks: [
        {
            id: 8,
            title: "Coke",
            desc: "Classic Coca-Cola.",
            cals: "300 cals",
            isVeg: true,
            image: coke,
        },
        {
            id: 9,
            title: "Lemonade",
            desc: "Fresh squeezed lemonade.",
            cals: "360 cals",
            isVeg: true,
            image: lemonade,
        },
        {
            id: 10,
            title: "Sprite",
            desc: "Refreshing lemon-lime soda.",
            cals: "300 cals",
            isVeg: true,
            image: sprite,
        },
    ],
};
const categories = [
    { id: "all", label: "All" },
    { id: "burger", label: "Burgers" },
    { id: "chicken", label: "Chicken" },
    { id: "fries", label: "Fries" },
    { id: "drinks", label: "Drinks" },
];

const FoodAndDrinks = () => {

    const [activeCategory, setActiveCategory] = useState('all');

    return (
        <section id="food-and-drinks" className="px-8 md:px-16 py-12 bg-black">
            {/* 标题部分 */}
            <div className="flex items-center justify-between mb-8 border-l-4 border-red-600 pl-4">
                <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">
                    Food & Drinks
                </h2>
            </div>


            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                            activeCategory === category.id
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {/* ✅ 显示菜品 - 根据选中的分类 */}
            <div className="space-y-12">
                {activeCategory === 'all'
                    ? // 显示所有分类
                    Object.entries(menuData).map(([categoryKey, items]) => (
                        <div key={categoryKey}>
                            <h2 className="text-3xl font-bold text-white mb-8 capitalize border-b border-gray-700 pb-2">
                                {categoryKey}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="border border-gray-800 rounded-xl p-6 hover:shadow-md transition flex flex-col gap-4 bg-black"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <h3 className="text-xl font-bold text-white">
                                                        {item.title}
                                                    </h3>
                                                    {item.isVeg && (
                                                        <span className="text-xs font-bold text-white px-2 rounded">
                                                  VEG
                                              </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-400">{item.desc}</p>
                                                <p className="text-xs text-gray-500 mt-2">{item.cals}</p>
                                            </div>
                                            <button className="mt-4 w-full py-2 rounded-full bg-white font-bold hover:brightness-90 transition">
                                                Start Order
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                    : // 显示单个分类
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-8 capitalize">
                            {activeCategory}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            {menuData[activeCategory].map((item) => (
                                <div
                                    key={item.id}
                                    className="border border-gray-800 rounded-xl p-6 hover:shadow-md transition flex flex-col gap-4 bg-black"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <h3 className="text-xl font-bold text-white">
                                                    {item.title}
                                                </h3>
                                                {item.isVeg && (
                                                    <span className="text-xs font-bold text-white px-2 rounded">
                                              VEG
                                          </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-400">{item.desc}</p>
                                            <p className="text-xs text-gray-500 mt-2">{item.cals}</p>
                                        </div>
                                        <button className="mt-4 w-full py-2 rounded-full bg-white font-bold hover:brightness-90 transition">
                                            Start Order
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </section>
    );
};

export default FoodAndDrinks;