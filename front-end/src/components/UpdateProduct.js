import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);


  // useParams is a hook it use for get id from params
  const params = useParams();

  const naviagte = useNavigate();

  // isko hnm tub use krte hai jub hme kisi chize ko ek bar call krna ho
  useEffect(()=>{
    getProductDetail();
  }, [])

  // in update form get data of the update product api
  const getProductDetail = async () => {
    let result = await fetch(`http://localhost:6001/product/${params.id}`,
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
    setPrice(result.price);
    setCompany(result.company);
    setCategory(result.category);
  }


  // product update api
  const updateProduct = async () => {

    // Simple form validation
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }

      let result = await fetch(`http://localhost:6001/update/${params.id}`,
      {
        method: 'put',
        body: JSON.stringify({ name, price, company, category}),
        headers: {
            'Content-Type': 'application/json',
              // ye hmne token ko parse krne ke liye use kiya hai
              authorization: `bereer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if (result) {
        alert("Add product succefully");
        naviagte('/');
      }
  }


  return (
    <div>
      <div className='box-prod'>
        <h1>Update Product</h1>
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
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && <span className='error-style'>Required field</span>}


        <textarea
          className='inputstyle-prod'
          rows="3"
          cols="45"
          placeholder='Enter Company Name'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && <span className='error-style'>Required field</span>}


        <textarea
          className='inputstyle-prod'
          rows="3"
          cols="45"
          placeholder='Enter Category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && <span className='error-style'>Required field</span>}

        <br />

        <button
          className='button'
          type='submit'
          onClick={updateProduct}
        > Update Product
        </button>
      </div>
    </div>
  )
}

export default UpdateProduct
