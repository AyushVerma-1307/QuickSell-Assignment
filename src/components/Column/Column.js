import React from "react";
import "./Column.css";
import Card from "../Card/Card";
import { HiOutlineDotsHorizontal, HiPlus } from "react-icons/hi";

const Column = (props) => {
    const response = props.data;
    const myValue = props.selectedValue;
    //   const orderingValue = props.orderingValue;

    const priorityLabels = {
        4: "Urgent",
        3: "High",
        2: "Medium",
        1: "Low",
        0: "No priority",
    };

    const statusValues = ["Todo", "In progress", "Backlog", "Done", "Canceled"]; // Define all status values

    const priorityValues = [0,4,3,2,1]; // Define all priority values
    const userValues = response.users
        ? response.users.map((user) => user.name)
        : []; // Get all user names

    const renderValues = (values) => {
        return (
            <div className="column">
                {values.map((value, index) => {
                    const filteredTickets = response.tickets
                        ? response.tickets.filter((ticket) => {
                              if (myValue === "status") {
                                  return ticket.status === value;
                              } else if (myValue === "priority") {
                                  return ticket.priority === value;
                              } else if (myValue === "user") {
                                  const userId = response.users.find(
                                      (user) => user.name === value
                                  )?.id;
                                  return ticket.userId === userId;
                              }
                              return null; // Add a default return value to address the linting error
                          })
                        : [];

                    return (
                        <div key={index} className="column-item">
                            <div className="header-top">
                                <div className="icon1">
                                    <img
                                        className="img3"
                                        src="https://cdn-icons-png.flaticon.com/128/8369/8369110.png"
                                        alt="Status Icon"
                                    />
                                </div>
                                <div className="value">
                                    {myValue === "priority"
                                        ? `${priorityLabels[value]} : ${filteredTickets.length}`
                                        : `${value} : ${filteredTickets.length}`}
                                </div>
                                <div className="space"></div>
                                <div className="icon2">
                                    <HiPlus />
                                    <HiOutlineDotsHorizontal />
                                </div>
                            </div>
                            {filteredTickets.map((ticket, ticketIndex) => (
                                <Card
                                    key={ticketIndex}
                                    value={value}
                                    id={ticket.id}
                                    title={ticket.title}
                                    feature={ticket.tag[0]}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="columns-container">
            {myValue === "status" && renderValues(statusValues)}
            {myValue === "priority" && renderValues(priorityValues)}
            {myValue === "user" && renderValues(userValues)}
        </div>
    );
};

export default Column;
