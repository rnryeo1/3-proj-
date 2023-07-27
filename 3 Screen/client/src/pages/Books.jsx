import React from "react";
import { useEffect } from "react";
import { useState,createContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export const AppContext = createContext("");
// IE에서 axios 통신 결과 캐싱되는 현상 방지**
axios.defaults.headers.common = {
    Pragma: 'no-cache'
};

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [Carts, setCarts] = useState([]);
  const [Datas, setDatas] = useState([]);
   const [number, setNumber] = useState(0);
const [number2, setNumber2] = useState(0);
const [isEditing, setIsEditing] = useState(false);
const [table_num, settable_no] = useState(0);
const [orderId, setorderId] = useState(0);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
    InitData();
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  function getFormatDate(date){
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month > 10 ? month : '0' + month; // 10이 넘지 않으면 앞에 0을 붙인다
    var day = date.getDate();
    day = day > 10 ? day : '0' + day; // 10이 넘지 않으면 앞에 0을 붙인다
    var hours = date.getHours();
    hours = hours > 10 ? hours : '0' + hours; // 10이 넘지 않으면 앞에 0을 붙인다
    var minutes = date.getMinutes();
    minutes =  minutes > 10 ? minutes : '0' + minutes; // 10이 넘지 않으면 앞에 0을 붙인다
    var seconds = date.getSeconds();
    seconds = seconds > 10 ? seconds : '0' + seconds; // 10이 넘지 않으면 앞에 0을 붙인다
 
    // return year + '-' + month + '-' + day;
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const CartChange = (order_id,product_name, options, table_no, quantity, order_date,
       order_time,date_time,price,totalprice,totalquantity) => {
      
    const created_date = new Date().getTime();  
    var date = getFormatDate(new Date());

    const newItem = {
      order_id ,
      product_name,  //메뉴명 
      options,
      table_no,
      quantity,   
      order_date,     
      order_time,     
      date_time: date,
      price,
      totalprice: number + parseInt(price), //가격 소계 
      totalquantity : number2 + parseInt(quantity),   //수량 소계     
    }
  
    //setCarts((prev) => ({ ...prev, newItem }));
    setNumber(number + parseInt(price));
    setNumber2(number2 + parseInt(quantity));
    setCarts([...Carts, newItem]);
    setorderId(orderId + 1);
    
  };

  function repeatCart(Carts) {
    let arr = [];
    console.log(Carts.length);
      
    for (let i = 0; i < Carts.length; i++){
      arr.push(
        <div className="book">
          <h2>{JSON.stringify(Carts[i])}</h2>
        </div>
      )
    }

    return arr;

  }

  function repeatDatas(Datas) {
    let arr = [];
      
    for (let i = 0; i < Datas.length; i++){
      arr.push(
        
        <h2>주문일 &nbsp;&nbsp; {JSON.stringify(Datas[i].date_time)}<br></br>
          
          주문자&nbsp; &nbsp;{JSON.stringify(Datas[i].orderer_name)}<br></br>

          테이블번호 &nbsp;&nbsp;{JSON.stringify(Datas[i].table_no)}<br></br>
            
          주문번호 &nbsp;&nbsp;{JSON.stringify(Datas[i].order_id)} <br></br>
         
          </h2>
 
      )
    }

    return arr;

  }
   

 const startEditingHandler = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
     settable_no((prev) => (e.target.value));
  };
  // const handleClick = async (e) => {
  //   try {
  //     await axios.get(`http://localhost:8800/books/${table_num}`);
  //   } catch (err) {
  //     console.log(err);
  //   }

   


  // };
    const InitData = async () => {
      try {
        const res = await axios.get("codingTest/getLast.php");
        console.log(res);
        setDatas(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    




   const handleOrder = async () => {
     try {
      await axios.post("http://localhost:8800/books", Carts);
      //navigate("/");
    } catch (err) {
      console.log(err);
      //setError(true)
    }
  };

  return (
    <div>
      <div className="border"> 
         {/* <button onClick={InitData}>LoadData</button> */}
        <h1>RGT 테스트 매장</h1>
        <h1>테스트</h1>
        {repeatDatas(Datas)}

      </div>
      {/* <div className="borderR"></div>
      <div className="borderB"></div> */}
      <button className="borderR" >이전화면</button>
      <button className="borderB" >확인</button>
    </div>
  );
};

export default Books;