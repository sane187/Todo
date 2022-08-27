import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeName } from '../store/features/profile/profileSlice';
import { Row, Col, Container } from 'react-bootstrap';
import '../Css/calender.css';
import { getPosts } from '../store/features/user/userSlice';

// const {name,username,total}=useSelector((store)=>store.profile)
// const dispatch= useDispatch()

const Calender = () => {

  let dateObj = new Date();
  let arr = [];
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [currentDateCalender,setCurrentDateCalender] =useState(0)


  let month = monthArr[dateObj.getMonth()];

  const displayDay = () => {
    let currentDay = dateObj.getDay();

    let day = currentDay;

    for (let i = 0; i < 6; i++) {
      day++;
      if (day - 1 > 6) { day = 1 }
      arr[i].name = day - 1;
    }

  }
  const getDaysInMonth = (month, year) => {
       
    return new Date(year, month, 0).getDate();
  }
  const daysInMonth = getDaysInMonth(dateObj.getMonth(), 2022);
  
  const displayDate = () => {
    let currentDate = dateObj.getDate();
    for (let i = 0; i < 6; i++) {
      
      console.log(currentDate);
      console.log(daysInMonth);

     
      if (currentDate === daysInMonth) {
        currentDate = 1
      }
      else if(currentDate<daysInMonth){
        currentDate=dateObj.getDate()
        currentDate+=i
      }

      arr.push({ date: currentDate, name: "" });
    }

  }

  return (
    <React.Fragment>
      <Container fluid className='px-4' style={{ marginTop: "1.2rem" }}>
        <Row>
          {displayDate()}
          {displayDay()}

          {arr.map((item,index) => (
            <Col lg={2} key={item.date}>
              <div className='d-flex flex-column align-items-center date-cont py-1' style={index===currentDateCalender?{background:"RGBA(183, 96, 224,0.3)"}:{}} onClick={()=>setCurrentDateCalender(index)}>
                <h2 >{item.date}</h2>
                <h4>{weekday[item.name]}</h4>
              </div>
            </Col>
          ))}


        </Row>
      </Container>

    </React.Fragment>

  )
}

export default Calender