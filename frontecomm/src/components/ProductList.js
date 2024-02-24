import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {

  const[products,setProducts]=useState([]);
  useEffect(()=>{
      getProduct();
  },[]);

  const getProduct=async ()=>{
    let result=await fetch("http://localhost:5000/products");
    result=await result.json();
    setProducts(result)
  }

  const deleteProduct=async (id)=>{
    let result=await fetch(`http://localhost:5000/product/${id}`,{
      method:'Delete'
    });
    result=await result.json();
    if(result)
    {
      //alert("Product Deleted");
      getProduct();
    }
  }

  const searchHandle = async (event) => {
    try {
      let key = event.target.value;
      if (key) {
        const response = await fetch(`http://localhost:5000/search/${key}`);
        if (response.ok) {
          const result = await response.json();
          if (result) {
            setProducts(result);
          }
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } else {
        getProduct();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  };
  
  

  console.warn(products);
  return (
    <div className='product-list'>
      <h1>product list</h1>
    <input type='' className='search-product-box' placeholder='Search Result' onChange={searchHandle}/>   
      <ul>
        <li>sr.No</li>
        <li>Name</li>
        <li>Price</li>  
        <li>Category</li>
        <li>Operatation</li>
      </ul>
      {
        products.length>0 ? products.map((item,index)=>
        <ul key={item._id}>
          <li>{index+1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>  
          <li>{item.category}</li>
          <li>
            <button onClick={()=>deleteProduct(item._id)}>Delete</button>
            <Link to={"/update/"+item._id}>Update</Link>
          </li>
          
        </ul>
        ):<h1>No Result Found</h1>
      }
    </div>
  )
}

export default ProductList