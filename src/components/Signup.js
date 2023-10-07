import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { alertError, alertSuccess } from './Alert';

const Signup = () => {
    const [cred, setCred] = useState({ name: "", email: "", password: "", cPass: "" });
    let history = useHistory()
    const { name, email, password, cPass } = cred;
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password === cPass) {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, cPass })
            });
            const json = await response.json();
            console.log(json);

            localStorage.setItem("token", json.authToken);
            history.push('/');
            alertSuccess("User created Successfully");
        }
        else {
            console.log("Please confirm your password");
            alertError("Failed to create new user");
        }
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer />
            <div className='container'>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={password} onChange={onChange} autoComplete="on" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cPass" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cPass" name='cPass' value={cPass} onChange={onChange} autoComplete="on" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup