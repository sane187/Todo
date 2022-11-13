import React,{useEffect, useState,useRef} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import '../Css/task.css';
import { Row,Col,Container,Stack,Form,Button,Modal,FloatingLabel } from 'react-bootstrap';
import { BsPhoneFill,BsHash,BsCalendar2Date,BsCardChecklist,BsFillStarFill,BsFillExclamationCircleFill } from 'react-icons/bs';
import {AiOutlineUser } from 'react-icons/ai';
import { HiOutlineMail,HiOutlineOfficeBuilding } from 'react-icons/hi';
import {MdDelete } from 'react-icons/md';
import { FaRegHandSpock,FaRegStar } from 'react-icons/fa';
import todo from '../Assets/todo.jpg';
import { nanoid } from '@reduxjs/toolkit';
import { getNotesData,createNotesData,deleteNotesData,updateNotesData,clearState } from '../store/features/task/taskSlice';
import moment from 'moment/moment';
import PageLoader from './PageLoader/PageLoader';


function MyVerticallyCenteredModal(props) {
 
const date = new Date()


  // const [imp,setImp]=useState(+false);
  const [formData,setFormData] = useState({title:"",task:"",fav:+false,date:date})
  const dispatch=useDispatch();
  const {isSuccess} = useSelector(state=>state.task)

  useEffect(()=>{
  if(isSuccess){
    props.onHide(); 
    dispatch(clearState())
  }
  },[isSuccess])

  const handleSave =(props)=>{
   
    dispatch(createNotesData({...formData,id:nanoid()}));
    
    setFormData({title:"",task:"",fav:+false,date:date})
  }
  const handleImp =(e)=>{
  setFormData((formData)=>({...formData,fav:+!formData.fav}))
}


console.log("aj",formData);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='border-none'>
        <Modal.Title id="contained-modal-title-vcenter" >
         ADD NEW TASK
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-5">
            <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="This is a title..." onChange={(e=>setFormData({...formData,"title":e.target.value}))}/>
      </Form.Group>
      
      <FloatingLabel
        controlId="floatingInput"
        label="Describe your task..."
        className="mb-3" 
      >
        <Form.Control type="email" placeholder="name@example.com" style={{height:"15vh"}} onChange={(e=>setFormData({...formData,"task":e.target.value}))}/>
      </FloatingLabel>
         <div className='d-flex align-items-center justify-content-center mt-2'>

      <div className='d-flex align-items-center imp-cont' onClick={handleImp}> 
      <h6 className='mb-0 me-2'>Click to mark as important</h6> {formData.fav===+true?<BsFillExclamationCircleFill style={{color:"red"}}/>:<BsFillExclamationCircleFill style={{color:"black"}}/>}</div>  
        <div className='mx-5' style={{borderRight:"2px solid black",height:"30px"}}></div>
        Select date <input type="date" className="ms-3 p-1" onChange={(e=>setFormData({...formData,"date":e.target.value}))} style={{borderRadius:"4px"}}/>
       
      </div>
      </Form>

      </Modal.Body>

      <Modal.Footer className='justify-content-center pt-4 border-none'>
        <div className='mfooter-btn-cont'><Button className="me-2" onClick={props.onHide}>Cancel</Button><Button onClick={()=>handleSave(props)}>Save</Button></div>
      </Modal.Footer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#BF68E6" fillOpacity="1" d="M0,160L80,181.3C160,203,320,245,480,218.7C640,192,800,96,960,85.3C1120,75,1280,149,1360,186.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
    </Modal>
  );
}
function EditModal(props) {


  const [formData,setFormData] = useState(props.data)


  // useEffect(()=>{
  //   if(isSuccess){
  //     props.onHide(); 
  //     dispatch(clearState())
  //   }
  //   },[isSuccess])
  
  
  
  const handleImp =(e)=>{
    
   
  setFormData((formData)=>({...formData,fav:+!formData.fav}))
}

 return (
   
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
     
      <Modal.Header closeButton className='border-none'>
        <Modal.Title id="contained-modal-title-vcenter" >
         UPDATE TASK
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-5">
            <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="This is a title..." value={formData?formData.title:""} onChange={(e=>setFormData({...formData,"title":e.target.value}))}/>
      </Form.Group>
      
      <FloatingLabel
        controlId="floatingInput"
        label="Describe your task..."
        className="mb-3" 
      >
        <Form.Control type="text" placeholder="name@example.com" value={formData?formData.task:""} style={{height:"15vh"}} onChange={(e=>setFormData({...formData,"task":e.target.value}))}/>
      </FloatingLabel>

      {/* <div className='d-flex align-items-center imp-cont' onClick={(e=>{setImp(!imp);setFormData({...formData,"fav":!imp})})}><h6 className='mb-0 me-2'>Click to mark as important</h6> {imp===true?<BsFillExclamationCircleFill style={{color:"red"}}/>:<BsFillExclamationCircleFill style={{color:"black"}}/>}</div> */}
      <div className='d-flex align-items-center'>

<div className='d-flex align-items-center imp-cont' onClick={handleImp}> 
<h6 className='mb-0 me-2'>Click to mark as important</h6> {formData.fav===+true?<BsFillExclamationCircleFill style={{color:"red"}}/>:<BsFillExclamationCircleFill style={{color:"black"}}/>}</div>  
  <div className='mx-5' style={{borderRight:"2px solid black",height:"30px"}}></div>
  Select date <input type="date" className="ms-3 p-1" value={moment(formData?.date).format("YYYY-MM-DD")} onChange={(e=>setFormData({...formData,"date":e.target.value}))} style={{borderRadius:"4px"}}/>

</div>
      </Form>

      </Modal.Body>
      <Modal.Footer className='justify-content-center pt-4 border-none'>
        <div className='mfooter-btn-cont'><Button className="me-2" onClick={props.onHide}>Cancel</Button><Button onClick={()=>props.handleSave(formData,formData.id)}>Save</Button></div>
      </Modal.Footer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#BF68E6" fillOpacity="1" d="M0,160L80,181.3C160,203,320,245,480,218.7C640,192,800,96,960,85.3C1120,75,1280,149,1360,186.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>


    </Modal>
  )
}


const Task = () => {
  function populateStorage(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  
  // const name= useSelector(store=>store.user)


  // if(name.list.data ){
  // populateStorage(name.list.data.Data) 
  // }

const dispatch=useDispatch()
const [selected,setSelected]=useState({})
  const {data,loading,isSuccess}=useSelector(state=>state.task);
  const [modalShow, setModalShow] = React.useState(+false);
  const [show, setShow] = React.useState(+false);
  

  const handleDelete=(id)=>{
    dispatch(deleteNotesData(id));
    // dispatch(clearState())
  }
  const handleEdit =(item)=>{
    setSelected(item)
   setShow(+true)
  }

  const handleSave =(formData)=>{
    dispatch(updateNotesData({id:formData._id,Data:formData}));
  }
  

 useEffect(
  ()=>{
    dispatch(getNotesData())
  },[]
 )
 useEffect(()=>{
  if(isSuccess){
    setShow(+false)
    dispatch(getNotesData())
    dispatch(clearState())
  }
 },[isSuccess])
  return (
    <React.Fragment>
      {loading && <PageLoader />}
        <Container fluid style={{marginTop:"2.5rem"}}>
            <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(+false)}
      />
      {show?<EditModal show={show} onHide={()=>setShow(+false)} data={selected} handleSave={handleSave}/>:""}
<Row >
    <Col lg={4} xl={4}  style={{backgroundImage: `url(${todo})`,backgroundSize:"cover",backgroundRepeat:'no-repeat',backgroundPosition:"center center"}}>
        <div className='p-4'>
<Stack className='sidebar-cont' direction='horizontal'><AiOutlineUser />Aj</Stack>
<Stack className='sidebar-cont' direction='horizontal'><HiOutlineMail />Aj</Stack>
<Stack className='sidebar-cont' direction='horizontal'><BsPhoneFill />Aj</Stack>
<Stack className='sidebar-cont' direction='horizontal'><HiOutlineOfficeBuilding />Aj</Stack>
<Stack className='sidebar-cont' direction='horizontal'><BsHash />Aj</Stack>

        </div>

    </Col>
    <Col lg={8} xl={8} >
<section className='px-5'>
 <Stack gap={5} direction='horizontal'><div className='d-flex align-items-center'><h1 className='task-head me-1'>What's up, Arpit!</h1><FaRegHandSpock className='handshake-icon'/>
 </div><Button className="open-modal-btn" variant="primary" onClick={() => setModalShow(+true)}>+ Add New Task</Button></Stack>
 <h5 className='mt-2'>5 Tasks For Today</h5>
 <div className='task-outer-cont'>
 {data?data.map((item,index)=>(
 
  <div className='d-flex align-items-center justify-content-between py-2' style={{borderBottom:"1px solid #e4e4e4"}} key={item.id}> 
  <Form.Check type="checkbox" id={item.id} label={item.title} />
  <div className='d-flex align-items-center'>
    <Button className="p-1" variant='warning' onClick={()=>handleEdit(item)}>Edit</Button>
   
  <MdDelete className='mx-2' onClick={()=>handleDelete(item._id)}/>
  <BsFillStarFill style={{color:item.fav===+true?"#FFD700":"rgba(0,0,0,0.2)"}} onClick={(event)=>event.target.style.color="#FFD700"}/>
  </div>
  </div> 
  
 )):""}
 
 
 </div>
</section>

    </Col>

</Row>
</Container>
    </React.Fragment>
  )
}

export default Task