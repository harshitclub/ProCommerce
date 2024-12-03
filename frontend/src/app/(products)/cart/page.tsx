import "./style.css";

export default function Cart() {
  return (
    <>
      <section className="cartHeader width100 flex alignCenter justifyCenter">
        <div className="cartHContainer width95 maxWidth">
          <h1>Shopping Cart</h1>
        </div>
      </section>
      <section className="cart width100 flex alignCenter justifyCenter">
        <div className="cartContainer width95 maxWidth"></div>
      </section>
    </>
  );
}
