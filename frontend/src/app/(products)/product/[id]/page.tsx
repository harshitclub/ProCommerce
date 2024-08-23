import Image from "next/image";
import "./style.css";
import product from "@/assets/demo.jpg";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { PiMinus, PiPlus } from "react-icons/pi";
export default function Product() {
  return (
    <>
      <section className="productInfo width100 flex alignCenter justifyCenter">
        <div className="productInfoContainer width95 maxWidth flex alignStart justifyCenter gap1">
          <div className="productImages width45">
            <div className="mainImage marginBottom1">
              <Image src={product} alt="product" />
            </div>
            <div className="otherPImages flex alignCenter justifyStart gap1">
              <Image src={product} alt="" />
              <Image src={product} alt="" />
              <Image src={product} alt="" />
              <Image src={product} alt="" />
            </div>
          </div>
          <div className="productDetails width55 ">
            <div className="productDContent">
              <p className="breadCrumbs">
                <Link href="/">home</Link> /{" "}
                <Link href="/products">products</Link> /{" "}
                <Link href="/categories">home</Link> /{" "}
                <Link href="/slug">Adorn India Wood</Link>
              </p>
              <h1>
                Adorn India Wood Maddox Tufted L Shape 5- to 6-Person Sofa Sofa
                Set (Left Hand Side) Grey{" "}
              </h1>
              <p className="productDesc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                alias iure esse obcaecati id sed at necessitatibus possimus
                itaque nesciunt. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Qui vitae ab maiores officia explicabo rem
                magni optio beatae ullam earum!
              </p>
              <p className="productPrice">
                $999.45{" "}
                <span>
                  <s>$1299</s>
                </span>
              </p>

              <div className="addCartWish marginBottom1 flex alignCenter justifyStart gap1">
                <div className="pQuant flex alignCenter justifyCenter">
                  <input type="number" min={1} max={100} defaultValue={1} />
                </div>
                <button className="pAddToCart">
                  <AiOutlineShoppingCart
                    style={{
                      display: "inline-block",
                      margin: "-0.18rem 0.5rem 0 0",
                    }}
                  />{" "}
                  Add To Cart
                </button>
                <button className="pAddToWishlist">
                  <AiOutlineHeart
                    style={{
                      display: "inline-block",
                      margin: "-0.18rem 0.5rem 0 0",
                    }}
                  />{" "}
                  Add To Wishlist
                </button>
              </div>
              <p className="productSku">
                <span>SKU: </span>SOFA99GHJ
              </p>
              <p className="productCat">
                <span>Category: </span>
                Home
              </p>
              <p className="productBrand">
                <span>Brand: </span>
                Random Brand
              </p>
              <p className="productVendor">
                <span>Vendor: </span>
                Random Vendor
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
