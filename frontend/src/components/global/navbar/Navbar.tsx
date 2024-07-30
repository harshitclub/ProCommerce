import "./style.css";
import { Input } from "@/components/ui/input";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { HiArrowUpRight } from "react-icons/hi2";
export default function Navbar() {
  return (
    <nav className="width100 flex alignCenter justifyCenter">
      <div className="navbar flex spaceBtw alignCenter gap2 width95 maxWidth">
        <div className="logo">
          <h1>ProCommerce</h1>
        </div>
        <div className="navSearch">
          <Input
            type="text"
            placeholder="Search for Products, Brands and More"
          />
        </div>
        <div className="menu">
          <ul className="flex gap2">
            <li>
              <a href="/">
                <AiOutlineUser style={{ display: "inline-block" }} /> Login
              </a>
            </li>
            <li>
              <a href="/">
                <HiArrowUpRight style={{ display: "inline-block" }} /> Signup
              </a>
            </li>
            <li>
              <a href="/">
                <AiOutlineShoppingCart style={{ display: "inline-block" }} />{" "}
                Cart
              </a>
            </li>
            <li>
              <a href="/">
                <AiOutlineHeart style={{ display: "inline-block" }} /> Wishlist
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
