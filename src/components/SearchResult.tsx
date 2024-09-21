import { Link } from "react-router-dom";
import styles from "../styles/searchResult.module.css";
import { SearchItemsProps } from "../types/models";

interface SearchProps {
  searchTerm: string;
  items: SearchItemsProps[];
  show: boolean;
  setSearchTerm: () => void;
}

const SearchResult = ({
  searchTerm,
  show,
  items,
  setSearchTerm,
}: SearchProps) => {
  return (
    <section className={styles.container}>
      {show && searchTerm && (
        <div className={styles.searchResults}>
          {items.map((r: SearchItemsProps) => (
            <Link
              to={`/product/details/${r.id}`}
              onClick={setSearchTerm}
              className={styles.results}
              key={r.title}
            >
              {r.title}

              <img
                className={styles.resImg}
                width={30}
                height={30}
                src={r.images[0]}
                alt={r.title}
              />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchResult;
