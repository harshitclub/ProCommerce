import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiArrowLongRight, HiOutlineHeart } from "react-icons/hi2";
import "./style.css";
export default function ProductCard() {
  return (
    <div className="productCard">
      <div className="pCWishlist width100 flex alignCenter justifyEnd">
        <HiOutlineHeart className="pCWishlistIcon" />
      </div>
      <div className="pCImage">
        {/* <Image src={item.image} alt="" /> */}
        IMAGE
      </div>
      <h3>Apple iPhone 16 Pro with 100x Zoom ...</h3>
      <p>Shipped in 4-7 Days</p>
      <h4>
        <s>$1399</s> $1299
      </h4>
      <div className="pCButtons flex alignCenter spaceBtw gap1">
        <button className="pCButton pCButtonCart">
          <AiOutlineShoppingCart style={{ display: "inline-block" }} /> Add To
          Cart
        </button>
        <button className="pCButton">
          {" "}
          Buy Now <HiArrowLongRight style={{ display: "inline-block" }} />
        </button>
      </div>
    </div>
  );
}
