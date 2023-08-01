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

    function handleNewComment(event) {
        setComment(event.target.value)
        console.log("adding comment:", comment)
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

    const [commentId, setCommentId] = useState("")
    const [editButtonClicked, setEditButtonClicked] = useState(false)

    const editButton = document.getElementById("edit")

    React.useEffect(() => {
        if (editButton) {
            editButton.addEventListener("click", (event) => {
                setEditButtonClicked(prevEdit => !prevEdit)
                setDisplaySidebar(prevDisplay => !prevDisplay) 
                setlibraryId(event.target.getAttribute("datalibrary"))
                setCommentId(event.target.getAttribute("datacomment"))
            })
        }
    }, [editButton])

    const [editedComment, setEditedComment] = React.useState("")

    function handleEditedComment(event) {
        console.log(event.target.value);
        setEditedComment(event.target.value)
        console.log("edited comment:", editedComment)
    }

    function editComment(event) {
        event.preventDefault()
        console.log(libraryId, commentId);
        fetch(`http://localhost:3000/libraries/${libraryId}/comment/${commentId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                body: editedComment
            })
        })
        .then(response => response.json())
        .then(json => {
            if(!json.error) {
                console.log("posted json", json)
                setEditButtonClicked(prevEdit => !prevEdit)
                setDisplaySidebar(prevDisplay => !prevDisplay)
            } else {
                alert(json.error.message)
            }
        })
    }

    return (
        <div className="container">
            <div className="row">
                {/* <h1>Main Component</h1> */}
                <CardContainer entries={allEntries} comment={addComment} className="content"/>
                {displaySidebar && <Sidebar 
                    handleComment={handleNewComment} 
                    handleEditedComment={handleEditedComment} 
                    postComment={postComment} 
                    editComment={editComment}
                    change={editButtonClicked ? handleEditedComment : handleNewComment}
                    submit={editButtonClicked ? editComment : postComment}
                    /> }
            </div>
        </div>
    )
}

export default Main