"use client";
import "./style.css";
import { BiSolidLockAlt, BiSolidUser } from "react-icons/bi";
import { RiArrowGoBackLine, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import { PiPhoneFill } from "react-icons/pi";
export default function Signup() {
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
      <section className="signup width100 flex alignCenter justifyCenter">
        <div className="signupContainer width95 maxWidth flex alignCenter justifyCenter">
          <div className="signupForm">
            <h1>Signup to ProCommerce</h1>
            <form>
              <div className="sInput flex alignCenter justifyStart gap1">
                <input
                  placeholder="First Name"
                  type="text"
                  className="width50"
                />
                <input
                  placeholder="Last Name"
                  type="text"
                  className="width50"
                />
              </div>
              <div className="lInput flex alignCenter justifyStart">
                <label>
                  <BiSolidUser style={{ color: "var(--mainBg3)" }} />
                </label>
                <input placeholder="Enter your email" type="email" />
              </div>
              <div className="lInput flex alignCenter justifyStart">
                <label>
                  <PiPhoneFill style={{ color: "var(--mainBg3)" }} />
                </label>
                <input placeholder="Enter your phone" type="tel" />
              </div>
              <div className="lInput flex alignCenter justifyStart">
                <label>
                  <BiSolidLockAlt style={{ color: "var(--mainBg3)" }} />
                </label>
                <input
                  placeholder="Create password"
                  type={showPass ? "text" : "password"}
                  style={{ flexGrow: "1" }}
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
              <div className="lInput flex alignCenter justifyStart">
                <label>
                  <BiSolidLockAlt style={{ color: "var(--mainBg3)" }} />
                </label>
                <input
                  placeholder="Confirm password"
                  type={showPass ? "text" : "password"}
                  style={{ flexGrow: "1" }}
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

              <button>Signup</button>
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
                Already Have Account? <Link href="/login">Login</Link>
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
