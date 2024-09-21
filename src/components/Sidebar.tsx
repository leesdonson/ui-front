import { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import styles from "../styles/sidebar.module.css";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "Apple",
    "Samsung",
    "Watch",
    "Laptops",
  ]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();

        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  //handle keyword click
  const handleKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  //handle reset filters click
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <aside className={styles.sidebar}>
      <p className={styles.apply_filters}>Apply Filters</p>
      <div className={styles.search}>
        <input
          className={styles.search_input}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </div>
      <div className={styles.category}>
        <label className={styles.label} htmlFor="category">
          Category
        </label>
        {categories.map((category) => (
          <label className={styles.radio} key={category}>
            <div className={styles.radio_box}>
              <input
                className={styles.radio_input}
                type="radio"
                name="category"
                checked={selectedCategory === category}
                value={category}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />

              <span>{category}</span>
            </div>
          </label>
        ))}
      </div>
      <div className={styles.price}>
        <label className={styles.label} htmlFor="price">
          Price
        </label>
        <input
          className={styles.price_input}
          value={minPrice}
          onChange={(e) => setMinPrice(parseFloat(e.target.value))}
          type="number"
          placeholder="Min"
        />
        <input
          className={styles.price_input}
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
          type="number"
          placeholder="Max"
        />
      </div>
      <div className={styles.keywords}>
        <label className={styles.label} htmlFor="keywords">
          Keywords
        </label>
        <div className={styles.buttons}>
          {keywords.map((keyword, i) => (
            <button
              className={styles.keywords_btn}
              onClick={() => handleKeyword(keyword)}
              key={i}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.reset_filters}>
        <button
          onClick={resetFilters}
          type="button"
          className={styles.reset_btn}
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
