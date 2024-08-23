"use client";
import { BiSolidLockAlt, BiSolidUser } from "react-icons/bi";
import "./style.css";
import { RiArrowGoBackLine, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const showPassword = () => {
    if (showPass) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
  };
  return (
    <>
      <section className="login width100 flex alignCenter justifyCenter ">
        <div className="loginContainer width95 maxWidth flex alignCenter justifyCenter">
          <div className="loginForm">
            <h1>Login to ProCommerce</h1>
            <form>
              <div className="lInput flex alignCenter justifyStart">
                <label>
                  <BiSolidUser style={{ color: "var(--mainBg3)" }} />
                </label>
                <input placeholder="Enter your email" type="email" />
              </div>
              <div className="lInput flex alignCenter justifyStart">
                <label>
                  <BiSolidLockAlt style={{ color: "var(--mainBg3)" }} />
                </label>
                <input
                  placeholder="Enter your password"
                  type={showPass ? "text" : "password"}
                />
                {showPass ? (
                  <RiEyeFill
                    onClick={showPassword}
                    style={{ cursor: "pointer", color: "var(--mainBg3)" }}
                  />
                ) : (
                  <RiEyeOffFill
                    onClick={showPassword}
                    style={{ cursor: "pointer", color: "var(--mainBg3)" }}
                  />
                )}
              </div>

              <button>Login</button>
              <p style={{ margin: "0 0 0.5rem 0" }}>
                <Link href="/">Forget Password?</Link>
              </p>
              <p
                style={{
                  borderBottom: "1px solid var(--light3)",
                  marginBottom: "0.5rem",
                  paddingBottom: "0.5rem",
                }}
              >
                Don&apos;t Have Account? <Link href="/signup">Signup</Link>
              </p>
              <p style={{ textAlign: "center" }}>
                <Link href="/">
                  Return To Home{" "}
                  <RiArrowGoBackLine style={{ display: "inline-block" }} />
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
