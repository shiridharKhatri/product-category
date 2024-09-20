"use client";
import { HiIcons, RiIcons } from "../tools/icons";
import Image from "next/image";
import { useRef, useState } from "react";
import { data } from "../data/products";

export default function FeaturedProduct() {
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollAmount = 300;

  const scrollRight = () => {
    if (sliderRef.current) {
      const newScrollPosition = Math.min(
        scrollPosition + scrollAmount,
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      );
      sliderRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
      setScrollPosition(newScrollPosition);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const newScrollPosition = Math.max(scrollPosition - scrollAmount, 0);
      sliderRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
      setScrollPosition(newScrollPosition);
    }
  };

  return (
    <section className="featured-categories-container">
      <div className="head-title">
        <div className="title">Featured Categories</div>
        <div className="short-description">Check Out What&apos;s New In Frames.</div>
      </div>
      <div className="product-slider-container">
        <div className="slider" ref={sliderRef}>
          {data?.map((element, index) => {
            return (
              <div key={index} className="card">
                <div className="image">
                  <Image
                    src={element.image}
                    width={500}
                    height={500}
                    alt={element.title}
                    loading="eager"
                  />
                </div>
                <div className="details">
                  <div className="text">
                    <div className="product-title">{element.title}</div>
                    <p>{element.description}</p>
                  </div>
                  <div className="bookmark">
                    <div className="icon">
                      <HiIcons.HiOutlineBookmark />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="navigation-arrows">
          <button onClick={scrollLeft} disabled={scrollPosition === 0}>
            <RiIcons.RiArrowLeftLine />
          </button>
          <button
            onClick={scrollRight}
            disabled={
              scrollPosition >=
              sliderRef.current?.scrollWidth - sliderRef.current?.clientWidth
            }
          >
            <RiIcons.RiArrowRightLine />
          </button>
        </div>
      </div>
    </section>
  );
}
