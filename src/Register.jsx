import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Login.css'
function register() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userType,setUserType] = useState('User');
    const [address,setAddress] = useState('');
    const [phone,setPhone] = useState('');
    const navigate = useNavigate();
    const submitted = (e) => {
        e.preventDefault();
        axios.post('http://localhost:7000/api/login', { username, password }) // use same name in the back and front end or else the data will be undefined
            .then((res) => {
                
                if(res.data.length!=0)
                {
                    window.alert("User already exists");
                }
                else
                {
                
        axios.post('http://localhost:7000/api/register', { username, password,userType,phone,address }) // use same name in the back and front end or else the data will be undefined
            .then((res) => {
                let userNameLogin = username;
                let userData = {
                    userNameLogin,
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                if(userType=='User')
                    navigate("/main");
                    else
                    navigate("/");
            })
        }})
    }
    return (
        <div style={{ paddingTop: "0.2%", paddingBottom: "11%", backgroundImage: "url(" + "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" + ")", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div>
                <center>
                    <div className='loginContainer'>
                        
                        <form onSubmit={submitted}>
                            <h1>Register</h1>
                            <br></br>
                            <b><label className='label'>Username : </label></b>
                            <input className='input' style={{fontSize:'15px'}} type='text' onChange={(e) => setUserName(e.target.value)}></input>
                            <br></br>
                            <br></br>
                            <b><label className='label'>Password : </label></b>
                            <input className='input' style={{marginRight:'-5px',fontSize:'15px'}} type='password' onChange={(e) => setPassword(e.target.value)}></input>
                            <br></br>
                            <br></br>
                            <b><label className='label'>Phone : </label></b><input className='input' style={{marginRight:'-30px',fontSize:'15px'}} type='text' onChange={(e) => setPhone(e.target.value)}></input>
                            <br></br>
                            <br></br>
                            <b><label className='label'>Address : </label></b><input className='input' style={{marginRight:'-14px',fontSize:'15px'}} type='text' onChange={(e) => setAddress(e.target.value)}></input>
                            <br></br>
                            <br></br>
                            <select onChange={(e)=>setUserType(e.target.value)}>
                                <option>User</option>
                                <option>Retailer</option>
                            </select>
                            <input className='login' type="submit" value='Register' style={{ width: "120px" }}></input>
                            <br></br>
                            <br></br>
                            <label>{`Already have account`}</label>
                            <a href="/login" type="button"> Login</a>
                        </form>
                    </div>
                </center>
            </div>
        </div>
    )
}

export default register;
