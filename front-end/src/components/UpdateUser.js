import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  // useParams is a hook it use for get id from params
  const params = useParams();

  const naviagte = useNavigate();

  // isko hnm tub use krte hai jub hme kisi chize ko ek bar call krna ho
  useEffect(()=>{
    getUserDetail();
  }, [])



  // in update form get data of the update user api
  const getUserDetail = async () => {
    let result = await fetch(`http://localhost:6001/user/${params.id}`,
    {
      headers:{
        // ye hmne token ko parse krne ke liye use kiya hai
        authorization: `bereer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });

    // ye method data ko json form me lata hai
    result = await result.json();

    // ab is data ko set krnge bt states aise hnm fill krwa skte hai.
    setName(result.name);
    setEmail(result.email);
    setPassword(result.password);
  }


  // user update api
  const updateUser = async () => {

    // Simple form validation
    if (!name || !email || !password) {
      setError(true);
      return false;
    }

      let result = await fetch(`http://localhost:6001/user/${params.id}`,
      {
        method: 'put',
        body: JSON.stringify({ name, email, password}),
        headers: {
            'Content-Type': 'application/json',
              // ye hmne token ko parse krne ke liye use kiya hai
              authorization: `bereer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if (result) {
        alert("Update User succefully");
        naviagte('/');
      }
  }

  return (
    <div>
    <div className='box-prod'>
      <h1>Update Profile</h1>
      <textarea
        className='inputstyle-prod'
        rows="2"
        cols="45"
        placeholder='Enter Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <span className='error-style'>Required field</span>}

    

      <textarea
        className='inputstyle-prod'
        rows="3"
        cols="45"
        placeholder='Enter Price'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && !email && <span className='error-style'>Required field</span>}


      <textarea
        className='inputstyle-prod'
        rows="3"
        cols="45"
        placeholder='Enter Company Name'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && !password && <span className='error-style'>Required field</span>}

      <br />

      <button
        className='button'
        type='submit'
        onClick={updateUser}
      > Update Product
      </button>
    </div>
  </div>
  )
}

export default UpdateUser
