import React,{useState,useEffect, useContext} from 'react'
import AddButton from '../components/AddButton'
import ListItems from '../components/ListItems'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import AuthContext from '../context/AuthContext'



const NotesListPages = () => {
  let {tokens,logoutUser}=useContext(AuthContext)
  let [notes,setNotes]=useState([])
  useEffect(()=>{
       getNotes()
  },[])
  let getNotes=async ()=>{
    let response= await fetch('/api/notes/',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+String(tokens.access)
      }
    })
    let data=await response.json()
    if(response.status===200){
      setNotes(data)
    }
    else if(response.statusText==='Unauthorized'){
      logoutUser();
    }
    

  }
  return (
 
    <div className='notes'>
      <Header/>
      <div className='notes-header'>
      
   
    
   
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
      <div className='notes-list'>
        {notes.map((note)=>(
          <ListItems key={note.id} note={note} />
        ))}
      </div>
      <AddButton/>
    </div>
  )
}

export default NotesListPages
