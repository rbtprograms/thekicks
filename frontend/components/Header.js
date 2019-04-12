import Nav from './Nav';

const Header = () => (
  <div>
    <div className='bar'>
      <a href=''>theKicks</a>
      <Nav/>
    </div>
    <div className='subBar'>
      <p>Search</p>
    </div>
    <div>Cart</div>
  </div>
)

export default Header;