import "./style.css";
export default function Categories() {
  return (
    <section className="categories flex alignCenter justifyCenter width100">
      <div className="catContainer flex alignCenter spaceBtw width95 maxWidth gap1 ">
        <a href="/" className="catBox">
          <p>Electronics</p>
        </a>
        <a href="/" className="catBox">
          <p>Fashion</p>
        </a>
        <a href="/" className="catBox">
          <p>Home</p>
        </a>
        <a href="/" className="catBox">
          <p>Health</p>
        </a>
        <a href="/" className="catBox">
          <p>Pets</p>
        </a>
        <a href="/" className="catBox">
          <p>Kids</p>
        </a>
        <a href="/" className="catBox">
          <p>Food</p>
        </a>
        <a href="/" className="catBox">
          <p>Crafts</p>
        </a>
        <a href="/" className="catBox">
          <p>Kitchen</p>
        </a>
        <a href="/" className="catBox">
          <p>More</p>
        </a>
      </div>
    </section>
  );
}
