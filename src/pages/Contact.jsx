import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

const Contact = () => {
  return (
    <main className="bg-background text-text min-h-screen">
      <Header />

      <div className=" container-small mx-auto px-5 my-8 h-screen rounded-2xl">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScK5KYuMGoyg-t-FNYI85wHtpCcYiwb67RLtX86kPiRY1c39Q/viewform?embedded=true"
          width="100%"
          height="100%"
          className="bg-text rounded-2xl"
        >
          Loading…
        </iframe>
      </div>

      <Footer />
    </main>
  );
};

export default Contact;
