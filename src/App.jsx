import { useEffect, useReducer } from "react";
import "./App.css";
import AddNewNote from "./components/AddNewNote";
import Notelist from "./components/Notelist";
import NoteStatus from "./components/NoteStatus";
import NoteHeader from "./components/NoteHeader";
import axios from "axios";
// import axios, { Axios } from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "addNewNote":
      return { ...state, notes: [...state.notes, action.payload] };
    case "updateNote":
      return { ...state, notes: action.payload };
    case "setSortBy":
      return { ...state, sortBy: action.payload };
    default:
      throw new Error("unknown Error " + action.type);
  }
}

function App() {
  const initialState = {
    notes: [],
    sortBy: "latest",
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:8000/notes")
        .then((data) => dispatch({ type: "updateNote", payload: data.data }))
        .catch((error) => console.log(error));
    };

    fetchData();
  }, []);

  const [{ notes, sortBy }, dispatch] = useReducer(reducer, initialState);
  // const [notes, setNotes] = useState([])
  // const [sortBy, setSortBy] = useState("latest")

  const handleNote = (newNote) => {
    axios.post("http://localhost:8000/notes", newNote);
    dispatch({ type: "addNewNote", payload: newNote });
  };

  const handleDelete = (id) => {
    const newNotes = notes.filter((item) => item.id != id);
    axios.delete(`http://localhost:8000/notes/${id}`);
    dispatch({ type: "updateNote", payload: newNotes });
  };

  const handleCompleteNote = (id) => {
    const item = notes.find(n => n.id === id)
    console.log(item)
    axios.patch(`http://localhost:8000/notes/${id}`, {
      completed: !item.completed,
    });
    const newNotes = notes.map((n) =>
      +n.id === +id ? { ...n, completed: !n.completed } : n
    );
    // setNotes(newNote)
    dispatch({ type: "updateNote", payload: newNotes });
  };

  return (
    <div className="container">
      <NoteHeader
        notes={notes}
        sortBy={sortBy}
        onSort={(e) => dispatch({ type: "setSortBy", payload: e.target.value })}
      />
      <div className="note-app">
        <AddNewNote onAddNote={handleNote} />
        <div className="note-container">
          <NoteStatus notes={notes} />
          <Notelist
            notes={notes}
            sortBy={sortBy}
            onDelete={handleDelete}
            onComplete={handleCompleteNote}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
