import React from 'react'



const menu = [
    {id: 7, text: "Configuration", parent: 5},
    {id: 1, text: "Introduction", parent: 0},
    {id: 10, text: "Services", parent: 8},
    {id: 3, text: "Chapter 2", parent: 1},
    {id: 11, text: "Endpoints", parent: 8},
    {id: 5, text: "Getting Started", parent: 0},
    {id: 6, text: "Installation", parent: 5},
    {id: 2, text: "Chapter 1", parent: 1},
    {id: 9, text: "Core", parent: 8},
    {id: 8, text: "API", parent: 5},
    {id: 12, text: "About", parent: 0},
    {id: 4, text: "Chapter 3", parent: 1},
]
class BookPractice extends React.Component {
    constructor() {
        super();
        this.state = {
            book: menu
        }
    }

    render() {

        return (
            <ul>
                {
                    this.state.book.map(element => {
                        return (

                            <li>
                                {element}
                            </li>
                        );
                    })
                }
            </ul>

        )

    }


}
export default BookPractice;
