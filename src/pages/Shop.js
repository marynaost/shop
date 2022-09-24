import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import * as API from 'services/api'
import usePagination from 'hooks/UsePagination'
import useLocalStorage from 'hooks/useLocalStorage'
import Loader from 'components/Loader'
import CategoryList from 'components/CategoryList/CategoryList'
import Products from 'components/Products/Products'

export default function Shop() {
  const [status, setStatus] = useState('pending')
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([])
  const [products, setProducts] = useState([])
  const [countContent, setCountContent] = useState(12)
  const [allProducts, setAllProducts] = useLocalStorage('allProducts', [])

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: countContent,
    count:
      selectedCategoryProducts.length > 0
        ? selectedCategoryProducts.length
        : products.length,
  })

  const onCategoryChange = value => {
    setSearchParams({ category: value })
  }

  useEffect(() => {
    API.fetchAllCategories()
      .then(res => setCategories(res))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    API.fetchAllProducts()
      .then(res => {
        setProducts(res)
        setStatus('resolved')
        setAllProducts(res)
        onCategoryChange('show-all')
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (!selectedCategory) {
      return
    }
    API.fetchOneCategoryProducts(selectedCategory)
      .then(res => {
        setSelectedCategoryProducts(res)
        setAllProducts(res)
        setPage(1)
      })
      .catch(error => console.log(error))
  }, [selectedCategory])

  const handleChangeCategory = category => {
    setSelectedCategory(category)
    onCategoryChange(category)
  }

  const handleShowAll = () => {
    setSelectedCategory('')
    setSelectedCategoryProducts([])
    setAllProducts(products)
  }

  const handleScroll = () => {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }, 500)
  }

  return (
    <>
      <Container>
        <Logo>Shop</Logo>
        {status === 'pending' ? (
          <>
            <Loader />
            <div style={{ height: '600px' }}></div>
          </>
        ) : (
          <Wrap>
            <CategoryList
              categories={categories}
              onClick={handleChangeCategory}
              onShowAll={handleShowAll}
            />
            <Products
              products={allProducts}
              firstContentIndex={firstContentIndex}
              lastContentIndex={lastContentIndex}
              setCountContent={setCountContent}
              countContent={countContent}
            />
          </Wrap>
        )}
        {allProducts.length && (
          <Pagination>
            <PaginationText>
              {page}/{totalPages}
            </PaginationText>
            <div>
              <PaginationButton onClick={prevPage}>&larr;</PaginationButton>
              {[...Array(totalPages).keys()].map(el => (
                <PaginationButton
                  onClick={() => {
                    handleScroll()
                    setPage(el + 1)
                  }}
                  key={el}
                  className={` ${page === el + 1 ? 'active' : ''}`}
                >
                  {el + 1}
                </PaginationButton>
              ))}
              <PaginationButton onClick={nextPage}>&rarr;</PaginationButton>
            </div>
          </Pagination>
        )}
      </Container>
      <Footer>
        <Container style={{ paddingTop: '0' }}>
          <Logo style={{ color: '#fff' }}>Shop</Logo>
        </Container>
      </Footer>
    </>
  )
}

const Container = styled.main`
  margin: 0 auto;
  max-width: 1440px;
  padding: 60px 15px 20px;
  @media screen and (min-width: 768px) {
    padding: 60px 30px 20px;
  }
  @media screen and (min-width: 1440px) {
    padding: 60px 63px 20px;
  }
`

const Wrap = styled.section`
  margin-top: 112px;
  display: flex;
  justify-content: center;
`

const Pagination = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  .active {
    background-color: #d88eac;
    border: 1px solid #d88eac;
  }
`
const PaginationText = styled.p`
  margin-bottom: 5px;
`

const PaginationButton = styled.button`
  font-size: 20px;
  padding: 5px 10px;
  border: 1px solid #333;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }

  @media screen and (min-width: 768px) {
    padding: 5px 13px;
  }
`

const Footer = styled.footer`
  height: 140px;
  background-color: #000;
  padding-top: 39px;
`
const Logo = styled.h2`
  font-family: 'Romanesco', cursive;
  font-size: 54px;
  line-height: 1.14;
  color: #333333;
`
