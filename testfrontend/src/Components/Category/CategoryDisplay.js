import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import Loader from "react-loader-spinner";

function CategoryDisplay () {
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState([])

    useEffect(() => {
        setLoading(true);
        axios({
            url : `${process.env.REACT_APP_API_URL}/api/category/getallcategory`,
            method : "GET"
        })
        .then(async(res) => {
            await setCategory(res.data.data);
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
        });
    },[])

    return (
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
                    <AdminHeader/>
                        <Link to="/admin/category/add" className="btn btn-primary" style={{float:"right", marginRight:"2rem"}}>
                            Add Category
                        </Link>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.map((data,idx) => {

                                    return(
                                        <tr>
                                            <th scope="row">{idx+1}</th>
                                            <td>{data.name}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                </React.Fragment>
            )
        }
        </div>
    )
}

export default CategoryDisplay;