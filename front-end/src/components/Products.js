import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Products = () => {

  const [products, setProducts] = useState([]);

  // call products
  useEffect(() => {
    getProducts();
  }, [])





  // get data api intigration
  const getProducts = async () => {
    let result = await fetch('http://localhost:6001/products', {
      // or hnm isko headers me se hi le skte hai
    headers:{
      // ye hmne token ko parse krne ke liye use kiya hai
      authorization: `bereer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
    result = await result.json();
    setProducts(result);
  }

  

  // delete data api integration
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:6001/delete/${id}`, {
        headers:{
          // ye hmne token ko parse krne ke liye use kiya hai
          authorization: `bereer ${JSON.parse(localStorage.getItem('token'))}`
        },
      method: "delete",
    });
    result = await result.json();
    if (result) {
      alert("Product is deleted");
      getProducts();
    }
  }


  // search data api integration
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:6001/search/${key}`,
      {
        headers:{
          // ye hmne token ko parse krne ke liye use kiya hai
          authorization: `bereer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  }

  return (
    <div className='prod-list-box'>
      <h1>Products List </h1>
      <input className='search-box' type='text' placeholder='Search Product'
        onChange={searchHandle}
      />
      <ul>
        <li>S. no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Company</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {
        products.length > 0 ? products.map((item, index) =>
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.company}</li>
            <li>{item.category}</li>
            <li>
              <button className='del-button' onClick={() => deleteProduct(item._id)}>delete</button>
              <Link className='link' to={"/update/" + item._id}>Update</Link>
            </li>
          </ul>
        )
          :
          <h1>No Product Found</h1>
      }
    </div>
  )
}

export default Products
