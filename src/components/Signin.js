import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; //this is a library that allows access to backend API  
import { useState } from "react";  //used for state management 

const Signin = () => {
    //create hooks
    // const [success, setSuccess] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigate();

    // set of hooks to assist in monitoring signup process 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");


    // function to assist us in form submission 
    const submit = async (e) => {
        // prevent entry or default form submission 
        e.preventDefault();
        //update state to be loading
        setLoading("Please wait as we upload your data")

        //try and catch exception
        try {
            //put the data hooks in a variable called to data
            const data = new FormData();
            data.append("email", email);
            data.append("password", password)


            // The backend API is contacted to initiate connection and allowdata uploadto the database. Backend API gives a response
            //Axios is a module that assists in all this process

            const response = await axios.post("http://archy.alwaysdata.net/api/signin", data)

            //after data has been posted set success message and setloading to empty string
            setLoading("")
            //setSuccess("Account created successfully") 
            // setSuccess(response.data.message);
            if (response.data.user) {
                navigation("/");
            }else {
                setError("Login failed");
            }

            //set input field to be empty
            setEmail("")
            setPassword("")

            // catch errors 

        } catch (error) {
            setLoading("");
            setError("There was an error with the server")

        }
    };

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 shadow card p-4">

                {/* the title of the form */}
                <h3 className="text-primary">Sign in</h3>


                {/* form */}
                <form onSubmit={submit}>
                    {/* {Bind the various status messages i.e success, loading, error} */}
                    <h5 className="text-primary">{loading}</h5>
                    {/* <h5 className="text-success">{success}</h5> */}
                    <h5 className="text-danger">{error}</h5>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                    />
                    <br />
                    <button type="submit" className="btn btn-primary" >signin</button>

                </form>

                Dont have an account? <Link to="/signup">signup</Link>

            </div>

        </div>
    );
};

export default Signin;