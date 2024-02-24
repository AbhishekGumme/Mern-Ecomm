import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Nav = () => {
  const auth=localStorage.getItem('user');
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/signup')
  }

  return (
    <div>
      <img className='logo' src="https://www.vectorstock.com/royalty-free-vector/lets-shopping-logo-design-template-shop-icon-vector-23363269" alt="logo" />
      {
        auth ? <ul className='nav-ul'>
        <li><Link to="/" >products</Link></li>
        <li><Link to="/add" >Add products</Link></li>
        <li><Link to="/update/:id" >Update products</Link></li>
        <li><Link to="/profile" >Profile</Link></li>
        <li><Link onClick={logout} to="/signup" >Logout ({JSON.parse(auth).name})</Link></li>
        </ul>:
        <ul className='nav-ul nav-right'>
            <>
          <li><Link to="/signup" >Sign Up</Link></li>
          <li><Link to="/login" >Login</Link></li>
          </>
        </ul>
      }
      {/* <ul className='nav-ul'>
        <li><Link to="/" >products</Link></li>
        <li><Link to="/add" >Add products</Link></li>
        <li><Link to="/update" >Update products</Link></li>
        <li><Link to="/profile" >Profile</Link></li>
        
        {
          auth ? <li><Link onClick={logout} to="/signup" >Logout</Link></li>:<>
          <li><Link to="/signup" >Sign Up</Link></li>
          <li><Link to="/login" >Login</Link></li>
          </>
        }
      </ul> */}
    </div>
  )
}

export default Nav