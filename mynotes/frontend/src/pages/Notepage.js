import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useState ,useEffect } from 'react';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext';




 
      // <select multiple>
      //   {options}
      // </select>
 



const Notepage = () => {

let {user,tokens}=useContext(AuthContext)

  const [data, setData] = useState([]);

useEffect(() => {
fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB0RRs2sM4m_Ci4xXo00CZe4Dk7sTHeAPg')
  .then(response => response.json())
  .then(data => setData(data.items));
}, []);


const [selectedFont, setSelectedFont] = useState('Arial');

const handleFontChange = (event) => {
  setSelectedFont(event.target.value);
  console.log('trigerred')
};


   let  {id}=useParams();//useparams gives object of all elements of route variable

   let [note,setNote]=useState(null)


const updateNote=async()=>{
  fetch(`/api/notes/${id}/update/`,{
    method:"PUT",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(note)
  })
}

const createNote=async()=>{
console.log(note)
  fetch(`/api/notes/create/`,{
    method:"POST",
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer '+String(tokens.access)
    },
    body:JSON.stringify({'note':note.body,'user':user})
  })
}


const deleteNote=async()=>{
  fetch(`/api/notes/${id}/delete/`,{
    method:'DELETE',
    'headers':{
      'Content-Type':'application/json'
    }

  })
}
let handleSubmit=()=>{
  if(id!== 'new' && !note.body){
    deleteNote();
  }
  else if(id!=='new' && note.body!==null){
  updateNote()
  }
  else if(id==='new' && note.body!==null){
    createNote();
  }
}
 
const getNote= async ()=>{
  if(id ==='new') return
  let response= await fetch(`/api/notes/${id}`)
  let data=await response.json()
  setNote(data)

}
useEffect(()=>{
    getNote()
   },[id])
  return (
    <div className='note'>
      <div className='note-header'>
   

        <h1>
          <Link to='/'>
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h1>

        
       {/*Use ternary(conditional) operator instead of creating unnamed function to use if else */}
        {
          (()=>{
            if(id !== 'new'){
              return(  <Link to ='/'>
              <button onClick= {deleteNote}>Delete</button>
              </Link>)
            
               }

        else{
          return(
            <Link to ='/'>
            <button onClick={handleSubmit}>Done</button>
            </Link>
          )
       
        }

          })()

        }
                


      </div>
     <textarea style={{ fontFamily: selectedFont }} onChange={(e)=>setNote({...note,'body':e.target.value})} value= {note?.body}></textarea>
    </div>

  )
}

export default Notepage
