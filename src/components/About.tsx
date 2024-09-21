import { Link } from "react-router-dom";
import styles from "../styles/about.module.css";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.container}>
        <h1 className={styles.title}>About</h1>
        <h2 className={styles.subtitle}>Hi, welcome to UI-Front.</h2>
        <p className={styles.description}>
          UI-Front is an E-Commerce application which list and showcase all
          products. It is a full fledge E-Commerce application where you can
          perform any shopping related things like you would normally do on any
          other E-Commerce application.
        </p>
        <p className={styles.description}>
          This application is build by{" "}
          <Link target="_blank" to="https://krintifalab.com/">
            Krintifa Lab{" "}
          </Link>{" "}
          as part of their portfolio project. The technologies we used are
          TypeScript, React.js and Vite. These are the technologies we used and
          they are currently the most popular technologies used in the web
          development industry.
        </p>
        <p className={styles.description}>
          The application consumes an API from an external API, called Dummy
          JSON. It is a free and open-source API that provides data in JSON
          format for use in testing and prototyping. You can read more about it
          here{" "}
          <Link target="_blank" to="https://dummyjson.com/">
            Dummy JSON
          </Link>{" "}
          if you wish to.
        </p>
        <p className={styles.description}>
          We make this as an open-source project so that anyone can use it. The
          source code is available on GitHub. If you want to check that out, you
          can click here{" "}
          <Link target="_blank" to="https://github.com/leesdonson/ui-front">
            UI-Front
          </Link>
          .
        </p>
        <div className={styles.btn_box}>
          <button
            onClick={() => (window.location.href = "/products")}
            className={styles.btn}
            type="button"
          >
            Browse Products
          </button>
        </div>
        <div className={styles.developer}>
          <div className={styles.image_box}>
            <img
              className={styles.image}
              src="https://res.cloudinary.com/dudgy6ypy/image/upload/v1726457069/IMG_20240726_165942_vatvyv.png"
              alt="developer"
            />
          </div>
          <div className={styles.info}>
            <p className={styles.developer_name}>Lee Donson</p>
            <p className={styles.developer_role}>
              Software Developer @krintifalab
            </p>
            <div className={styles.socials}>
              <Link
                className={styles.icon}
                target="_blank"
                to="https://www.facebook.com/leesdonson"
              >
                <FaFacebook />
              </Link>
              <Link
                className={styles.icon}
                target="_blank"
                to="https://www.instagram.com/lee_donson/"
              >
                <FaInstagram />
              </Link>
              <Link
                className={styles.icon}
                target="_blank"
                to="https://github.com/leesdonson"
              >
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
