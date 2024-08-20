import Link from "next/link";
import { PiArrowRightLight } from "react-icons/pi";

export default function NotFound() {
  return (
    <>
      <main className="notFound width100 flex alignCenter justifyCenter">
        <section className="notFoundContainer width95 flex alignCenter justifyCenter maxWidth flexColumn">
          <h1>ProCommerce</h1>
          <h2>404</h2>
          <h3>There&apos;s NOTHING here...</h3>
          <p>
            ...maybe the page you&apos;re looking for is not found or never
            existed.
          </p>
          <Link href="/">
            Back to home{" "}
            <PiArrowRightLight
              style={{ display: "inline-block", margin: "0 0 0 1rem" }}
            />
          </Link>
        </section>
      </main>
    </>
  );
}
