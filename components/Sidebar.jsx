import React from "react"
import { useState } from 'react'

function Sidebar(props) {

    // const [changeFunction, setChange] = useState("")
    // const [submitFunction, setSubmit] = useState("")

    // if(props.editButtonClicked) {
    //     setChange(props.handleEditedComment)
    //     setSubmit(props.editComment)
    // } else {
    //     setChange(props.handleComment)
    //     setSubmit(props.postComment)
    // }

    return (
        <div className="col">
            {/* <h1>Sidebar Component</h1> */}
            <form onSubmit={props.submit}>
                <label htmlFor="comment">How was your experience at this library?</label>
                <textarea type="text" name="comment" id="comment" onChange={props.change} /><br />
                <button type="submit">Leave Comment</button>
            </form>
        </div>
    )
}

export default Sidebar