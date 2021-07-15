import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";

function ProductAdd() {
    const [loading,setLoading] = useState(false)
    const [data, setData] = useState({
        name : "",
        description : "",
        price : "",
        stock : "",
        photo : "",
        loading : false,
        errormessage : "",
        redirect : false,
        error : false
    })

    const [category, setCategory] = useState([])

    useEffect(() => {
        axios({
            url:`${process.env.REACT_APP_API_URL}/api/category/getallcategory`,
            method:"GET"
        })
        .then((res) => {
            setCategory(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])
        
    

    const [imageData, setImageData] = useState()

    const {name, description, price,  stock, photo, errormessage, redirect, error} = data;

    const handleChange = (name) => (e) => {
        setData({
            ...data,
            [name] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setData({ loading : true});
        if(!name || !description || !price || !category || !stock || !photo){
            setData({error : true, errormessage : "Please include all data"})
        }
        else{
            await axios({
                url : `${process.env.REACT_APP_API_URL}/api/product/createproduct`,
                method : "POST"
            })
            .then((res) => {
                setData({ loading:false, error:false});
                return <Redirect to = "/admin/product" />
            })
            .catch((error) => {
                setData({
                    loading:false,
                    error:true,
                    errormessage:error.response.data.error
                });
            });
        }
    }

    const handleImageChange = (e) => {
        setImageData(e.target.files[0]);
    }

    const handleImageSubmit = (e) => {
        debugger
        e.preventDefault();

        let imageFormData = new FormData()
        imageFormData.append('productImg', imageData)

        if(imageData.size > 1024*1024*5) {
            setData({ error : true, errormessage : "file should be less than 5MB"});
        }
        else if(ImageData.type === "image/jpeg" || ImageData.type === "image/jpg" || ImageData.type === "image/png" || ImageData.type === "image/svg" || ImageData.type === "image/svg+xml" ){
            axios({
                url:`${process.env.REACT_APP_API_URL}/api/product/image`,
                method:"POST",
                data: imageFormData
            })
            .then((response) => {
                console.log(response);
                setData({photo:response.data.data.url})
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else{
            setData({error:true, errormessage:"only jpg, jpeg, png, svg files allowed"})
        }
    }

    return(
        <div className="container-fluid p-5 w-75 mt-5" >
            {loading ? (
                <Loader 
                type="BallTriangle"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
                />
            ) : (
                <React.Fragment>

                        <div className="text-center mb-5">
                            <h1>Add Product</h1>
                        </div>
                        {error ? (
                            <div class="alert alert-danger" role="alert">
                            {errormessage}
                            </div>
                        ) : (
                            ""
                        )}

                        
                        <form className="row g-3" onSubmit={handleSubmit}> 
                        <div className="col-md-12">
                            <label for="exampleInputEmail1" className="formlable">Product Name</label>
                            <input
                                type="text"
                                className="form-control" 
                                id="exampleInputname" 
                                value={name}  
                                onChange={handleChange("name")} 
                                placeholder="Enter Product Name"
                                />
                        </div>
                        <div className="col-12">
                            <label for="exampleInputPassword1" className="formlable">Description</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="exampleInputdescription" 
                                value={description}
                                onChange={handleChange("description")}
                                placeholder="Description"
                                />
                        </div>
                        <div className="dropdown">
                            <label for="inputtext" classname="formtable">
                                Select Category
                            </label>
                            <select name="category" id="category">
                                <option value=""></option>
                                {category.map((data) => {
                                    console.log(data);
                                    return (
                                        <option value={data.name}>{data.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-12">
                            <label for="exampleInputPassword1" className="formlable">Price</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                id="exampleInput123" 
                                value={price}
                                onChange={handleChange("price")}
                                placeholder="Price"
                                />
                        </div>
                        <div className="col-12">
                            <label for="exampleInputPassword1" className="formlable">Stock</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                id="exampleInput123" 
                                value={stock}
                                onChange={handleChange("stock")}
                                placeholder="Stock"
                                />
                        </div>
                        <div className="col-6">
                            <label for="inputImage" className="formlable">Photo</label>
                            <input 
                                type="file"
                                className="form-control"
                                id="inputImage"
                                onChange={handleImageChange}
                                />
                        </div>
                        <div className="col-6 mb-0 mt-5 mb-4">
                            <button onClick={handleImageSubmit} className="btn btn-primary"> Upload </button>   
                        </div>
                        <div className="col-12">
                            <button type="submit" onSubmit={handleSubmit} className="btn btn-primary"> CreateProduct </button>   
                        </div>
                        
                        </form>
                        
                        
                </React.Fragment>
            )
        }
        </div>
    )
}

export default ProductAdd;
