import React from "react"

function Sidebar(props) {

    return (
        <div className="col">
            {/* <h1>Sidebar Component</h1> */}
            <form onSubmit={props.postComment}>
                <label htmlFor="comment">How was your experience at this library?</label>
                <textarea type="text" name="comment" id="comment" onChange={props.handleComment} /><br />
                <button type="submit">Leave Comment</button>
            </form>
        </div>
    )
}

export default Sidebar