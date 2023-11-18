import React from "react";
import "./Card.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { VscCircleLargeFilled } from "react-icons/vsc";
const Card = (props) => {
    return (
        <div className="card">
            <div className="top-row">
                <div className="item">
                    {props.id}
                    <img
                        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                        className="profile"
                        alt="profile"
                    ></img>
                </div>
            </div>
            <div className="middle">
                <div className="item">{props.title}</div>
            </div>
            <div className="bottom-row">
                <div className="available-icon">
                        <HiOutlineDotsHorizontal />
                </div>

                <div className="feature">
                    <div className="item">
                      <VscCircleLargeFilled />{" "}
                        {props.feature}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
