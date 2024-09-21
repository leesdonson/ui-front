const getProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  localStorage.setItem("products", JSON.stringify(data.products));

  return data.products;
};

export { getProducts };
