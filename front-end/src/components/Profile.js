

import React, {  useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const Profile = () => {
  const[_id, setId] = useState([]);
  const[name, setName] = useState([]);
  const[email, setEmail] = useState([]);
  const[password, setPassword] = useState([]);
  const params = useParams();

  useEffect(() => {
    getUser();
  }, []);


  const getUser = async () => {
    let result = await fetch(`http://localhost:6001/user/${params.id}`, {
    headers:{
      authorization: `bereer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
    result = await result.json();
    console.log(result);
    setId(result._id);
    setName(result.name);
    setEmail(result.email);
    setPassword(result.password);
  }


  return (
    <div>

      
        <div className='profile-box' >
        <h3 className='first-heading' >User Id: {_id}</h3>
        <h1 className='normal-heading' >Name: {name}</h1>
        <h1 className='normal-heading'>Email: {email}</h1>
        <h1 className='normal-heading'>Password: {password}</h1>
        <Link to={`/user/${_id}`}><button className='update-button'>Update Profile</button></Link>
        </div>


        
        
        
      
    </div>
  )
}

export default Profile
