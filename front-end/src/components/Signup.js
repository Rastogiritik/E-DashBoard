import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const auth = localStorage.getItem('user');

  useEffect(() => {
    if(auth)
    {
      navigate('/');
    }
  });

  const collectData= async () => {
    let result =await fetch('http://localhost:6001/register', {
      method:'post',
      body: JSON.stringify({name,email,password}),
      headers:{
        'Content-Type': 'application/json'
      },
    })
    result = await result.json();
    // aise hnmm apne data ko local storage me store kr dete hai Kafi din ke liye user ke 
    // result.rsult isliye kiya hai kyuki token use krne ke bad ab data result naam ke object me aa rha hai
    localStorage.setItem("user", JSON.stringify(result.result));

    // result.auth isliye kyu ki token auth ke andr hai or hme usko bhi localstorage me store krne hai
    localStorage.setItem("token", JSON.stringify(result.auth));

    if(result){
      alert("User successfully signup")
      navigate('/');
    }
  }

  return (
    <div >
      <div className='box'>
        <h1>Register User</h1>
        <input 
          className='inputstyle' 
          type='text' 
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)} 
        /> 
        <input 
          className='inputstyle' 
          type='email' 
          placeholder='Enter Email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        /> 
        <input 
          className='inputstyle' 
          type='password' 
          placeholder='Enter Password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        /> <br/>

        <button 
          className='button'
          type='submit'
          onClick={collectData}
        > Sign Up 
        </button>
      </div>
    </div>
  )
}

export default Signup
