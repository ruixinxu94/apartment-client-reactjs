import React from "react";
import {Table} from "reactstrap";
import {dark} from "@material-ui/core/styles/createPalette";
import {connect} from "react-redux";
import {Room} from "./Room";
import {loadRooms} from "./actions/rooms.action";


class StudioRooms extends React.Component {

    componentDidMount() {
        this.props.loadRooms();
    }

    search = (filterstring) => {
        const {rooms} = this.props;
        let filtered = [];
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].type.toLowerCase().startsWith(filterstring.toLowerCase())) {
                filtered.push(rooms[i]);
            }
        }
        return filtered;
    }

    render() {

        return (
            <div>
                <ul>
                    <Table responsive>
                        <thead className={dark}>
                        <th>Room</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Status</th>
                        </thead>

                        <tbody>
                        {
                            this.search("studio").map((room) => {
                                return (
                                    <tr key={room.id}>


                                        <td>
                                            <Room room={room.id}/>
                                        </td>
                                        <td>
                                            <Room room={room.type}/>
                                        </td>
                                        <td>
                                            <Room room={room.price}/>
                                        </td>
                                        <td>
                                            <Room room={room.user == null ? "vacant" : "occupied"}/>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </ul>
            </div>


        )


    }
}

function mapStateToProps(appState) {
    return {
        rooms: appState.rooms
    };
}

export default connect(mapStateToProps, {loadRooms})(StudioRooms)
