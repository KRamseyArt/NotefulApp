import React from 'react'

export default function NotePage(props) {
  const note = props.note;

  return (
    <div
      className="NotePage"
    >
      <section
        className="NoteHead"
      >
        <div className="Details">
          <h2>
            {note.name}
          </h2>
          <article>
            <em>Date Modified: {note.modified}</em>
          </article>
        </div>

        <button
          className="DeleteNote"
        >
          X
        </button>
      </section>
      {note.content}
    </div>
  )
}
