import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const TextParallaxContentExample = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="imgs/TC/p_1.jpg"
        subheading="Collaborate"
        heading="Built for all of us."
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="imgs/TC/p_2.jpg"
        subheading="Quality"
        heading="Never compromise."
      >
        <ExampleContent1 />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="imgs/TC/p_3.jpg"
        subheading="Modern"
        heading="Dress for the best."
      >
        <ExampleContent2 />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
        Additional content explaining the above card here
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
          we believe that furniture is more than just functional—it's an
          expression of your personality and style. Whether you're looking for
          modern, classic, or custom-made pieces, we offer a wide range of
          high-quality furniture to transform your home or office. Explore our
          collection and find the perfect addition to your space today!
        </p>

        <button
          className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit"
          onClick={() => navigate("/new-arrivals")}
        >
          Explore More <FiArrowUpRight className="inline" />
        </button>
      </div>
    </div>
  );
};
const ExampleContent2 = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Discover the Perfect Furniture for Every Space
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        From cozy sofas and elegant dining sets to stylish office desks and space-saving storage solutions, we have everything you need to enhance your interior. Our carefully curated selection ensures durability, comfort, and a touch of sophistication in every piece. Browse through our categories and bring your vision to life with furniture that blends beauty and functionality.
        </p>

        <button
          className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit"
          onClick={() => navigate("/new-arrivals")}
        >
          Explore More <FiArrowUpRight className="inline" />
        </button>
      </div>
    </div>
  );
};
const ExampleContent1 = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Transform Your Home with Just a Click!
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Shopping for furniture has never been easier. With our user-friendly website, you can browse, select, and order your favorite pieces from the comfort of your home. Enjoy a seamless shopping experience with secure payment options and reliable customer support.
        </p>

        <button
          className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit"
          onClick={() => navigate("/new-arrivals")}
        >
          Explore More <FiArrowUpRight className="inline" />
        </button>
      </div>
    </div>
  );
};
