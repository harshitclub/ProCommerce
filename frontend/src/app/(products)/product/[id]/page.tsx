import Image from "next/image";
import "./style.css";
import product from "@/assets/demo.jpg";
export default function Product() {
  return (
    <>
      <section className="productInfo width100 flex alignCenter justifyCenter">
        <div className="productInfoContainer width95 maxWidth flex alignStart justifyCenter gap1">
          <div className="productImages width50">
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
          <div className="productDetails width50 ">
            <div className="productDContent">
              <h1>
                Adorn India Wood Maddox Tufted L Shape 5- to 6-Person Sofa Sofa
                Set (Left Hand Side) Grey{" "}
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                alias iure esse obcaecati id sed at necessitatibus possimus
                itaque nesciunt. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Qui vitae ab maiores officia explicabo rem
                magni optio beatae ullam earum!
              </p>
              <p className="productPrice">$999.45</p>
              <p className="productSku">SOFA99GHJ</p>
              <div className="addCartwish">
                <button>Add To Cart</button>
                <button>Add To Wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
