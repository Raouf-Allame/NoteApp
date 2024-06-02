

export default function NoteStatus({notes}) {
  const allNotes = notes.length
  const CompletedNotes = notes.filter(n => n.completed).length
  const unCompletedNotes = allNotes - CompletedNotes
  
  if (!allNotes) return <h2>No Notes has already been added</h2>

  return (
    <ul className="note-status">
        <li> All <span>{allNotes}</span> </li>
        <li> Completed <span> {CompletedNotes} </span> </li>
        <li> Open <span> {unCompletedNotes} </span> </li>
    </ul>
  ) 
}
