import styles from "../styles/search.module.css";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";

const Search = ({
  openSearch,
  setOpenSearch,
}: {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const [openSearch, setOpenSearch] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div
      className={
        openSearch ? styles.center : ` ${styles.center} ${styles.center_active}`
      }
    >
      <input
        onChange={handleSearchChange}
        value={searchTerm}
        className={styles.search_input}
        type="text"
        placeholder="Type here to search."
      />

      {openSearch ? (
        <CiSearch
          onClick={() => setOpenSearch(!openSearch)}
          className={styles.icon}
        />
      ) : (
        <IoCloseOutline
          onClick={() => setOpenSearch(!openSearch)}
          className={styles.icon}
        />
      )}
    </div>
  );
};

export default Search;
