import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-12 pt-48 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Better every day
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
        Find Your Perfect Piece Today
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
        Transform your home with our exquisite collection of handcrafted furniture. Each piece is designed to blend functionality with elegance, adding a touch of charm to your living spaces. Whether you’re looking for timeless classics or modern designs, our range has something for everyone. Start your journey toward creating a home you love—choose quality, choose style, choose us.
        </p>
        <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
        Discover
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "imgs/TC/1.jpg",
  },
  {
    id: 2,
    src: "imgs/TC/2.jpg",
  },
  {
    id: 3,
    src: "imgs/TC/3.jpg",
  },
  {
    id: 4,
    src: "imgs/TC/4.jpg",
  },
  {
    id: 5,
    src: "imgs/TC/5.jpg",
  },
  {
    id: 6,
    src: "imgs/TC/6.jpg",
  },
  {
    id: 7,
    src: "imgs/TC/7.jpg",
  },
  {
    id: 8,
    src: "imgs/TC/8.jpg",
  },
  {
    id: 9,
    src: "imgs/TC/9.jpg",
  },
  {
    id: 10,
    src: "imgs/TC/10.jpg",
  },
  {
    id: 11,
    src: "imgs/TC/11.jpg",
  },
  {
    id: 12,
    src: "imgs/TC/12.jpg",
  },
  {
    id: 13,
    src: "imgs/TC/13.jpg",
  },
  {
    id: 14,
    src: "imgs/TC/14.jpg",
  },
  {
    id: 15,
    src: "imgs/TC/15.jpg",
  },
  {
    id: 16,
    src: "imgs/TC/16.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;