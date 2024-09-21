import { Link } from "react-router-dom";
import styles from "./styles/navbar.module.css";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import { SearchItemsProps } from "./types/models";
import { getProducts } from "./utils/getData";
import SearchResult from "./components/SearchResult";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getProducts();

      if (response) {
        setShow(true);
        setItems(response);
      }
    };
    getData();
  }, [show, searchTerm]);

  const clearSearch = () => setSearchTerm("");

  const searchedItems = items?.filter((item: SearchItemsProps) => {
    return (
      searchTerm &&
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link className={styles.title} to="/">
          <h2 className={styles.title}>UI-Front.</h2>
        </Link>
      </div>
      <div
        className={
          openSearch
            ? styles.center
            : ` ${styles.center} ${styles.center_active}`
        }
      >
        <input
          onChange={handleSearchChange}
          value={searchTerm}
          className={styles.search_input}
          type="text"
          placeholder="Type here to search."
        />
      </div>

      {searchedItems && show && (
        <div className={styles.search_results}>
          <SearchResult
            items={searchedItems}
            setSearchTerm={clearSearch}
            searchTerm={searchTerm}
            show={show}
          />
        </div>
      )}

      <div className={styles.right_nav}>
        <nav
          className={open ? `${styles.nav} ${styles.nav_active} ` : styles.nav}
        >
          <Link onClick={() => setOpen(false)} className={styles.link} to="/">
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className={styles.link}
            to="/about"
          >
            About
          </Link>
        </nav>

        <div className={styles.icons}>
          {openSearch ? (
            <CiSearch
              onClick={() => setOpenSearch(!openSearch)}
              className={styles.icon}
            />
          ) : (
            <IoCloseOutline
              onClick={() => setOpenSearch(!openSearch)}
              className={`${styles.icon} ${styles.close}`}
            />
          )}
          {open ? (
            <IoCloseOutline
              onClick={() => setOpen(false)}
              className={`${styles.icon} ${styles.close}`}
            />
          ) : (
            <CiMenuBurger
              className={styles.icon}
              onClick={() => setOpen(true)}
            />
          )}
        </div>
        <Cart />
      </div>
    </div>
  );
};

export default NavBar;
