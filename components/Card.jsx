import React from "react"

function Card(props) {
    // const comments = props.entry.comments.map(comment => {
    //     return (
    //         <div>
    //             <p>{comment.date} — {comment.body}</p>
    //             <button datalibrary={props.entry._id} datacomment={comment._id} id="edit">Edit</button>
    //             <button id="delete" className="delete btn btn-primary" onClick={(event) => props.handleDeleteButton(event, props.entry._id, comment.id)}>Delete</button>
    //         </div>
    //     )
    // })
    return (
        <div className="col">
            <div className="card h-100 border-light">
                <img src={props.entry.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h3 className="card-title">{props.entry.name}</h3>
                    <span className="badge rounded-pill text-bg-dark">{props.entry.area}</span>
                    {props.entry.year && <span className="badge rounded-pill text-bg-dark">{props.entry.year}</span>}
                    {props.entry.aa_town && <span className="badge rounded-pill text-bg-dark">Black Incorporated Town</span>}
                    <span className="badge rounded-pill text-bg-dark"><a href={props.entry.website} className="card-link">Website</a></span>
                    <p className="card-text">{props.entry.address}</p>
                    <p className="card-text"><small className="text-body-secondary">Area Director: {props.entry.area_director}</small></p>
                    <button id={props.entry._id} onClick={event => props.comment(event, props.entry._id)} className="btn btn-outline-dark">Comment</button>
                </div>
            </div>
        </div>
    )
}

export default Card