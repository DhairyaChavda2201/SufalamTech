import React, { useState } from "react";
import "./Table.css";
import { useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [products, setProducts] = useState([]);
  const [sliceVal,setSliceVal] = useState(1000000);
  const [searchVal,setSearchVal] = useState("")
  const [dummy,setDummy] = useState(0)



  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  



  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "https://bizonapi.sufalam.live/api/products?filter[include]=productbrand&filter[include]=productmedia&filter[include]=category&filter[where][productstatus]=1&filter[skip]=0&filter[limit]=5",
          {
            headers: {
              masterdetailId: " 6b623f64-ed4c-46fb-88f0-ce700aa6fcb1",
              openStoreId: "9fc7e05f-eb24-4846-b728-08d1d340e37b",
            },
          }
        );
        setProducts(res.data);
      } catch (err) {
      }
    };
    getProducts();
  }, []);

  const handleChange = (e) =>{
    setSliceVal(e.target.value)
  }

  const handleSearchVal = (e) =>{
    setSearchVal(e.target.value)
  }



  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = products.slice(indexOfFirstPost,indexOfLastPost)


  const pageNumbers = [];

  for( let i = 1 ;i <= Math.ceil(products.length/postsPerPage);i++){
    pageNumbers.push(i);
  }


  const paginate = (pageNumber) =>{
    setCurrentPage(pageNumber)
  }

  const handleHighClick = () =>{
    products.sort((a,b)=>b.price - a.price)
    // currentPosts = newProducts;
    setDummy(dummy + 1)
  }

  const handleLowClick = () =>{
    products.sort((a,b)=>a.price - b.price)
    // currentPosts = newProducts;
    setDummy(dummy + 1)
  }

  return (
    <>
      <div className="mx-5">
        <div>
          <p className="my-5 fs-1 fw-bold">Products Table</p>
        </div>

        <div className="d-flex justify-content-between">
          <p className="d-flex">
            <span className="mx-2 mt-1">Show</span>
            <span className="mx-2">
            {
              <select className="form-select" onChange={handleChange} aria-label="Default select example">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            }
            </span>
            <span className="mx-2 mt-1">
            entries
            </span>
          </p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-sm border" onClick={handleHighClick}>Price:High to low</button>
            <p className="m-3 fw-bold">Sort</p>
            <button className="btn btn-sm border" onClick={handleLowClick}>Price:Low to High</button>
          </div>
          <div>
          <form className="d-flex">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearchVal}
            />

            {/* <button className="btn btn-outline-success" type="submit">
              Search
            </button> */}
          </form>
          </div>
        </div>
        <div className="table-responsive text-start">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Product No</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.slice(0,sliceVal).filter((item)=>{
                if(searchVal.trim() === ""){
                  return item;
                }
                else if (item.name.replace(/ /g, "").toLowerCase().includes(searchVal.replace(/ /g, "").toLowerCase())) {
                  return item
              }
              else if (item.price.toString().startsWith(searchVal)) {
                return item
            }
              else {
                  return null
              }
              }).map((item,index) => {
                return (
                    <tr className=" border-top border-bottom border-dark" key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.productno}</td>
                        <td>{item.price}</td>
                        <td>{item.availablequantity}</td>
                        <td>{item.productstatus}</td>
                    </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center my-4">
          <ul className="pagination">
          {pageNumbers.map(number => (

            <li key={number} className="page-item">
              <a className="page-link" href="!#" onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          ))}
          </ul>
        </div>
      </div>

    </>
  );
};

export default Table;
