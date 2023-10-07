import { createContext } from "react";
// import { useState } from "react";
// import NoteContext from "./noteContext";
// import { alertSuccess } from "../../components/Alert";

const NoteContext = createContext();

export default NoteContext;

// const NotesProvider = ({children}) =>{
//     const host = "http://localhost:5000"
//   const notesInitial = [];

//   const [notes, setNotes] = useState(notesInitial);

//   // Get all notes
//   const getNotes = async () => {
//     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'auth-token': localStorage.getItem("token")
//       },
//     })
//     const json = await response.json();
//     console.log(json);
//     setNotes(json);
//   }

//   //Add a Note
//   const addNote = async (title, description, tag) => {
//     //API call
//     const response = await fetch(`${host}/api/notes/addnote`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'auth-token': localStorage.getItem("token")
//       },
//       body: JSON.stringify({title, description, tag}) 
//     });
//     const note = await response.json();
    

//     //Add a note
    
//     setNotes(notes.concat(note));
//     alertSuccess("Note added successfully")
//   }
//   //Delete a Note
//   const deleteNote = async (id) => {
//     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'auth-token': localStorage.getItem("token")
//       }
//     });
//     const json = response.json();
//     console.log({ json });
//     const newNotes = notes.filter((note) => { return note._id !== id })
//     setNotes(newNotes);
//     alertSuccess("Note deleted successfully")
//   }
//   //Edit a Note
//   const editNote = async (id, title, description, tag) => {
//     //API call
//     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'auth-token': localStorage.getItem("token")
//       },
//       body: JSON.stringify({ title, description, tag })
//     });
//     const json = await response.json();
//     console.log({ json });

//     //edit note
//     let newNotes = JSON.parse(JSON.stringify(notes))
//     for (let index = 0; index < newNotes.length; index++) {
//       const element = notes[index];
//       if (element._id === id) {
//         newNotes[index].title = title;
//         newNotes[index].description = description;
//         newNotes[index].tag = tag;
//         break;
//       }
//     }
//     setNotes(newNotes);
//     alertSuccess("Note updated successfully")
//   }

 
//     return <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>{children}</NoteContext.Provider>
// }

// const useNotes = () => useContext(NoteContext);

// export {NotesProvider,useNotes}