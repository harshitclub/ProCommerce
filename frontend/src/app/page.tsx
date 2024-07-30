import Footer from "@/components/global/footer/Footer";
import Navbar from "@/components/global/navbar/Navbar";
import Categories from "@/components/local/pages/home/categories/Categories";
import Hero from "@/components/local/pages/home/hero/Hero";
import HomeProducts from "@/components/local/pages/home/homeProducts/HomeProducts";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="homepage">
        <Categories />
        <Hero />
        <HomeProducts />
      </main>
      <Footer />
    </>
  );
}
