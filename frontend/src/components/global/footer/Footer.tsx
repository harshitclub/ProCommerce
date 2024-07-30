import "./style.css";
export default function Footer() {
  return (
    <footer className="width100 flex alignCenter justifyCenter flexColumn">
      <div className="footerContainer width95 maxWidth flex alignStart spaceBtw gap1">
        <div className="fMenu">
          <h3>Pages</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Login</a>
            </li>
            <li>
              <a href="/">Signup</a>
            </li>
            <li>
              <a href="/">Signup As Vendor</a>
            </li>
            <li>
              <a href="/">Signup As Brand</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
        </div>
        <div className="fMenu">
          <h3>Social</h3>
          <ul>
            <li>
              <a href="/">Instagram</a>
            </li>
            <li>
              <a href="/">Twitter</a>
            </li>
            <li>
              <a href="/">Facebook</a>
            </li>
            <li>
              <a href="/">LinkedIn</a>
            </li>
            <li>
              <a href="/">Pinterest</a>
            </li>
          </ul>
        </div>
        <div className="fMenu">
          <h3>Categories</h3>
          <ul>
            <li>
              <a href="/">Electronics</a>
            </li>
            <li>
              <a href="/">Fashion</a>
            </li>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Health</a>
            </li>
            <li>
              <a href="/">Pets</a>
            </li>
            <li>
              <a href="/">Kids</a>
            </li>
            <li>
              <a href="/">Food</a>
            </li>
            <li>
              <a href="/">Crafts</a>
            </li>
            <li>
              <a href="/">Kitchen</a>
            </li>
            <li>
              <a href="/">More</a>
            </li>
          </ul>
        </div>
        <div className="fMenu">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Smartphone</a>
            </li>
            <li>
              <a href="/">Tablet</a>
            </li>
            <li>
              <a href="/">Laptop</a>
            </li>
            <li>
              <a href="/">Refrigerator</a>
            </li>
            <li>
              <a href="/">Toys</a>
            </li>
            <li>
              <a href="/">Accessories</a>
            </li>
            <li>
              <a href="/">Purifiers</a>
            </li>
            <li>
              <a href="/">Shirts</a>
            </li>
            <li>
              <a href="/">T-Shirts</a>
            </li>
          </ul>
        </div>
        <div className="fMenu">
          <h3>Legal</h3>
          <ul>
            <li>
              <a href="/">Privacy & Policy</a>
            </li>
            <li>
              <a href="/">Terms & Conditions</a>
            </li>
            <li>
              <a href="/">Refund Policy</a>
            </li>
            <li>
              <a href="/">Return Policy</a>
            </li>
            <li>
              <a href="/">Careers</a>
            </li>
          </ul>
        </div>
        <div className="fMenu">
          <h1>ProCommerce</h1>
        </div>
      </div>
      <div className="fCopyright width95 maxWidth flex alignCenter spaceBtw">
        <p>© Copyright 2024 | ProCommerce Pvt. Ltd</p>
        <a href="/">Super Admin</a>
      </div>
    </footer>
  );
}
