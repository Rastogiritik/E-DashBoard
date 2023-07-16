import React from 'react'
import { Link, useNavigate} from 'react-router-dom';


const Navbar = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  }

  
  return (
    <div>
      <Link to='/'><img alt='LOGO' className='logo' src='./logo (2).png' /></Link>

      { auth ? 
        <ul className='nav-ul'>
          <li><Link to='/' >Products</Link></li>
          <li><Link to='/add' >Add Products</Link></li>
          {/* <li><Link to='/update' >Update Products</Link></li> */}
          
            
            <li><Link to={`/profile/${JSON.parse(auth)._id}`} >{JSON.parse(auth).name}</Link></li>
          
          
          <li><Link onClick={logout} to='/signup' >Logout</Link></li>
        </ul>
        :
        <ul className='nav-ul nav-right'>
          <li><Link to='/signup' >Sign Up</Link></li>
          <li><Link to='/login' >Sign In</Link></li>
        </ul>
      } 
      
    </div>
  )
}

export default Navbar
