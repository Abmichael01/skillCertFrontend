"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useCategoriesQuery } from "../../_dataOperations/queries/queries";
import Link from "next/link";
import { useParams } from "next/navigation";

const Categories = () => {
  const params = useParams()
  const currentCategoryId = params.id
  const [scrollToRight, setScrollToRight] = useState<boolean>(true);
  const [scrollToLeft, setScrollToLeft] = useState<boolean>(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const { data, error } = useCategoriesQuery();

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (categoriesRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          categoriesRef.current as HTMLDivElement;
        setScrollToRight(!(scrollLeft === scrollWidth - clientWidth));
        setScrollToLeft(!(scrollLeft == 0));
      }
    };

    const currentRef = categoriesRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

    useEffect(()=>{
      const currentCategory = document.querySelector(".current-category") as HTMLElement
      if (currentCategory) {
        const scrollableContainer = currentCategory.parentElement;

        if (scrollableContainer) {
          // Calculate the center position
          const containerWidth = scrollableContainer.clientWidth;
          const elementOffsetLeft = currentCategory.offsetLeft;
          const elementWidth = currentCategory.clientWidth;

          // Scroll to center: element's position minus half the container's width plus half the element's width
          const scrollPosition = elementOffsetLeft - containerWidth / 2 + elementWidth / 2;

          setTimeout(()=>{
            scrollableContainer.scrollTo({
              left: scrollPosition,
              behavior: "smooth", // For smooth scrolling
            });
          }, 200)
        }
      }
    }, [])

  const scrollLeft = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setTimeout(() => {
        const { scrollLeft, scrollWidth, clientWidth } =
          categoriesRef.current as HTMLDivElement;
        setScrollToRight(!(scrollLeft === scrollWidth - clientWidth));
        setScrollToLeft(!(scrollLeft == 0));
      }, 300);
    }
  };

  const scrollRight = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: 200, behavior: "smooth" });
      setTimeout(() => {
        const { scrollLeft, scrollWidth, clientWidth } =
          categoriesRef.current as HTMLDivElement;
        setScrollToRight(!(scrollLeft === scrollWidth - clientWidth));
        setScrollToLeft(!(scrollLeft == 0));
      }, 300);
    }
  };

  return (
    <div className="w-full relative mt-10 flex justify-center">
      <div
        className="flex gap-5 max-w-full overflow-x-scroll no-scrollbar relative"
        ref={categoriesRef}
      >
        {data?.map((category, index) => (
          <Link
            key={category.id}
            href={`/category/${category.id}?page=1`}
            className={`px-8 py-4 rounded-md bg-primary-200 flex flex-col items-center gap-3 cursor-pointer group ${
              category.id === Number(currentCategoryId) ? "bg-primary-700 current-category" : "bg-primary-200"
            }`}
          >
            <div className={`text-3xl  font-bold group-hover:scale-[1.15] transition ${
              category.id === Number(currentCategoryId) ? "text-primary-100" : "text-primary-700"
            }`}>
              {category.name.slice(0, 1)}
            </div>
            <h1 className={`text-sm font-semibold text-nowrap ${
              category.id === Number(currentCategoryId) ? "text-primary-200" : "text-primary-900"
            } `}>
              {category.name}
            </h1>
          </Link>
        ))}
      </div>

      {scrollToLeft && (
        <div className="absolute left-0 top-0 h-full flex items-center bg-gradient-to-r from-white to-none">
          <Button
            onClick={scrollLeft}
            variant="outline"
            className="rounded-full shadow-lg"
          >
            <ArrowLeft />
          </Button>
        </div>
      )}

      {scrollToRight && (
        <div className="absolute right-0 top-0 h-full flex items-center bg-gradient-to-l from-white to-none">
          <Button
            onClick={scrollRight}
            variant="secondary"
            className="rounded-full shadow-lg"
          >
            <ArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Categories;
