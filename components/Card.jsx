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
                    <h3 className="card-title">{props.entry.name}<span className="badge rounded-pill text-bg-dark">{props.entry.year === "" ? <small>Year Unknown</small> : <small>{props.entry.year}</small>}<br/></span></h3>
                    <p className="card-text">{props.entry.address}</p>
                    {/* <p className="card-text">{props.entry.description}</p> */}
                    <p className="card-text">{props.entry.area}</p>
                    <p className="card-text">{props.entry.area_director}</p>
                    {props.entry.aa_town ? <small>TRUE</small> : <small>FALSE</small>}<br/>
                    <a href={props.entry.website} className="card-link">Website</a><br/>
                    <button id={props.entry._id} onClick={event => props.comment(event, props.entry._id)} className="btn btn-primary">Comment</button><br/><br/>
                    {/* <h5>Comments:</h5>
                    {comments} */}
                </div>
            </div>
        </div>
    )
}

export default Card