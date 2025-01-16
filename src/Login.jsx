import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Login.css'
function login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate1 = useNavigate();

    const submitted = (e) => {
        e.preventDefault();
        axios.post('http://localhost:7000/api/login', { username, password }) // use same name in the back and front end or else the data will be undefined
            .then((res) => {
                
                if(res.data.length==0)
                {
                    window.alert("Enter the Correct username/password");
                }
                else
                {
                let userNameLogin = username;
                let userData = {
                    userNameLogin,
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                if(res.data[0].type=='User')
                navigate1("/main");
                else
                navigate1("/");
                }
            })
            // .catch((err) => { window.alert("Enter the Correct username/password") });
    }
    return (
        <div style={{ paddingTop: "0.2%", paddingBottom: "12.5%", backgroundImage: "url(" + "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" + ")", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div>
                <center>
                    <div className='loginContainer'>
                        <form onSubmit={submitted}>
                            <h1>Login</h1>
                            <br></br>
                            <b><label className='label'>Username : </label></b>
                            <input className='input' type='text' onChange={(e) => setUserName(e.target.value)}></input>
                            <br></br>
                            <br></br>
                            <b><label className='label'>Password : </label></b>
                            <input className='input' type='password' onChange={(e) => setPassword(e.target.value)}></input>
                            <br></br>
                            <br></br>
                            <input className='login' type="submit" value='login'></input>
                            <br></br>
                            <br></br>
                            <label>{`Don't have account`}</label>
                            <a onClick={() => { navigate1("/register"); }}> Register</a>
                        </form>
                    </div>
                </center>
            </div>
        </div>
    )
}

export default login;
