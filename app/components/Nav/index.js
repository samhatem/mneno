import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.nav`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  background: #387EF5;

  a {
    padding: 0 15px;
    color: #FFF;
  }
`

const isAuthor = process.env.AUTHOR
console.log(process.env)

const Nav = () => (
  <Wrapper>
    <Link href='/'><a>Home</a></Link> |
    <Link href='/about'><a>About</a></Link> |
    <Link href='/contact'><a>Contact</a></Link> |
    {
      isAuthor ? <Link href='/create'><a>Create</a></Link> : null
    }
  </Wrapper>
)

export default Nav
