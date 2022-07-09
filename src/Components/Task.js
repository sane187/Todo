import React,{useEffect, useState,useRef} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import '../Css/task.css';
import { Row,Col,Container,Stack,Form,Button,Modal,FloatingLabel } from 'react-bootstrap';
import { BsPhoneFill,BsHash,BsCalendar2Date,BsCardChecklist,BsFillStarFill,BsFillExclamationCircleFill } from 'react-icons/bs';
import {AiOutlineUser } from 'react-icons/ai';
import { HiOutlineMail,HiOutlineOfficeBuilding } from 'react-icons/hi';
import {MdDelete } from 'react-icons/md';
import {addTask,deleteTask,updateTask} from "../store/features/task/taskSlice";
import { FaRegHandSpock,FaRegStar } from 'react-icons/fa';
import todo from '../Assets/todo.jpg';
import { nanoid } from '@reduxjs/toolkit';


function MyVerticallyCenteredModal(props) {
 

  const [imp,setImp]=useState(+false);
  const [formData,setFormData] = useState({title:"",task:"","fav":+false})
  const dispatch=useDispatch();

  const handleSave =(props)=>{
    props.onHide(); 
    dispatch(addTask({...formData,id:nanoid()}));
    setImp(+false)
    setFormData({title:"",task:""})
  }
  const handleImp =(e)=>{
    
    setImp(+!imp);
  setFormData({...formData,"fav":+!formData.imp})
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

      <div className='d-flex align-items-center imp-cont' onClick={handleImp}><h6 className='mb-0 me-2'>Click to mark as important</h6> {imp===+true?<BsFillExclamationCircleFill style={{color:"red"}}/>:<BsFillExclamationCircleFill style={{color:"black"}}/>}</div>
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
  const [imp,setImp]=useState(+false);
  const [formData,setFormData] = useState(props.data)
  const dispatch=useDispatch();
  console.log(formData)

  const handleSave =(props,id)=>{
    props.onHide(); 
    console.log(formData)
    dispatch(updateTask(formData));
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
        <Form.Control type="text" placeholder="This is a title..." value={formData?formData.title:2} onChange={(e=>setFormData({...formData,"title":e.target.value}))}/>
      </Form.Group>
      
      <FloatingLabel
        controlId="floatingInput"
        label="Describe your task..."
        className="mb-3" 
      >
        <Form.Control type="text" placeholder="name@example.com" value={formData?formData.task:2} style={{height:"15vh"}} onChange={(e=>setFormData({...formData,"task":e.target.value}))}/>
      </FloatingLabel>

      <div className='d-flex align-items-center imp-cont' onClick={(e=>setFormData({...formData,"fav":imp}))}><h6 className='mb-0 me-2'>Click to mark as important</h6> {imp===+true?<BsFillExclamationCircleFill style={{color:"red"}}/>:<BsFillExclamationCircleFill style={{color:"black"}}/>}</div>
      </Form>

      </Modal.Body>
      <Modal.Footer className='justify-content-center pt-4 border-none'>
        <div className='mfooter-btn-cont'><Button className="me-2" onClick={props.onHide}>Cancel</Button><Button onClick={()=>handleSave(props,formData.id)}>Save</Button></div>
      </Modal.Footer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#BF68E6" fillOpacity="1" d="M0,160L80,181.3C160,203,320,245,480,218.7C640,192,800,96,960,85.3C1120,75,1280,149,1360,186.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>


    </Modal>
  )
}


const Task = () => {
  function populateStorage(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  const name= useSelector(store=>store.user)

  if(name.list.data){
  populateStorage(name.list.data.Data) 
  }
const dispatch=useDispatch()
const [selected,setSelected]=useState({})
  const {data}=useSelector(state=>state.task);
  const [modalShow, setModalShow] = React.useState(+false);
  const [show, setShow] = React.useState(+false);

  const handleDelete=(id)=>{
    dispatch(deleteTask(id));
  }
  const handleEdit =(item)=>{
    setSelected(item)
   setShow(+true)
  }
 
 
  return (
    <React.Fragment>
        <Container fluid style={{marginTop:"2.5rem"}}>
            <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(+false)}
      />
      {show?<EditModal show={show} onHide={()=>setShow(+false)} data={selected}/>:""}
<Row >
    <Col lg={4} xl={4}  style={{backgroundImage: `url(${todo})`,backgroundSize:"cover",backgroundRepeat:'no-repeat',backgroundPosition:"center center"}}>
      {name.list.data?
        <div className='p-4'>
<Stack className='sidebar-cont' direction='horizontal'><AiOutlineUser />{name.list.data.Data.firstName}{name.list.data.Data.lastName}</Stack>
<Stack className='sidebar-cont' direction='horizontal'><HiOutlineMail />{name.list.data.Data.email}</Stack>
<Stack className='sidebar-cont' direction='horizontal'><BsPhoneFill />{name.list.data.Data.mobileNumber}</Stack>
<Stack className='sidebar-cont' direction='horizontal'><HiOutlineOfficeBuilding />{name.list.data.Data.Organization.name}</Stack>
<Stack className='sidebar-cont' direction='horizontal'><BsHash />{name.list.data.Data.Organization.id}</Stack>

        </div>:""
}
    </Col>
    <Col lg={8} xl={8} >
<section className='px-5'>
 <Stack gap={5} direction='horizontal'><div className='d-flex align-items-center'><h1 className='task-head me-1'>What's up, {name.list.data?name.list.data.Data.firstName:""}! </h1><FaRegHandSpock className='handshake-icon'/>
 </div><Button className="open-modal-btn" variant="primary" onClick={() => setModalShow(+true)}>+ Add New Task</Button></Stack>
 <h5 className='mt-2'>5 Tasks For Today</h5>
 <div className='task-outer-cont'>
 {data?data.map((item,index)=>(
  <div className='d-flex align-items-center justify-content-between py-2' style={{borderBottom:"1px solid #e4e4e4"}} key={item.id}> 
  <Form.Check type="checkbox" id={item.id} label={item.title} />
  <div className='d-flex align-items-center'>
    <Button className="p-1" variant='warning' onClick={()=>handleEdit(item)}>Edit</Button>
   
  <MdDelete className='mx-2' onClick={()=>handleDelete(item.id)}/>
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