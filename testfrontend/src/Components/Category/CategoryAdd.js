import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";

function CategoryAdd() {
    const [loading,setLoading] = useState(false)
    const [data, setData] = useState({
        name : "",
        loading : false,
        errormessage : "",
        redirect : false,
        error : false
    })

    const {name, errormessage, redirect, error} = data;

    const handleChange = (name) => (e) => {
        setData({
            ...data,
            [name] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setData({ loading : true});
        if(!name ){
            setData({error : true, errormessage : "Please enter the name"})
        }
        else{
            await axios({
                url : `${process.env.REACT_APP_API_URL}/api/category/createcategory`,
                method : "POST"
            })
            .then((res) => {
                setData({ loading:false, error:false});
                return <Redirect to = "/admin/category" />
            })
            .catch((error) => {
                console.log(error.response);
                setData({
                    loading:false,
                    error:true,
                    errormessage:error.response.data.error
                });
            });
        }
    }

   
    return(
        <div>
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
                            <h1>Add Category</h1>
                        </div>
                        {error ? (
                            <div class="alert alert-danger" role="alert">
                            {errormessage}
                            </div>
                        ) : (
                            ""
                        )}

                        <div class="center">
                        <form className="row g-3" onSubmit={handleSubmit}> 
                        <div className="col-md-12">
                            <label for="exampleInputEmail1" className="formlable">Category Name</label>
                            <input
                                type="text"
                                className="form-control" 
                                id="exampleInputname" 
                                value={name}  
                                onChange={handleChange("name")} 
                                placeholder="Enter Category Name"
                                />
                        </div>
                       

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary"> Create Category </button>   
                        </div>
                        
                        </form>
                        </div>
                        
                </React.Fragment>
            )
        }
        </div>
    )
}

export default CategoryAdd;
