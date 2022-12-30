import React from 'react'
import { useParams } from 'react-router-dom'
import { useState ,useEffect } from 'react';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import {Link} from 'react-router-dom'



const Notepage = () => {


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
  else{
  updateNote()
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
            <button>Done</button>
            </Link>
          )
       
        }

          })()

        }
                


      </div>
     <textarea onChange={(e)=>setNote({...note,'body':e.target.value})} defaultValue= {note?.body}></textarea>
    </div>

  )
}

export default Notepage
