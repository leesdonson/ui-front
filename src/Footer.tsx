import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="copyright">
        &copy; {year} UI-Front | Developed By:
        <Link target="_blank" to="https://krintifa.com">
          Krintifa Lab
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
