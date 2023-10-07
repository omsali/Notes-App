import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
// import { useNotes } from '../context/notes/noteContext';
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
// import Addnotes from './addnotes';
import Noteitem from './Noteitem';



const Notes = () => {
  let history = useHistory();
  let context = useContext(noteContext)
  const { notes, getNotes, editNote } = context;
  console.log(notes);
  useEffect(() => {
    if(localStorage.getItem("token")){
      getNotes();
    }
    else{
      history.push('/login')
    }
    //eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "Default"});
  // const [showmodal, setaddmodal] = useState(false);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  }


  const handleOnClick = (e) =>{
    e.preventDefault()
    console.log("updating", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
}

const onChange =(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}



  return (
    <>
     
      <AddNote />
      
      {/* <button className="addnote" onClick={()=>setaddmodal((prev)=>!prev)}> + </button>
      {showmodal && <Addnotes />} */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <textarea className="form-control" name="edescription" id="edescription" value={note.edescription} cols="20" rows="5" onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleOnClick}>Edit Note</button>
            </div>
          </div>
        </div>
      </div>
      <h2 className='my-4'>Your Notes</h2>
      <div className='row my-3'>
        <h5 className="container mx-3">
          {notes.length === 0 && 'No notes to display'}
        </h5>
        {notes.map((note) => {
          return <Noteitem note={note} updateNote={updateNote} key={note._id} />
        })}

      </div>
    </>
  )
}

export default Notes