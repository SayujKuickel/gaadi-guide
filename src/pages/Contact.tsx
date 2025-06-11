import GoBackButtonSection from "@/components/bus/GoBackButtonWrapper";
import PageLayout from "@/layout/PageLayout";

const Contact = () => {
  return (
    <PageLayout>
      <div className="container-small mx-auto px-5 my-8 h-screen rounded-2xl">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScK5KYuMGoyg-t-FNYI85wHtpCcYiwb67RLtX86kPiRY1c39Q/viewform?embedded=true"
          width="100%"
          height="100%"
          className="bg-surface rounded-2xl"
        >
          Loading…
        </iframe>
      </div>
    </PageLayout>
  );
};

export default Contact;
