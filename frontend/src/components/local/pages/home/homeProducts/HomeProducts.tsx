import {
  HiArrowLongRight,
  HiArrowSmallRight,
  HiOutlineHeart,
} from "react-icons/hi2";
import "./style.css";
import iPhone from "../../../../../../public/assets/iphone.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AiOutlineShoppingCart } from "react-icons/ai";
export default function HomeProducts() {
  const electronics = [
    {
      name: "Apple iPhone 16 Pro with 100x Zoom (256 GB)",
      image: iPhone,
    },
    {
      name: "Apple iPhone 16 Pro with 100x Zoom (256 GB)",
      image: iPhone,
    },
    {
      name: "Apple iPhone 16 Pro with 100x Zoom (256 GB)",
      image: iPhone,
    },
    {
      name: "Apple iPhone 16 Pro with 100x Zoom (256 GB)",
      image: iPhone,
    },
  ];
  const fashion = [
    {
      name: "Shirt",
    },
    {
      name: "Shirt",
    },
    {
      name: "Shirt",
    },
    {
      name: "Shirt",
    },
  ];
  const home = [
    {
      name: "Sofa",
    },
    {
      name: "Sofa",
    },
    {
      name: "Sofa",
    },
    {
      name: "Sofa",
    },
  ];
  const kitchen = [
    {
      name: "Mixer",
    },
    {
      name: "Mixer",
    },
    {
      name: "Mixer",
    },
    {
      name: "Mixer",
    },
  ];

  function truncateText(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }
  return (
    <section className="homeProducts flex alignCenter justifyCenter width100">
      <div className="hProductsContainer width95 maxWidth">
        <div className="hProductsTab">
          <div className="hPTHead flex alignCenter spaceBtw">
            <h2>Electronics</h2>
            <a href="/">
              Expore More{" "}
              <HiArrowSmallRight style={{ display: "inline-block" }} />
            </a>
          </div>
          <div className="hProductTabChild flex alignCenter spaceBtw gap1">
            {electronics.map((item, index) => {
              return (
                <div key={index} className="hProductBox">
                  <div className="hPBWishlist width100 flex alignCenter justifyEnd">
                    <HiOutlineHeart className="hPBWishlistIcon" />
                  </div>
                  <div className="hPBImage">
                    {/* <Image src={item.image} alt="" /> */}
                    IMAGE
                  </div>
                  <h3>{truncateText(item.name, 35)}</h3>
                  <p>Shipped in 4-7 Days</p>
                  <h4>
                    <s>$1399</s> $1299
                  </h4>
                  <div className="hPBButtons flex alignCenter spaceBtw gap1">
                    <button className="hPBButton hPBButtonCart">
                      <AiOutlineShoppingCart
                        style={{ display: "inline-block" }}
                      />{" "}
                      Add To Cart
                    </button>
                    <button className="hPBButton">
                      {" "}
                      Buy Now{" "}
                      <HiArrowLongRight style={{ display: "inline-block" }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="hProductsTab marginTop3">
          <div className="hPTHead flex alignCenter spaceBtw">
            <h2>Fashion</h2>
            <a href="/">
              Expore More{" "}
              <HiArrowSmallRight style={{ display: "inline-block" }} />
            </a>
          </div>
          <div className="hProductTabChild flex alignCenter spaceBtw gap1">
            {fashion.map((item, index) => {
              return (
                <div key={index} className="hProductBox">
                  <div className="hPBWishlist width100 flex alignCenter justifyEnd">
                    <HiOutlineHeart className="hPBWishlistIcon" />
                  </div>
                  <div className="hPBImage">
                    {/* <Image src={item.image} alt="" /> */}
                    IMAGE
                  </div>
                  <h3>{truncateText(item.name, 35)}</h3>
                  <p>Shipped in 4-7 Days</p>
                  <h4>
                    <s>$1399</s> $1299
                  </h4>
                  <div className="hPBButtons flex alignCenter spaceBtw gap1">
                    <button className="hPBButton hPBButtonCart">
                      <AiOutlineShoppingCart
                        style={{ display: "inline-block" }}
                      />{" "}
                      Add To Cart
                    </button>
                    <button className="hPBButton">
                      {" "}
                      Buy Now{" "}
                      <HiArrowLongRight style={{ display: "inline-block" }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="hProductsTab marginTop3">
          <div className="hPTHead flex alignCenter spaceBtw">
            <h2>Home</h2>
            <a href="/">
              Expore More{" "}
              <HiArrowSmallRight style={{ display: "inline-block" }} />
            </a>
          </div>
          <div className="hProductTabChild flex alignCenter spaceBtw gap1">
            {home.map((item, index) => {
              return (
                <div key={index} className="hProductBox">
                  <div className="hPBWishlist width100 flex alignCenter justifyEnd">
                    <HiOutlineHeart className="hPBWishlistIcon" />
                  </div>
                  <div className="hPBImage">
                    {/* <Image src={item.image} alt="" /> */}
                    IMAGE
                  </div>
                  <h3>{truncateText(item.name, 35)}</h3>
                  <p>Shipped in 4-7 Days</p>
                  <h4>
                    <s>$1399</s> $1299
                  </h4>
                  <div className="hPBButtons flex alignCenter spaceBtw gap1">
                    <button className="hPBButton hPBButtonCart">
                      <AiOutlineShoppingCart
                        style={{ display: "inline-block" }}
                      />{" "}
                      Add To Cart
                    </button>
                    <button className="hPBButton">
                      {" "}
                      Buy Now{" "}
                      <HiArrowLongRight style={{ display: "inline-block" }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="hProductsTab marginTop3">
          <div className="hPTHead flex alignCenter spaceBtw">
            <h2>Kitchen</h2>
            <a href="/">
              Expore More{" "}
              <HiArrowSmallRight style={{ display: "inline-block" }} />
            </a>
          </div>
          <div className="hProductTabChild flex alignCenter spaceBtw gap1">
            {kitchen.map((item, index) => {
              return (
                <div key={index} className="hProductBox">
                  <div className="hPBWishlist width100 flex alignCenter justifyEnd">
                    <HiOutlineHeart className="hPBWishlistIcon" />
                  </div>
                  <div className="hPBImage">
                    {/* <Image src={item.image} alt="" /> */}
                    IMAGE
                  </div>
                  <h3>{truncateText(item.name, 35)}</h3>
                  <p>Shipped in 4-7 Days</p>
                  <h4>
                    <s>$1399</s> $1299
                  </h4>
                  <div className="hPBButtons flex alignCenter spaceBtw gap1">
                    <button className="hPBButton hPBButtonCart">
                      <AiOutlineShoppingCart
                        style={{ display: "inline-block" }}
                      />{" "}
                      Add To Cart
                    </button>
                    <button className="hPBButton">
                      {" "}
                      Buy Now{" "}
                      <HiArrowLongRight style={{ display: "inline-block" }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
