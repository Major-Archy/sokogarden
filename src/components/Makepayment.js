import "bootstrap/dist/css/bootstrap.min.css";
import { useState} from "react"; //state management
import axios from "axios" //Used to communicate with the backend API
import { useLocation } from "react-router-dom" //used to extract product details that is, the product to be purchased.



const Makepayment = () => {

    //extract product details(product to be purchased)
    const { product } = useLocation().state || {}; 
    //useLocation hook to access the current location object and extract the product details from the state property. If the state is undefined, it defaults to an empty object to prevent errors when trying to access the product property.
    
    // hook to hold the phone number
    const[phone, setPhone] = useState(""); 

    // hook to hold the message that will be displayed to the user after the payment process.
    const[message, setMessage] = useState("");
    
    // A hook to assist submitting the phone number to the API 
    const submit = async (e) => {
        //Prevents the default form submission behavior, which would typically cause a page reload.
        e.preventDefault(); 

        // upload the status of the message
        setMessage("Processing your payment, please wait...");
         
        // extract phone number form the form 
        const data = new FormData();

        //append the phone number to the form data with the key "phone"
        data.append("phone", phone); 

        //append the product id to the form data with the key "product_id"
        data.append("amount", product.product_cost);

        const response = await axios.post("https://archy.alwaysdata.net/api/mpesa_payment", data)

        //update the message state with the response received from the API
        setMessage("please check your phone to complete the payment process...");

    }
         

    return(
        <div>
            <h1 className="p-2 text-center text-primary">LIPA NA MPESA</h1>
            <p>Product Name: {product.product_name}</p>
            <p>Product Cost: {product.product_cost}</p>

            {/* {The form where the user inputs their phone number} */}
            <form>
                <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} //update the phone state with the value entered by the user in the input field
                   
                />
                <br/>
                <br/>
                <button onClick={submit} className="btn btn-dark">Make Payment</button>
            </form>
        </div>
    );
};

export default Makepayment;
