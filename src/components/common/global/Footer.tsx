import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pt-4 pb-6">
      <div className="container mx-auto px-5">
        <p className="flex items-center gap-1 text-center mx-auto w-fit">
          <span>Made with</span>

          <i className="fi fi-rr-heart flex"></i>

          <span>by</span>

          <a
            target="_blank"
            href="https://sayuj.com.np"
            className="text-accent"
          >
            Sayuj Kuickel.
          </a>
        </p>

        <p className="text-xs text-on-surface/70 text-center w-fit mx-auto ">
          This site is under development. Data may be incomplete/wrong. <br />{" "}
          Feel free to{" "}
          <Link
            className="text-offText hover:text-white transition-all"
            to={"/contact"}
          >
            Contact
          </Link>{" "}
          me!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
