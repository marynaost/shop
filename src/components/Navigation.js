import { NavLink, Outlet } from 'react-router-dom'
import styled from 'styled-components'

export default function Navigation() {
  return (
    <>
      <Nav>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : 'item')}
          to="/"
        >
          SuperHeroes
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : 'item')}
          to="new-hero"
        >
          Add new hero
        </NavLink>
      </Nav>
      <Outlet />
    </>
  )
}

const Nav = styled.nav`
  position: fixed;
  height: 60px;
  position: relative;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  padding: 14px 40px;
  background-color: #000;
  color: #fff;

  .item {
    color: #fff;
    padding: 6px 12px;
    font-weight: 700;
    &:not(:last-child) {
      margin-right: 30px;
    }
  }

  .active {
    padding: 6px 12px;
    font-weight: 700;
    &:not(:last-child) {
      margin-right: 30px;
    }
    color: #fff;
    background-color: #a6192e;
  }
`

// function CaesarCipher(str, num) {
//   let arr = []
//   let alf = /[a-z]/i

//   for (let i = 0; i < str.length; i += 1) {
//     if (str[i].match(alf)) {
//       arr.push(str.charCodeAt(i) + num)
//     } else {
//       arr.push(str.charCodeAt(i))
//     }
//   }

//   for (let i = 0; i < arr.length; i += 1) {
//     arr[i] = String.fromCharCode(arr[i])
//   }
//   return arr.join('')
// }
// // keep this function call here
// console.log(CaesarCipher(readline()))
