import React from "react"
import { useState } from 'react'

function Sidebar(props) {
    // returns an array
    const library = props.entries.filter(library => library._id == props.libraryId)

    const comments = library[0].comments.map(comment => {
        return (
            <div>
                <p>{comment.date} — {comment.body}</p>
                <button datalibrary={props.libraryId} datacomment={comment._id} id="edit" onClick={(event) => props.editButton(event, props.libraryId, comment._id)}>Edit</button>
                <button id="delete" className="delete btn btn-primary" onClick={(event) => props.deleteButton(event, props.libraryId, comment._id)}>Delete</button>
            </div>
        )
    })

    return (
        <div className="col-sm-4">
            {/* <h1>Sidebar Component</h1> */}
            <form onSubmit={props.submit}>
                <label htmlFor="comment" className="form-label">How was your experience at this library?</label>
                <textarea type="text" name="comment" id="comment" className="form-control" style={{height: 100}} onChange={props.change} /><br />
                <button className="btn btn-outline-light" type="submit">Leave Comment</button>
            </form>
            <div className="card mb-3">
                <img src={library[0].image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{library[0].name}</h5>
                    <p className="card-text">{library[0].description}</p>
                    {/* <p className="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */}
                    <h5 className="card-title">Comments</h5>
                    {comments}
                </div>
            </div>
        </div>
    )
}

export default Sidebar