import Footer from "@/components/global/footer/Footer";
import Navbar from "@/components/global/navbar/Navbar";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
