import Image from "next/image";
import MainPaddingLayout from "../_layouts/MainPaddingLayout";
import Hero from "../_components/Home/Hero";
import SearchAndCategories from "../_components/Home/SearchAndCategories";
import PopularTests from "../_components/Home/PopularTests";
import LatestTests from "../_components/Home/LatestTests";
import Banner1 from "../_components/Home/Banner1";

export default function Home() {
  return (
    <div className="pt-10 pb-10">
      <MainPaddingLayout>
        <div className="flex flex-col gap-5">
          <Hero />
          <hr className="mt-5" />
          <SearchAndCategories />
          <PopularTests />
          <img src="/banner1.png" alt="" className="h-[300px] object-cover mt-5 object-top" />
          <LatestTests />
        </div>
      </MainPaddingLayout>
    </div>
  );
}
