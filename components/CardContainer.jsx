import React from "react"
import Card from "./Card"

function CardContainer(props) {
    //console.log(props.entries)
    const cards = props.entries.map(entry => {
        return <Card key={entry._id} entry={entry} comment={props.comment}/>
    })

    return (
        <section className="col-8">
            {/* <h2>Card Container Component</h2> */}
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {cards}
            </div>
        </section>
    )
}

export default CardContainer