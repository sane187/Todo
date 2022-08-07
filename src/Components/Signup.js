import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiLock } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { getPosts } from '../store/features/user/postsSlice';


const Signup = () => {
  const [details,setDetails] = useState({
    "email":"",
    "password":""
  })
  const dispatch = useDispatch();
  const navigate= useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault(); 
        
        dispatch(getPosts(details))
      
       setTimeout(navigate("/home"),4000);
    }
    const handleClick =(feildname,e)=>{
       let same={...details}
       same[feildname]=e.target.value;
        
            setDetails(same)
          
    }
  return (
    <React.Fragment>
        <section className="vh-100" style={{backgroundColor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "#25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                        <div className='d-flex align-items-center mb-1'> < HiOutlineMail className='me-1'/> <label className="form-label mb-0" forname="form3Example3c">  Your Email</label></div>
                     
                      <input type="email" id="form3Example3c" className="form-control" onChange={(e)=>handleClick("email",e)} autoComplete="on"/>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    
                    <div className="form-outline flex-fill mb-0">
                      <div className='d-flex align-items-center mb-1'> < FiLock className='me-1'/><label className="form-label mb-0" forname="form3Example4c">Password</label></div>
                      <input type="password" id="form3Example4c" className="form-control" onChange={(e)=>handleClick("password",e)} autoComplete="on"/>
                    </div>
                  </div>

                  <div className="mb-3 mb-lg-4">
                    <Button variant="dark" type='submit'>Log In</Button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section></React.Fragment>
  )
}

export default Signup