import React from "react"
import { useState } from 'react'

function Sidebar(props) {
    // returns an array
    // console.log(props.libraryId);
    //console.log(props.displayLibrary);
    const library = props.entries.find(library => library._id == props.displayLibrary._id)

    const comments = library.comments.map(comment => {
        let date = new Date(comment.date)
        return (
            <div>
                <div className="comment card">
                    <div className="card-body">
                        <h5 className="card-title">{comment.body}</h5>
                        <small className="card-subtitle mb-2 text-body-secondary">{date.toString()}</small><br></br><br />
                        <button onClick={(event) => props.editButton(event, props.displayLibrary._id, comment._id, comment.body)} className="edit-btn btn btn-outline-dark">Edit</button>
                        <button id="delete" className="btn btn-outline-dark" onClick={(event) => props.deleteButton(event, props.displayLibrary._id, comment._id)}>Delete</button>
                    </div>
                </div>
                {/* <p>{comment.body}</p>
                <small>{date.toString()}</small>
                <button onClick={(event) => props.editButton(event, props.displayLibrary._id, comment._id)}>Edit</button>
                <button id="delete" className="delete btn btn-primary" onClick={(event) => props.deleteButton(event, props.displayLibrary._id, comment._id)}>Delete</button> */}
            </div>
        )
    })

    return (
        <div className="col-sm-4">
            <i className="bi bi-x-circle" onClick={props.close}></i>
            <p>This Libraries of PG Directory was built by <a href="https://ayanazairecotton.com/">Ayana Zaire Cotton</a> inside <a href="https://www.seedaschool.com/">Seeda School</a> as a part of the Full Stack Software Engineering Module 4: Community Directory project where learners are introduced to the React and Bootstrap libraries in order to build upon their full stack software engineering skills. Been to any of these libraries? Leave a comment about your experience below.</p>
            <form onSubmit={props.submit} id="comment-form">
                <label htmlFor="comment" className="form-label"><h4>How was your experience at this library?</h4></label>
                <textarea type="text" name="comment" id="comment" className="form-control" style={{height: 100}} onChange={props.change} placeholder={props.commentToEdit} /><br />
                {/* <textarea type="text" name="comment" id="comment" className="form-control" style={{height: 100}} onChange={props.change} placeholder={props.commentToEdit} /><br /> */}
                <button className="btn btn-outline-light" type="submit">{props.editButtonClicked ? "Edit Your Comment!" : "Leave New Comment!"}</button>
            </form><br></br>
            <div className="card mb-3">
                <img src={props.displayLibrary.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h3 className="card-title">{props.displayLibrary.name}</h3>
                    <span className="badge rounded-pill text-bg-dark">{props.displayLibrary.area}</span>
                    {props.displayLibrary.year && <span className="badge rounded-pill text-bg-dark">{props.displayLibrary.year}</span>}
                    {props.displayLibrary.aa_town && <span className="badge rounded-pill text-bg-dark">Black Incorporated Town</span>}
                    <span className="badge rounded-pill text-bg-dark"><a href={props.displayLibrary.website} className="card-link">Website</a></span>
                    <p className="card-text">{props.displayLibrary.address}</p>
                    <p className="card-text"><small className="text-body-secondary">Area Director: {props.displayLibrary.area_director}</small></p>
                    <p className="card-text">{props.displayLibrary.description}</p>
                    {/* <p className="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */}
                    <h4 className="card-title">Comments</h4>
                    {comments}
                </div>
            </div>
        </div>
    )
}

export default Sidebar