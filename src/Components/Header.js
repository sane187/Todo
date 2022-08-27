import React,{useState} from 'react';
import '../Css/header.css';
import { BiTask,BiSearch } from 'react-icons/bi';
import { FaBars,FaRegUser } from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import {Stack} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate =useNavigate()
  const {name,link}=useSelector(state=>state.profile);
  

  const [auth,setAuth]=useState(false)
  

   const handleLogout = ()=>{
          navigate('/',{replace:true});
          localStorage.clear();
  }

  return (
   <React.Fragment>
    <nav className="navbar navbar-expand-lg" style={{
background:"linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% )"
}}>
  <div className="container">
    <a className="navbar-brand d-flex align-items-center py-0" href="#">Tassker <BiTask className='ms-1'/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span><FaBars /></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto align-items-center">
      <form className="form-inline d-flex align-items-center">

      <input className="me-2 " type="search" placeholder="Find your task..." aria-label="Search" />
            <BiSearch />
        </form>
        
        {auth?
        <a className='nav-link ms-2'> <FaRegUser /></a>:
        <Stack className='header-buttons ms-5 align-items-center' direction="horizontal" gap={2}>
          <figure>
          <img src={link} style={{width:"100%",height:"100%"}} />
          </figure>
          <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButtonProfile" data-bs-toggle="dropdown" aria-expanded="false" style={{background:"#bf68e6",border:"2px solid #fff",boxShadow:"none",color:"#fff !important"}}>
   {name}
  </button>
  <ul className="dropdown-menu nav-dwn-menu py-1" aria-labelledby="dropdownMenuButtonProfile">
    <li><a className="dropdown-item" href="#">Edit Profile</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Log Out</a></li>
  </ul>
</div>
        </Stack>
        }
      </div>
    </div>
  </div>
</nav>
   </React.Fragment>
  )
}

export default Header