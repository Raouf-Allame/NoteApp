

export default function Notelist({ notes, onDelete, onComplete, sortBy }) {
  let sortedNotes = notes
  if (sortBy === "earliest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(a.createAt) - new Date(b.createAt))


  if (sortBy === "latest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt))

  if (sortBy === "completed")
    sortedNotes = [...notes].sort(
      (a, b) => +b.completed - +a.completed)
  return (
    <div className="note-list">
      {
        sortedNotes.map(note => <NoteItem key={note.id}
          note={note}
          onDelete={onDelete}
          onComplete={onComplete} />)
      }
    </div>
  )
}

function NoteItem({ note, onDelete, onComplete }) {



  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return <div className={`note-item ${note.completed ? "completed" : ""}`}>
    <div className="note-item__header">
      <div>
        <p className="title">{note.title}</p>
        <p className="desc">{note.description}</p>
      </div>
      <div className="actions">
        <button onClick={() => onDelete(note.id)} style={{border: '1px solid red', padding: '0.1rem'}}>❌Delete</button>
        <input type="checkbox" onChange={() => onComplete(note.id)} checked={note.completed} />
      </div>
    </div>
    <div className="note-item__footer">
      {new Date(note.createAt).toLocaleDateString("en-US", options)}
    </div>
  </div>
}
