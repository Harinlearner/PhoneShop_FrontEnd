import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./Home.css";
function Home() {
  const [my_orders,setOrders] = useState(false);
  const [ordered, setOrderPlaced] = useState([]);
  const [buy, setBuy] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [dataArray, setdataArray] = useState([]);
  const [select1, setSelect1] = useState('Select the Phone1');
  const [select2, setSelect2] = useState('Select the Phone2');
  const [selectDetail1, setSelectDetail1] = useState({});
  const [selectDetail2, setSelectDetail2] = useState({});
  const [Current, setCurrent] = useState('');
  const [showCompWindow, setShowCompWindow] = useState(false);
  const [searchString, setSearchString] = useState(' ');
  const [showCompare, setShowCompare] = useState(1);
  const [priceClicked, setPriceClicked] = useState(true);
  const [userName, setUserName] = useState('');
  const [model_id, setModelId] = useState('');

  const userData = JSON.parse(localStorage.getItem('userData'));
  function showComp() {
    setShowCompare((showCompare == 1) ? 0 : 1);
  }
  function phoneSelected(name, detail) {
    if (name == select1 || name == select2) {
      if (showCompare != 1)
        window.alert('Already selected');
    }
    else {
      if (select1 == 'Select the Phone1') {
        setSelect1(name);
        setSelectDetail1(detail);
      }
      else if (select2 == 'Select the Phone2') {
        setSelect2(name);
        setSelectDetail2(detail);

      }
      else {
        // setSelect1('Select the Phone1');
        setSelect2(name);
        setSelectDetail2(detail);

        // setSelect2('Select the Phone2');
      }
      //  if(Current==select1)
    }

  }
  function orderConfirmed() {
    // console.log(totalPrice);
    axios.post('https://phoneshop-backend.onrender.com/api/orderplacing', { user: userName, orderlist: orderList });
    window.alert("Order Confirmed");
    setOrderList([]);
    setTotalPrice(0);
  }
  function addOrder(Phonename, id, Phoneprice, retailer) {
    setTotalPrice(totalPrice + Phoneprice);
    setOrderList([...orderList, { name: Phonename, _id: id, price: Phoneprice, retail: retailer }]);
  }
  useEffect(() => {
    setUserName(userData.userNameLogin);
    axios.get("https://phoneshop-backend.onrender.com/api/productdata")
      .then((res) => { console.log(res.data); setdataArray(res.data) })
      .catch((err) => { console.log(err) });
  }, []);
  useEffect(() => {
    // console.log(userData.userNameLogin);
    axios.get(`https://phoneshop-backend.onrender.com/api/getorder/cust/${userData.userNameLogin}`)
      .then((phons) => { setOrderPlaced(phons.data); })
      .catch((err) => { console.log(err) });
  }, []);
  return (
    <div className='cover'>
      <div className='username'>Hi, {userName}</div>
      <div style={{ backgroundColor: 'black', width: 'auto', height: '40px' }}>
        <nav className='navi'>
          <li><button onClick={() => {setOrders(!my_orders);}}>{(my_orders)?"Close":"Orders"}</button></li>
          <li><button onClick={() => { setOrderList([]); setTotalPrice(0); setBuy(!buy);}}>{(buy)?"Close":"Buy"}</button></li>
          <li><button onClick={() => showComp()}>{(showCompare==0)?"Close":"Compare"}</button></li>
          <li><button className='homeButton'>Home</button></li>
        </nav>
      </div>
      <div className='banner' style={{ width: 'auto', height: '310px' }}></div>
      <div className='search'>
        <form onSubmit={(e) => e.preventDefault()}>
          <input className="search-input" style={{ height: '30px' }} placeholder='🔍 Search the phones' onChange={(e) => { e.preventDefault(); setSearchString(e.target.value) }}></input>
        </form>
      </div><br></br><br></br><br></br>
      <div style={{ width: 'auto', height: 'auto', backgroundColor: 'black' }} className='contain'>
        {dataArray.map((phone) => (
          <div key={phone._id}>
            <center>
              {
                phone.Model_Name.search(new RegExp(searchString, "i")) != -1 &&
                <button className='container' onClick={() => { phoneSelected(phone.Model_Name, phone); setModelId(phone._id); addOrder(phone.Model_Name, phone._id, phone.price, phone.retailer); }}>
                  {model_id != phone._id && <div className='price'>{"₹ " + phone.price}</div>}
                  {model_id == phone._id && <div className='price-click'>{"₹ " + phone.price}</div>}
                  <div style={{ fontSize: "17px" }}>{phone.Model_Name}</div>
                  <div style={{ fontFamily: "Aerial", fontSize: "15px" }}>{`(${phone.RAM}GB / ${phone.memory_Capacity}GB)`}</div>
                  <img className='img' src={phone.URL}></img>
                </button>
              }
            </center>
          </div>
        ))}
      </div>
      {showCompare == 0 &&
        <div className='compare'>
          <center>
            <div className='phone1'>{select1 + " "}{select1 != 'Select the Phone1' && <button style={{ borderRadius: '20px' }} onClick={() => { setSelect1('Select the Phone1'); }}>X</button>}</div>
            <div>VS</div>
            <div className='phone2'>{select2 + " "}{select2 != 'Select the Phone2' && <button style={{ borderRadius: '20px' }} onClick={() => { setSelect2('Select the Phone2'); }}>X</button>}</div>
            <button className='CompareButton' onClick={(e) => { e.preventDefault(); setShowCompWindow(!showCompWindow); }}>{(showCompWindow == false) ? "Compare" : "Close"}</button>
          </center>
        </div>
      }
      {
        showCompWindow &&
        <div className='compareWindow'>
          <table className='table'>
            <tr>
              <td><img width="150px" height="300px" src={selectDetail1.URL}></img></td>
              <td><img width="150px" height="300px" src={selectDetail2.URL}></img></td>
            </tr>
            <tr>
              <td>{selectDetail1.Model_Name}</td>
              <td>{selectDetail2.Model_Name}</td>
            </tr>
            <tr>
              <td>{selectDetail1.RAM}</td>
              <td>{selectDetail2.RAM}</td>
            </tr>
            <tr>
              <td>{selectDetail1.Package_Dimensions}</td>
              <td>{selectDetail2.Package_Dimensions}</td>
            </tr>
            <tr>
              <td>{selectDetail1.OS}</td>
              <td>{selectDetail2.OS}</td>
            </tr>
            <tr>
              <td>{selectDetail1.Display_technology}</td>
              <td>{selectDetail2.Display_technology}</td>
            </tr>
            <tr>
              <td>{selectDetail1.Colour}</td>
              <td>{selectDetail2.Colour}</td>
            </tr>
            <tr>
              <td>{selectDetail1.Battery_Power}</td>
              <td>{selectDetail2.Battery_Power}</td>
            </tr>
            <tr>
              <td>{selectDetail1.Item_Weight}</td>
              <td>{selectDetail2.Item_Weight}</td>
            </tr>
            <tr>
              <td>{selectDetail1.display_size}</td>
              <td>{selectDetail2.display_size}</td>
            </tr>
            <tr>
              <td>{selectDetail1.memory_Capacity}</td>
              <td>{selectDetail2.memory_Capacity}</td>
            </tr>
            <tr>
              <td>{"₹" + selectDetail1.price}</td>
              <td>{"₹" + selectDetail2.price}</td>
            </tr>
            <tr>
              <td>{selectDetail1.retailer}</td>
              <td>{selectDetail2.retailer}</td>
            </tr>
          </table>
        </div>
      }
      <div>
        {buy &&
          <div className='orderWindow'>
            <div className='totalprice' style={{ backgroundColor: 'goldenrod' }}>{"Total Price      ₹" + totalPrice}<button className='confirm-button' onClick={() => orderConfirmed()}>Confirm</button></div>
            {
              orderList.map(orders => {
                return (
                  <div key={orders._id}>
                    <table className='ordertable'>
                      <tr>
                        <td>{orders.name}</td>
                        <hr></hr>
                        <td>{"₹" + orders.price}</td>
                      </tr>
                    </table>
                  </div>
                )
              })
            }
          </div>
        }
        { my_orders && <div className='orders'>
          <div className='order' style={{ height: window.innerHeight - 160,paddingRight:'30px' }}>
            <div style={{ fontSize: '40px' }}>My Orders</div>
            {
              ordered.map((orders) => {
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
                      {orders.status == 0 && <label style={{ color: 'red' }}>{`${"Pending"}`}</label>}
                      {orders.status == 1 && <label style={{ color: 'green' }}>{`${"Processed"}`}</label>}
                      <br></br>

                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
          }
      </div>
    </div>
  )
}

export default Home
