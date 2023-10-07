import React, { useContext , useState} from 'react'
import { ToastContainer } from 'react-toastify';
import { alertSuccess } from './Alert';
import noteContext from '../context/notes/noteContext'


const AddNote = () => {
  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({title: "", description: "", tag: ""});

  const handleOnClick = (e) =>{
      e.preventDefault()
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
  }

  const onChange =(e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }


    return (
        <>
            <ToastContainer />
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" name="description" id="description" cols="20" rows="5" value={note.description} onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
            </form>
        </>
    )
}

export default AddNote