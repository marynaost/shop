import { useState } from 'react'
import styled from 'styled-components'
import EllipsisText from 'react-ellipsis-text'
import Icon from 'components/Icon'

export default function ProductItem({
  product,
  contentPerPage,
  handleSaveStorage,
  status,
}) {
  const [active, setActive] = useState(false)
  const newProduct = { ...product, active: !active }

  const getNewWidth = () => {
    if (contentPerPage === 6) {
      return 'calc((100% - 40px) / 2)'
    }
    return 'calc((100% - 80px) / 4)'
  }

  const onButtonClick = e => {
    setActive(!active)
    handleSaveStorage(newProduct)
  }

  return (
    <Product width={getNewWidth()}>
      <Img src={newProduct.image} alt={newProduct.title} />
      <Info>
        <Title title={newProduct.title}>
          <EllipsisText
            text={newProduct.title}
            length={contentPerPage === 6 ? 40 : 25}
          />
        </Title>
        <Price>
          {newProduct.price}${' '}
          <Icon
            className="icon"
            stroke={active ? '#d88eac' : '#333'}
            iconName="icon-heart"
            onClick={onButtonClick}
          />
        </Price>
      </Info>
    </Product>
  )
}

const Product = styled.li`
  margin: 10px;
  width: ${props => props.width};
  cursor: pointer;
`

const Img = styled.img`
  width: 100%;
  object-fit: contain;
  margin-bottom: 12px;
  height: 50px;

  @media screen and (min-width: 375px) {
    height: 67px;
  }
  @media screen and (min-width: 425px) {
    height: 90px;
  }
  @media screen and (min-width: 480px) {
    height: 125px;
  }
  @media screen and (min-width: 768px) {
    height: 190px;
  }
  @media screen and (min-width: 1000px) {
    height: 215px;
  }
  @media screen and (min-width: 1440px) {
    height: 355px;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Title = styled.p`
  margin-bottom: 5px;
`
const Price = styled.p`
  display: flex;
  justify-content: space-between;
  .icon {
    height: 10px;
    width: 10px;
    @media screen and (min-width: 768px) {
      height: 20px;
      width: 20px;
    }
  }
`
