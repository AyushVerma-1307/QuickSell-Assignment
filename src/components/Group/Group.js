import React, { useState, useRef, useEffect } from "react";
import "./Group.css";
import { GiSettingsKnobs } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";

const Group = (props) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [statusDropdownVisible, setStatusDropdownVisible] = useState(false);
    const [priorityDropdownVisible, setPriorityDropdownVisible] =
        useState(false);
    const [selectedGrouping, setSelectedGrouping] = useState("");
    const [selectedOrdering, setSelectedOrdering] = useState("");

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDisplayMenu(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const toggleDisplayMenu = () => {
        setDisplayMenu(!displayMenu);
    };

    // (Rest of the component code remains the same)
    const toggleStatusDropdown = () => {
        setStatusDropdownVisible(!statusDropdownVisible);
        // Hide the priority dropdown when status is clicked
        setPriorityDropdownVisible(false);
    };

    const togglePriorityDropdown = () => {
        setPriorityDropdownVisible(!priorityDropdownVisible);
        // Hide the status dropdown when priority is clicked
        setStatusDropdownVisible(false);
    };

    const handleChange = (field, action) => {
        setSelectedGrouping(action); // Update the selected option when an option is clicked
        setStatusDropdownVisible(false); // Close status dropdown
        setPriorityDropdownVisible(false); // Close priority dropdown
        props.onSelectedValue(field);
    };

    const handlePriorityChange = (field, action) => {
        if (action === "Title") {
            action = "Title"; // Update the action to represent sorting by title
        }
        setSelectedOrdering(action);
        setStatusDropdownVisible(false); // Close status dropdown
        setPriorityDropdownVisible(false); // Close priority dropdown
        props.onOrderingValue(field, action); // Pass the field and action to the parent component
    };

    return (
        <div className="bg-color">
            <button className="display-box" onClick={toggleDisplayMenu}>
                <div className="main-button-cont">
                    <div className="main-button-prim">
                        <GiSettingsKnobs />
                    </div>

                    <div className="main-button-text">Display</div>

                    <div className="main-button-prim">
                        <RiArrowDropDownLine />
                    </div>
                </div>
            </button>

            {displayMenu && (
                <div ref={dropdownRef} className="dropdown-menu">
                    <div className="field">
                        <div className="grouping">Grouping</div>
                        <button onClick={toggleStatusDropdown}>
                            <div className="main-button-cont">
                                <div className="main-button-text">
                                    {" "}
                                    {selectedGrouping || "Status"}
                                </div>

                                <div className="main-button-prim">
                                    <RiArrowDropDownLine />
                                </div>
                            </div>
                        </button>
                        {statusDropdownVisible && (
                            <div className="sub-dropdown">
                                <button
                                    onClick={() =>
                                        handleChange("status", "Status")
                                    }
                                >
                                    Status
                                </button>
                                <button
                                    onClick={() => handleChange("user", "User")}
                                >
                                    User
                                </button>
                                <button
                                    onClick={() =>
                                        handleChange("priority", "Priority")
                                    }
                                >
                                    {" "}
                                    Priority
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="field">
                        <div className="ordering">Ordering</div>
                        <button onClick={togglePriorityDropdown}>
                            <div className="main-button-cont">
                                <div className="main-button-text">
                                    {" "}
                                    {selectedOrdering || "Priority"}
                                </div>

                                <div className="main-button-prim">
                                    <RiArrowDropDownLine />
                                </div>
                            </div>
                        </button>
                        {priorityDropdownVisible && (
                            <div className="sub-dropdown">
                                <button
                                    onClick={() =>
                                        handlePriorityChange(
                                            "priority",
                                            "Priority"
                                        )
                                    }
                                >
                                    Priority
                                </button>
                                <button
                                    onClick={() =>
                                        handlePriorityChange("title", "Title")
                                    }
                                >
                                    Title
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Group;
