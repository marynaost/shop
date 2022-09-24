import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

export default function CategoryList({ categories, onClick, onShowAll }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleClick = el => {
    onClick(el)
  }
  return (
    <Container>
      {categories && (
        <>
          <ul>
            <CategoryItem
              onClick={() => {
                onShowAll()
                setSearchParams({ category: 'show-all' })
              }}
            >
              Show all
            </CategoryItem>
            {categories.map(el => (
              <CategoryItem
                key={el}
                onClick={() => {
                  handleClick(el)
                }}
              >
                {el}
              </CategoryItem>
            ))}
          </ul>
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 320px) {
    margin-right: 10px;
  }
  @media screen and (min-width: 768px) {
    margin-right: 50px;
  }
  @media screen and (min-width: 1440px) {
    margin-right: auto;
  }
`
const CategoryItem = styled.li`
  text-transform: uppercase;
  cursor: pointer;

  &:active,
  &:hover {
    font-weight: 600;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`
