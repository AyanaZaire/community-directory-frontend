import React from "react"
// import React, { Component } from 'react';
import { useState } from 'react'
import CardContainer from "./CardContainer"
import Sidebar from "./Sidebar"

function Main() {
    const [allEntries, setEntries] = useState([])
    
    // fetch all entries from database and pass as props to card container     
    React.useEffect(() => {
        fetch("http://localhost:3000/libraries")
        .then(response => response.json())
        .then(entries => setEntries(entries))
    }, [])

    //console.log(allEntries)

    const [displaySidebar, setDisplaySidebar] = useState(false)
    const [libraryId, setlibraryId] = useState("")

    function addComment(event) {
        setDisplaySidebar(prevDisplay => !prevDisplay)
        setlibraryId(event.target.id)
    }

    const [comment, setComment] = React.useState("")

    function handleComment(event) {
        setComment(event.target.value)
    }

    function postComment(event) {
        event.preventDefault()
        setDisplaySidebar(prevDisplay => !prevDisplay)
        fetch(`http://localhost:3000/libraries/${libraryId}/comments`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                body: comment
            })
        })
        .then(response => response.json())
        .then(json => {
            if(!json.error) {
                console.log("posted json", json)
            } else {
                alert(json.error.message)
            }
        })
    }

    return (
        <div class="container">
            <div class="row">
                {/* <h1>Main Component</h1> */}
                <CardContainer entries={allEntries} comment={addComment} className="content"/>
                {displaySidebar && <Sidebar handleComment={handleComment} postComment={postComment}/> }
            </div>
        </div>
    )
}

export default Main