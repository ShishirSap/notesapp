import React from 'react'
import { Link } from 'react-router-dom'


let gettime=(note)=>{
  let d=new Date(note.updated).toLocaleDateString()
  return d
}

const gettitle= (note) => {
  var title=note.body.split('/n')[0]
  if (title.length>=40){
   return title.slice(0,40);
  }
  else {
    return title
  }
}

const ListItems = ({note}) => {
  return (
     <Link to={ `/note/${note.id}`} >
      <div className='notes-list-item'>
     <h3> {gettitle(note)}
     </h3>
     <p>{gettime(note)}</p>
     </div>
     </Link>
  )
}

export default ListItems
