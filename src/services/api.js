const BASE_URL = 'https://fakestoreapi.com/products'

async function fetchData(url = '') {
  const response = await fetch(url)
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not Found'))
}

export function fetchAllProducts() {
  return fetchData(`${BASE_URL}`)
}

export function fetchAllCategories() {
  return fetchData(`${BASE_URL}/categories`)
}
export function fetchOneCategoryProducts(selectedCategory) {
  return fetchData(`${BASE_URL}/category/${selectedCategory}`)
}

const API = { fetchData }

export default API
