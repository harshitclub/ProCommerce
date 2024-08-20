import "./style.css";
export default function Product() {
  return (
    <>
      <section className="productInfo width100 flex alignCenter justifyCenter">
        <div className="productInfoContainer width95 maxWidth flex alignCenter justifyCenter gap1">
          <div className="productImages width50">Product Image</div>
          <div className="productDetails width50">Product Details</div>
        </div>
      </section>
    </>
  );
}
