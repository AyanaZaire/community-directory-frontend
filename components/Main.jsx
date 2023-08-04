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

    const [displaySidebar, setDisplaySidebar] = useState(false)
    const [libraryId, setlibraryId] = useState("")
    const [displayLibrary, setDisplayLibrary] = useState("")

    function addComment(event, libraryId) {
        setDisplaySidebar(prevDisplay => !prevDisplay)
        setlibraryId(libraryId)
        const currentLibrary = allEntries.find(library => library._id == libraryId)
        setDisplayLibrary(currentLibrary)
    }

    const [comment, setComment] = React.useState("")

    function handleNewComment(event) {
        setComment(event.target.value)
        console.log("adding comment:", comment)
    }

    function postComment(event) {
        event.preventDefault()
        //setDisplaySidebar(prevDisplay => !prevDisplay)
        fetch(`http://localhost:3000/libraries/${libraryId}/comments`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                body: comment
            })
        })
        .then(response => response.json())
        .then(newLibrary => {
            if(!newLibrary.error) {
                console.log(newLibrary);
                // https://scrimba.com/learn/learnreact/notes-app-intro-coea14f76b39cf1bfb7c86de4
                setEntries(oldEntries => oldEntries.map(oldEntry => {
                    if(oldEntry._id == newLibrary._id) {
                        // return {...oldEntry, comments: [...oldEntry.comments, {body: comment}]}
                        return {...newLibrary, comments: [...newLibrary.comments]}
                    } else {
                        return oldEntry
                    }
                }))
                console.log(allEntries);
            } else {
                alert(newLibrary.error.message)
            }
        })
    }

    const [commentId, setCommentId] = useState("")
    const [editButtonClicked, setEditButtonClicked] = useState(false)


    function handleEditButton(event, libraryId, commentId) {
        setEditButtonClicked(true)
        // refactor to pass ids from child: https://scrimba.com/learn/learnreact/notes-app-delete-note-cg8gPwc6
        setlibraryId(libraryId)
        setCommentId(commentId)
        console.log(editButtonClicked, libraryId, commentId);
    }

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
        .then(updatedLibrary => {
            if(!updatedLibrary.error) {
                console.log("posted json", updatedLibrary)
                setEditButtonClicked(prevEdit => !prevEdit)
                // setDisplaySidebar(prevDisplay => !prevDisplay)
                setEntries(oldEntries => oldEntries.map(oldEntry => {
                    if(oldEntry._id == updatedLibrary._id) {
                        // https://stackoverflow.com/questions/71005652/react-state-update-a-nested-array-with-objects-based-on-the-id-when-iterated
                        let tempComments = [...oldEntry.comments]
                        let index = updatedLibrary.comments.findIndex(comment => comment._id == commentId)
                        console.log(index);
                        if(index != -1) {
                            tempComments[index] = {
                                ...tempComments[index],
                                body : editedComment
                            }
                        }
                        return {...oldEntry, comments: tempComments}
                    } else {
                        return oldEntry
                    }
                }))
            } else {
                alert(updatedLibrary.error.message)
            }
        })
    }

    function handleDeleteButton(event, libraryId, commentId) {
        if (libraryId && commentId) {
            console.log("we good brian! we good!");
            handleDelete(event, libraryId, commentId);
        }
    }

    function handleDelete(event, libraryId, commentId) {
        event.stopPropagation()
        console.log(libraryId, commentId);
        fetch(`http://localhost:3000/libraries/${libraryId}/comment/${commentId}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(json => {
            if(!json.error) {
                console.log("empty object", json)
                setEntries(oldEntries => oldEntries.map(oldEntry => {
                    //https://scrimba.com/learn/learnreact/notes-app-delete-note-cg8gPwc6
                    return {...oldEntry, comments: oldEntry.comments.filter(comment => comment._id !== commentId)}
                    // if(oldEntry._id == newLibrary._id) {
                    //     return {...oldEntry, comments: [...oldEntry.comments, {body : comment}]}
                    // } else {
                    //     return oldEntry
                    // }
                }))
            } else {
                alert(json.error.message)
            }
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* <h1>Main Component</h1> */}
                <CardContainer entries={allEntries} comment={addComment} className="content" delete={handleDelete}/>
                {displaySidebar && <Sidebar 
                    newComment = {newComment}
                    editButton={handleEditButton}
                    deleteButton={handleDeleteButton}
                    entries={allEntries}
                    libraryId = {libraryId}
                    displayLibrary = {displayLibrary}
                    handleComment={handleNewComment} 
                    handleEditedComment={handleEditedComment} 
                    postComment={postComment} 
                    editComment={editComment}
                    editButtonClicked = {editButtonClicked}
                    change={editButtonClicked ? handleEditedComment : handleNewComment}
                    submit={editButtonClicked ? editComment : postComment}
                    /> }
            </div>
        </div>
    )
}

export default Main