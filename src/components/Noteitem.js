import React,{ useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { deleteNote } = useContext(noteContext);
    const {note, updateNote} = props;
    return (
        <div className="card col-5 mx-3 my-3" >
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted" >{note.tag}</h6>
                <p className="card-text">{note.description}</p>
                <button type="button" className="btn btn-primary btn-sm " onClick={()=>{updateNote(note)}}>Edit</button>
                <button type="button" className="btn btn-primary btn-sm mx-3" onClick={()=>{deleteNote(note._id)}}>Delete</button>
            </div>
        </div>
    )
}

export default Noteitem