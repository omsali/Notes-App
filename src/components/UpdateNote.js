import React, { useContext, useState, useRef } from 'react'
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext'

const UpdateNote = () => {
    const { notes, editNote } = useContext(noteContext);

    const ref = useRef(null)
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "Default"});

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
            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" name="edescription" id="edescription" cols="20" rows="5" onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleOnClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {notes.map((note) => {
            <Noteitem note={note} updateNote={updateNote} key={note._id} />
            })}
        </>
    )
}

export default UpdateNote