import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useLocalStorage from 'hooks/useLocalStorage'
import styled from 'styled-components'
import ProductItem from './ProductItem'
import Icon from 'components/Icon'

export default function Products({
  products,
  lastContentIndex,
  firstContentIndex,
  setCountContent,
  countContent,
  status,
}) {
  const [active, setActive] = useState(true)
  const [favorite, setFavorite] = useLocalStorage('favorite', [])
  const [searchParams, setSearchParams] = useSearchParams()

  const onChangeCatalog = e => {
    setCountContent(Number(e.currentTarget.value))
    setActive(!active)
    setSearchParams({ catalog: Number(e.currentTarget.value) / 3 })
  }

  const handleSaveStorage = product => {
    const sameProduct = favorite.find(el => el.id === product.id)
    if (favorite.includes(sameProduct)) {
      setFavorite(favorite.filter(el => el.id !== product.id))
    } else {
      setFavorite(prev => [...prev, product])
    }
  }

  return (
    <Container>
      {products && (
        <>
          <ProductsList>
            {products
              .slice(firstContentIndex, lastContentIndex)
              .map(product => (
                <ProductItem
                  key={product.id}
                  product={product}
                  contentPerPage={countContent}
                  handleSaveStorage={handleSaveStorage}
                />
              ))}
          </ProductsList>
          <Button
            type="button"
            value={6}
            onClick={onChangeCatalog}
            style={{ right: '30px' }}
            disabled={!active}
          >
            <Icon
              width="20px"
              height="20px"
              fill={!active ? '#d88eac' : '#333'}
              iconName="icon-2rec"
            />
          </Button>
          <Button
            type="button"
            value={12}
            onClick={onChangeCatalog}
            style={{ right: '0px' }}
            disabled={active}
          >
            <Icon
              width="25px"
              height="25px"
              fill={active ? '#d88eac' : '#333'}
              iconName="icon-4rec"
            />
          </Button>
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const ProductsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
  max-width: 1080px;
`
const Button = styled.button`
  position: absolute;
  top: -67px;
  height: 28px;
  border: none;
  padding: 0;
  background: transparent;
`
