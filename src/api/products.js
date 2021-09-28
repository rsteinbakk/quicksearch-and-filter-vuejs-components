// Her man henter produkter
// Fetche filtrene som skal filtreres

function getFilters() {
  return fetch("https://www.seljordvarme.no/nettbetaling/products/filters?category=625")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getProducts(query) {
    return fetch("https://www.seljordvarme.no/nettbetaling/products/list?category=625" + query)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}



export default { getFilters, getProducts };
