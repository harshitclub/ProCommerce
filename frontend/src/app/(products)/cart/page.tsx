import { AiOutlineShoppingCart } from "react-icons/ai";
import "./style.css";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { PiTruckFill } from "react-icons/pi";

export default function Cart() {
  return (
    <>
      <section className="cartHeader width100 flex alignCenter justifyCenter">
        <div className="cartHContainer width95 maxWidth flex justifyCenter alignCenter">
          <h1>
            Shopping Cart{" "}
            <AiOutlineShoppingCart
              style={{ display: "inline-block", marginBottom: "-0.2rem" }}
            />
          </h1>
        </div>
      </section>
      <section className="cart width100 flex alignCenter justifyCenter">
        <div className="cartContainer width95 maxWidth">
          <div className="cartTable">
            <table>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="cartTableProduct">
                    <img src="https://via.placeholder.com/120x150" alt="" />
                    <h2>
                      <a href="/product/dfdkfjdkf">
                        Premium Hardwood Dining Chair
                      </a>
                    </h2>
                  </td>
                  <td className="cartTablePrice">$129.00</td>
                  <td className="cartTableQuantity">
                    <div className="ctqBox">
                      <button>-</button>
                      <input type="number" placeholder="1" />
                      <button>+</button>
                    </div>
                  </td>
                  <td className="cartTableSubTotal">$129.00</td>
                  <td>
                    <MdClose className="cartItemRemoveIcon" />
                  </td>
                </tr>
                <tr>
                  <td className="cartTableProduct">
                    <img src="https://via.placeholder.com/120x150" alt="" />
                    <h2>
                      <a href="/product/dfdkfjdkf">
                        Premium Hardwood Dining Chair
                      </a>
                    </h2>
                  </td>
                  <td className="cartTablePrice">$129.00</td>
                  <td className="cartTableQuantity">
                    <div className="ctqBox">
                      <button>-</button>
                      <input type="number" placeholder="1" />
                      <button>+</button>
                    </div>
                  </td>
                  <td className="cartTableSubTotal">$129.00</td>
                  <td>
                    <MdClose className="cartItemRemoveIcon" />
                  </td>
                </tr>
                <tr>
                  <td className="cartTableProduct">
                    <img src="https://via.placeholder.com/120x150" alt="" />
                    <h2>
                      <a href="/product/dfdkfjdkf">
                        Premium Hardwood Dining Chair
                      </a>
                    </h2>
                  </td>
                  <td className="cartTablePrice">$129.00</td>
                  <td className="cartTableQuantity">
                    <div className="ctqBox">
                      <button>-</button>
                      <input type="number" placeholder="1" />
                      <button>+</button>
                    </div>
                  </td>
                  <td className="cartTableSubTotal">$129.00</td>
                  <td>
                    <MdClose className="cartItemRemoveIcon" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="cartShipping width100 flex alignCenter justifyCenter">
        <div className="cartShipContainer width95 maxWidth">
          <div className="cartShipCBoxSuccess width100">
            <p>
              <PiTruckFill
                style={{ marginBottom: "-0.29rem", fontSize: "1.5rem" }}
              />{" "}
              Your order qualifies for free shipping!
            </p>
          </div>
          <div className="cartShipCBoxFailed width100">
            <p>
              <PiTruckFill
                style={{ marginBottom: "-0.29rem", fontSize: "1.5rem" }}
              />{" "}
              Your order not qualifies for free shipping!
            </p>
          </div>
        </div>
      </section>
      <section className="cartSubtotal width100 flex alignCenter justifyCenter">
        <div className="cartSubtotalContainer width95 maxWidth">
          <div className="cartSubtotalBox">
            <div className="csbTab flex alignCenter spaceBtw">
              <h3>SUBTOTAL</h3>
              <p>$129.00</p>
            </div>
            <div className="csbCoupon">
              <h4>Have a coupon?</h4>
              <div className="csbCouponBox flex gap1">
                <input type="text" placeholder="Coupon Code" />
                <button>Apply</button>
              </div>
            </div>
            <div className="csbTab flex alignCenter spaceBtw">
              <h3>TOTAL</h3>
              <p>$129.00</p>
            </div>
            <button>Proceed to checkout</button>
          </div>
        </div>
      </section>
    </>
  );
}
