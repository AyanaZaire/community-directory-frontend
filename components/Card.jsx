import React from "react"

function Card(props) {
    const comments = props.entry.comments.map(comment => {
        return (
            <div>
                <p key={comment._id}>{comment.date} — {comment.body}</p>
                <button id={props.entry._id} className="btn btn-primary" key={comment._id}>Edit</button>
                <button id={props.entry._id} className="btn btn-primary"key={comment._id}>Delete</button>
            </div>
        )
    })
    return (
        <div className="col">
            <div className="card" style={{width: "18rem"}}>
                <img src={props.entry.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h3 className="card-title">{props.entry.name}</h3>
                    <p className="card-text">{props.entry.address}</p>
                    <p className="card-text">{props.entry.description}</p>
                    <p className="card-text">{props.entry.area}</p>
                    <p className="card-text">{props.entry.area_director}</p>
                    {props.entry.aa_town ? <small>TRUE</small> : <small>FALSE</small>}<br/>
                    {props.entry.year === "" ? <small>Year Unknown</small> : <small>{props.entry.year}</small>}<br/>
                    <a href={props.entry.website} className="card-link">Website</a><br/>
                    <button id={props.entry._id} onClick={props.comment} className="btn btn-primary">Comment</button><br/><br/>
                    <h5>Comments:</h5>
                    {comments}
                </div>
            </div>
        </div>
    )
}

export default Card