import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';  //used for state management
import axios from "axios"; //this is a library that allows access to backend API  


const Addproduct = () => {// initiallize the hooks 
    const [product_name, setProduct_name] = useState("");
    const [product_description, setProduct_description] = useState("");
    const [product_cost, setProduct_cost] = useState("");
    const [product_photo, setProduct_photo] = useState("");

    // set of hooks to assist in monitoring signup process 
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    // create a function to assist in submission of data 
    const submit = async (e) => {
        // prevent default js functions 
        e.preventDefault();
        //update state to be loading
        setLoading("Please wait..")
        // create an object to hold the data user has entered in the form
        const data = new FormData();
        data.append("product_name", product_name);
        data.append("product_description", product_description);
        data.append("product_cost", product_cost);
        data.append("product_photo", product_photo);

        // try and catch exception 
        try {
            // contact the backend API to upload the data to the database
            const response = await axios.post("https://archy.alwaysdata.net/api/add_product", data)

            // after data has been posted set success message and setloading to empty string
            setLoading("")
            setSuccess(response.data.message || "Product added successfully");
            setProduct_name("");
            setProduct_description("");
            setProduct_cost("");
            setProduct_photo("");
        } catch (error) {
            setLoading("");
            setError(error.response?.data?.message || error.message || "There was an error uploading the product.");
        }
    };

    return (
        <div className="row justify-content-center mt-3">
            <div className="col-md-6 card shadow p-3">
                <h4>Add Product</h4>

                <form onSubmit={submit}>
                    {/* bind the status messages  */}
                    <p className="text-primary">{loading}</p>
                    <p className="text-success">{success}</p>
                    <p className="text-danger">{error}</p>
                    <input
                        type="text"
                        placeholder="Enter Product Name"
                        className="form-control"
                        value={product_name}
                        onChange={(e) => setProduct_name(e.target.value)}
                        required
                    />
                    <br />
                    <textarea
                        placeholder="Description of Product"
                        className="form-control"
                        value={product_description}
                        onChange={(e) => setProduct_description(e.target.value)}
                        required
                    ></textarea>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter Product Price"
                        className="form-control"
                        value={product_cost}
                        onChange={(e) => setProduct_cost(e.target.value)}
                        required
                    />
                    <br />
                    <b>Browse/upload image</b>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setProduct_photo(e.target.files[0])}
                    />
                    <br />
                    <button type="submit" className="btn btn-primary">Add Product</button>


                    <br />
                </form>
            </div>
        </div>
    );
};

export default Addproduct;