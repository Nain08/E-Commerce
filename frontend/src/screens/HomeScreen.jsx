// import React,{useEffect,useState} from 'react'
import {Row,Col} from 'react-bootstrap';
// import axios from 'axios'
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import { Link } from 'react-router-dom';
import ProductCaraousel from '../components/ProductCaraousel';

const HomeScreen = () => {
    // const [products,setProducts]=useState([]);
    // useEffect(()=>{
    //     const fetchProducts=async()=>{
    //         const {data}=await axios.get('/api/products')
    //         setProducts(data);
    //     }
    //     fetchProducts()
    // },[])
    const {pageNumber,keyword}=useParams()
    const{data,isLoading,error}=useGetProductsQuery({keyword,pageNumber});

  return (

    <>
    {!keyword?<ProductCaraousel />:(<Link to='/' className='btn btn-light mb-4' > Go Back</Link>)}
    {isLoading?(
        <Loader />
    ):error?(
        <Message variant='danger'>{error?.data?.message||error.error}</Message>
    ):(
<>

<h1>Latest Products</h1>
        <Row>
            {data.products.map((product)=>(
                <Col key={product._id} sm={12} md={6} lg={4} cl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
        <Paginate pages={data.pages} page={data.page}  keyword={keyword?keyword:''}/>
</>
    )}
        
    </>
  )
}

export default HomeScreen
