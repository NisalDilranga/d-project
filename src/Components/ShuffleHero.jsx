import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShuffleHero = () => {
   const navigate = useNavigate();
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
        <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95" onClick={() => navigate("/new-arrivals")}>
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
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Fliving.jpg?alt=media&token=db1a8ff0-fb69-43ee-84e7-7556d29463b4",
  },
  {
    id: 2,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Fliving.jpg?alt=media&token=db1a8ff0-fb69-43ee-84e7-7556d29463b4",
  },
  {
    id: 3,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Foffice%2Fgarden-825741_1280.jpg?alt=media&token=38666d81-9647-477f-a8c4-3e260eb4fae0",
  },
  {
    id: 4,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Foffice%2Foffice-945348_1280.jpg?alt=media&token=819afa97-fca5-4491-8483-371b2c212814",
  },
  {
    id: 5,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Foffice%2Fhanging-chair-2451365_1280.jpg?alt=media&token=ec749aff-5567-4b3c-a7ce-f86cbbca7235",
  },
  {
    id: 6,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Foffice%2Fdesk-2376116_1280.jpg?alt=media&token=c314fb70-34a1-4c81-8821-933c658ba6d0",
  },
  {
    id: 7,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Foffice%2Fhanging-chair-2451365_1280.jpg?alt=media&token=ec749aff-5567-4b3c-a7ce-f86cbbca7235",
  },
  {
    id: 8,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Foffice%2Ftable-2583879_1280.jpg?alt=media&token=8a08a6fb-359f-45d0-811d-99672e9cd7c0",
  },
  {
    id: 9,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Foffice%2Ftable-2587598_1280.jpg?alt=media&token=667f81e6-1f61-4522-bcf2-967213a09193",
  },
  {
    id: 10,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Foffice%2Fchair-1379580_1280.jpg?alt=media&token=97bb1c55-5fc5-4c4d-94bc-9e4235b258f5",
  },
  {
    id: 11,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Fliving%20room%2Fpexels-catscoming-707579.jpg?alt=media&token=7701a8dc-5745-4ad3-81c6-c03d56bc1e17",
  },
  {
    id: 12,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Fliving%20room%2Freal-estate-9265408_1280.jpg?alt=media&token=58a1d511-9fe6-41c7-b5fd-65a5ad5fd2f9",
  },
  {
    id: 13,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Fliving%20room%2Freal-estate-6893060_1280.jpg?alt=media&token=70be9c66-2f71-4acf-9ad3-d8447c456e67",
  },
  {
    id: 14,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Fliving%20room%2Fliving-room-9073734_1280.jpg?alt=media&token=3bb11fbf-c059-4d73-b802-1219924ba347",
  },
  {
    id: 15,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Fdecorative-8800609_1280.jpg?alt=media&token=1d3da4e9-8193-4556-a936-56c0d7e7d5b0",
  },
  {
    id: 16,
    src: "https://firebasestorage.googleapis.com/v0/b/images-312f9.appspot.com/o/woodsProducts%2Fpexels-heyho-6265940.jpg?alt=media&token=331c80dd-3234-4142-9cb9-3ff6f24c83b0",
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