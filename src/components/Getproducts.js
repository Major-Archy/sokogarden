import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom" //styling UI
import axios from "axios" //navigation
import { useState, useEffect } from "react"; //state management 

const Getproducts = () => {

    //initialize hooks
    const [products, setProducts] = useState([]); //initial state of products is an empty array
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    // hook for navigation 
    const navigate = useNavigate(); //used to specify next page to display when an event is triggered

    //specify the notation of our images
    const img_url = "https://archy.alwaysdata.net/static/images/"

    //function to assist in fetching the products
    const getproducts = async () => {
        //update the status to loading the products
        setLoading("Please wait, we are retrieving the products..");
        //handle the exceptions
        try {
            const response = await axios.get("https://archy.alwaysdata.net/api/get_product")

            setProducts(response.data); //update the products state with the data received from the API

            //update loading to..
        } catch (error) {
            setLoading("");
            setError(error.response?.data?.message || error.message || "There was an error fetching the products....");
        }
    }

    // useEffect hook to assist in fetching the products when the component is mounted
    //ensures that the function (getproducts) is only run after the UI component which is get products has finished loading
    // call the Getproduct function 
    useEffect(() => {
        getproducts();
    }, []); //empty arrays ensure this function only runs once when the component mounts or finish

    return (
        <div className="row">
            <h3 className="p-2 text-center text-primary mt-3">Available Products</h3>

            {/* binding the status messages to the UI */}
            <h5 className="text-center text-primary">{loading}</h5>
            <h5 className="text-center text-danger">{error}</h5>

            {/* map the column in this row ensure it recreates severally to hold the products */}
            {products.map((product) => (
                <div className="col-md-3 justify-content-center mb-4" key={product.id}>
                    {/* Card for each product with equal size */}
                    <div className="card shadow card-margin h-100 w-100">
                        {/* the image of the product */}
                        <img

                            src={img_url + product.product_photo}
                            alt={products.product_name}
                            className="Product_img mt-4" />

                        {/* card body */}
                        <div className="card-body">
                            <h5 className="mt-2">{product.product_name}</h5>
                            <p className="text-muted">{product.product_description}</p>
                            <p className="text-warning">Ksh. {product.product_cost}</p>
                            <button className="btn btn-dark mt-2 w-100" onClick={() => navigate("/makepayment", { state: { product } })}>Buy Now</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Getproducts;
