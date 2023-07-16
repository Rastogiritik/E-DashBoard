import React, { useState } from 'react'

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);


  const addProduct = async () => {

    // simple form validation
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }

    const auth = localStorage.getItem('user');
    const userId = JSON.parse(auth)._id;
    let result = await fetch('http://localhost:6001/addproduct', {
      method: 'post',
      body: JSON.stringify({ name, price, company, category, userId }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `bereer ${JSON.parse(localStorage.getItem('token'))}`
        
      },
    })
    result = await result.json();
    if (result) {
      alert("Add product succefully");
      window.location.reload(true);
    }
  }


  return (
    <div>

      <div className='box-prod'>
        <h1>Add Product</h1>
        <textarea
          className='inputstyle-prod'
          rows="2"
          cols="45"
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* true check krne keliye && ye wale operator use krte hai */}
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
          onClick={addProduct}
        > Add Product
        </button>
      </div>

    </div>
  )
}

export default AddProduct
