import React from "react";
import { useEffect } from "react";
import { useState,createContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export const AppContext = createContext("");


const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [Carts, setCarts] = useState([]);
  const [Carts2, setCarts2] = useState([]);
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

  function repeatCart2(Carts2) {
    let arr = [];
      
    for (let i = 0; i < Carts2.length; i++){
      arr.push(
        <div className="book2">
          <h2>{JSON.stringify(Carts2[i].product_name)} 
          {JSON.stringify(Carts2[i].date_time)}
          {JSON.stringify(Carts2[i].table_no)}</h2>
        </div>
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

  //useEffect(() => {
    const handleClick = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${table_num}`);
        setCarts2(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    
 // }, []);



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
      <h1>메뉴 목록 </h1>
      <div key={0} className="books">
          <h1>1)커피 </h1>
          { <div key={1} className="book">
            <h2>{`아메리카노(HOT) : 2,000원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId, "아메리카노(HOT)", null, 1, "1", null, null, null, `${2000}`,number,number2) }>카트 담기</button>
         
          <div key={2} className="book">
            <h2>{`아메리카노(ICE) : 2,300원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"아메리카노(ICE)",null,2,"1",null,null,null,`${2300}`,number,number2)}>카트 담기</button>
          </div>

          <div key={3} className="book">
            <h2>{`카페라떼(HOT) : 3,500원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"카페라떼(HOT)",null,3,"1",null,null,null,`${3500}`,number,number2)}>카트 담기</button>
          </div>

          <div key={4} className="book">
            <h2>{`카푸치노 : 4,000원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"카푸치노",null,4,"1",null,null,null,`${4000}`,number,number2)}>카트 담기</button>
          </div>

          <h1>2)차/음료 </h1>
          <div key={5} className="book">
            <h2>{`레몬에이드 : 3,500원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"레몬에이드",null,5,"1",null,null,null,`${3500}`,number,number2)}>카트 담기</button>
            </div>
          <div key={5} className="book">
            <h2>{`밀크쉐이크 : 4,500원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"밀크쉐이크",null,6,"1",null,null,null,`${4500}`,number,number2)}>카트 담기</button>
            </div>  
          <div key={5} className="book">
            <h2>{`말차라떼 : 4,500원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"말차라떼",null,7,"1",null,null,null,`${4500}`,number,number2)}>카트 담기</button>
            </div>
            <div key={5} className="book">
            <h2>{`초코라떼 : 5,000원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"레몬에이드",null,8,"1",null,null,null,`${5000}`,number,number2)}>카트 담기</button>
            </div>
            <h1>3)디저트 </h1>
             <div key={5} className="book">
            <h2>{`초코쿠키 : 2,500원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"초코쿠키",null,9,"1",null,null,null,`${2500}`,number,number2)}>카트 담기</button>
            </div>
          <div key={5} className="book">
            <h2>{`아몬드 쿠키 : 3,000원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"아몬드 쿠키",null,10,"1",null,null,null,`${3000}`,number,number2)}>카트 담기</button>
            </div>  
          <div key={5} className="book">
            <h2>{`초코케익 : 4,000원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"초코케익",null,11,"1",null,null,null,`${4000}`,number,number2)}>카트 담기</button>
            </div>
            <div key={5} className="book">
            <h2>{`딸기 케익 : 4,500원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"딸기 케익",null,12,"1",null,null,null,`${4500}`,number,number2)}>카트 담기</button>
            </div>
            <h1>3)기타 </h1>
             <div key={5} className="book">
            <h2>{`생수 : 2,000원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"생수",null,13,"1",null,null,null,`${2000}`,number,number2)}>카트 담기</button>
            </div>
          <div key={5} className="book">
            <h2>{`콜라 : 2,500원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"콜라",null,14,"1",null,null,null,`${2500}`,number,number2)}>카트 담기</button>
            </div>  
          <div key={5} className="book">
            <h2>{`사이다 : 2,500원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"사이다",null,15,"1",null,null,null,`${2500}`,number,number2)}>카트 담기</button>
            </div>
            <div key={5} className="book">
            <h2>{`페리에 : 4,000원`}</h2>
          <button className="delete" onClick={() => CartChange(orderId,"페리에",null,16,"1",null,null,null,`${4000}`,number,number2)}>카트 담기</button>
            </div>
          

            <h1>카트 목록</h1>
          {repeatCart(Carts)}   
          <h2>{`가격합계:` + number}</h2>
          <h2>{`수량합계:`+number2}</h2>
          </div> }
          
      </div>
      <button className="addHome" onClick={startEditingHandler}>
        <Link style ={{ color: "inherit", textDecoration: "none" }}>
          Cart 버튼
        </Link>
        </button>
        
        <div>
          {isEditing && (<button className="addHome2" onClick={handleOrder}>
            <Link style={{ color: "inherit", textDecoration: "none" }}>
              주문하기
            </Link>
          </button>)}
        </div>
     

      <div className="form">
         <input
        type="number"
        placeholder="table_number"
        name="table_no"
         onChange={handleChange}
        />
        <button onClick={handleClick}>table_no 검색</button>
        
      </div>
      {repeatCart2(Carts2)}
    </div>
  );
};

export default Books;