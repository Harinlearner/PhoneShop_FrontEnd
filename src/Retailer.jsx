import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Retailer.css';
import { useNavigate } from 'react-router-dom';
function Retailer() {
    const [order, setOrderList] = useState([]);
    const [retail, setRetail] = useState('Apple Store');
    const [phone, setPhoneList] = useState([]);
    const [change, setChange] = useState(0);
    const [addbutton, setaddButton] = useState(false);
    const [model, setModel] = useState('');
    const [os, setOs] = useState('');
    const [ram, setRam] = useState('');
    const [pack, setPack] = useState('');
    const [disptech, setDispTech] = useState('');
    const [color, setColor] = useState('');
    const [power, setPower] = useState('');
    const [weight, setWeight] = useState('');
    const [disp, setDisp] = useState('');
    const [memory, setMemory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [product_id,setProductid] = useState('');
    const [url, setUrl] = useState('');
    const [phoneid, setPhoneId] = useState('');
    const navigate = useNavigate();
    const [changeOrder,setChangeOrder] = useState(false);
    const userData = JSON.parse(localStorage.getItem('userData'));
    function approveOrder(id,product)
    {
        setProductid(product);
        setPhoneId(id);
        console.log(id);
        axios.put(`https://phoneshop-backend.onrender.com/api/approveOrder/${phoneid}`);
        axios.put(`https://phoneshop-backend.onrender.com/api/updatestock/${product_id}`);
        setTimeout(()=>{
            setChangeOrder(!changeOrder);
            // navigate("/retail");
        },1000);
      
    }
    function deleteProduct(id) {
        console.log(id);
        setPhoneId(id);
        axios.delete(`https://phoneshop-backend.onrender.com/api/deletePro/${phoneid}`)
            .then(() => { console.log("Success");});
            setTimeout(()=>{
                setChangeOrder(!changeOrder);
            },1000);
    }


    function formSubmitted() {
        axios.post("https://phoneshop-backend.onrender.com/api/setDetails", { Model_Name: model, OS: os, RAM: ram, Package_Dimensions: pack, Display_technology: disptech, Colour: color, Battery_Power: power, Item_Weight: weight, display_size: disp, memory_Capacity: memory, price: price, retailer: retail, no_of_stock: stock, URL: url });
        axios.get(`https://phoneshop-backend.onrender.com/api/getphone/${retail}`)
            .then((phons) => { setPhoneList(phons.data); })
            .catch((err) => { console.log(err) });
    }


    useEffect(() => {
        setRetail(userData.userNameLogin);
        axios.get(`https://phoneshop-backend.onrender.com/api/getphone/${retail}`)
            .then((phons) => { setPhoneList(phons.data); })
            .catch((err) => { console.log(err) });
    }, []);
    useEffect(() => {
        setRetail(userData.userNameLogin);
        axios.get(`https://phoneshop-backend.onrender.com/api/getphone/${retail}`)
            .then((phons) => { setPhoneList(phons.data); })
            .catch((err) => { console.log(err) });
    }, [changeOrder]);
    useEffect(() => {

        axios.get(`https://phoneshop-backend.onrender.com/api/getorder/${retail}`)
            .then((phons) => { console.log(phons.data); setOrderList(phons.data); })
            .catch((err) => { console.log(err) });
    }, []);
    useEffect(() => {
        console.log("loading");
        axios.get(`https://phoneshop-backend.onrender.com/api/getorder/${retail}`)
            .then((phons) => { console.log(phons.data); setOrderList(phons.data); })
            .catch((err) => { console.log(err) });
    }, [changeOrder]);
    return (
        <div>
            {addbutton &&
                <div className='form'>
                    <form onSubmit={(e) => { e.preventDefault(); formSubmitted() }}>
                        <h1>Phone Details</h1>
                        <label>Model_Name : </label>
                        <br></br>
                        <input onChange={(e) => setModel(e.target.value)}></input>
                        <br></br>
                        <label>OS : </label>
                        <br></br>
                        <input onChange={(e) => setOs(e.target.value)}></input>
                        <br></br>
                        <label>RAM : </label>
                        <br></br>
                        <input onChange={(e) => setRam(e.target.value)}></input>
                        <br></br>
                        <label>Package_Dimensions : </label>
                        <br></br>
                        <input onChange={(e) => setPack(e.target.value)}></input>
                        <br></br>
                        <label>Display_technology : </label>
                        <br></br>
                        <input onChange={(e) => setDispTech(e.target.value)}></input>
                        <br></br>
                        <label>Colour : </label>
                        <br></br>
                        <input onChange={(e) => setColor(e.target.value)}></input>
                        <br></br>
                        <label>Battery_Power : </label>
                        <br></br>
                        <input onChange={(e) => setPower(e.target.value)}></input>
                        <br></br>
                        <label>Item_Weight : </label>
                        <br></br>
                        <input onChange={(e) => setWeight(e.target.value)}></input>
                        <br></br>
                        <label>display_size : </label>
                        <br></br>
                        <input onChange={(e) => setDisp(e.target.value)}></input>
                        <br></br>
                        <label>memory_Capacity : </label>
                        <br></br>
                        <input onChange={(e) => setMemory(e.target.value)}></input>
                        <br></br>
                        <label>price : </label>
                        <br></br>
                        <input onChange={(e) => setPrice(e.target.value)}></input>
                        <br></br>
                        <label>URL : </label>
                        <br></br>
                        <input onChange={(e) => setUrl(e.target.value)}></input>
                        <br></br>
                        <br></br>
                        <input type='submit' value={"Create Product"}></input>
                        <br></br>
                    </form>
                </div>
            }
            <div className='retailer-home' style={{ color: 'white' }}>
                <div className='topBar'>Hello{", " + retail}</div>
                <div className='phone' style={{ height: window.innerHeight - 170 }}>
                    <div style={{fontSize:'40px'}}>Products</div>
                    <button className='Add' onClick={() => { setaddButton(!addbutton); }}></button>
                    {
                        phone.map((phones) => (
                            <div key={phones._id}>
                                <div className='detail'>
                                    <label>Phone Model : {phones.Model_Name}</label>
                                    <br></br>
                                    <label>Specs : {`(${phones.RAM}/${phones.memory_Capacity})`}</label>
                                    <br></br>
                                    <label>Price : {`₹${phones.price}`}</label>
                                    <br></br>
                                    <label>Stocks : {`${phones.no_of_stock} left`}</label>
                                    <br></br>
                                    <button className='delete' onClick={() => { deleteProduct(phones._id) }}>Double Click to Delete</button>
                                </div>
                            </div>
                        ))

                    }
                </div>
                
                <div className='order' style={{ height: window.innerHeight - 170 }}>
                <div style={{fontSize:'40px'}}>Orders</div>
                    {
                        order.map((orders) => {
                            return (
                                <div key={orders._id}>
                                    <div className='detail'>
                                        <label>Customer_Name : {orders.cUser}</label>
                                        <br></br>
                                        <label>Phone Name : {`${orders.orderName}`}</label>
                                        <br></br>
                                        <label>Price : {`₹${orders.price}`}</label>
                                        <br></br>
                                        <label>Status : </label>
                                        {orders.status == 0 && <label style={{color:'red'}}>{`${"Pending"}`}</label>}
                                        {orders.status == 1 && <label style={{color:'green'}}>{`${"Processed"}`}</label>}
                                        <br></br>
                                        { orders.status==0 && <button className='delete' onClick={() => { approveOrder(orders._id,orders.phone_id) }}>Double Click to Proceed</button>}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Retailer
