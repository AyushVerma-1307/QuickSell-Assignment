import React, { useState, useEffect } from "react";
import Group from "./components/Group/Group";
import Column from "./components/Column/Column";
import "./App.css";

function App() {
    const [data, setData] = useState([]);
    const apiUrl = "https://api.quicksell.co/v1/internal/frontend-assignment";
    const [selectedValue, setSelectedValue] = useState("status");
    const [orderingValue, setOrderingValue] = useState("priority");

    const handleSelectedValue = (value1) => {
        setSelectedValue(value1);
        // Save the selected value to local storage
        localStorage.setItem("selectedValue", value1);
    };

    const handleOrderingValue = (value2) => {
        setOrderingValue(value2);
        // Save the ordering value to local storage
        localStorage.setItem("orderingValue", value2);
    };

    useEffect(() => {
        // Load the selected value from local storage when the component mounts
        const storedSelectedValue = localStorage.getItem("selectedValue");
        if (storedSelectedValue) {
            setSelectedValue(storedSelectedValue);
        }

        // Load the ordering value from local storage when the component mounts
        const storedOrderingValue = localStorage.getItem("orderingValue");
        if (storedOrderingValue) {
            setOrderingValue(storedOrderingValue);
        }

        // Load the data from local storage when the component mounts
        const storedData = localStorage.getItem("data");
        if (storedData) {
            setData(JSON.parse(storedData));
        }

        // Fetch data from the API
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                console.log(data);
                // Store the data in local storage for later retrieval
                localStorage.setItem("data", JSON.stringify(data));
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);
    return (
        <>
            <Group
                onSelectedValue={handleSelectedValue}
                onOrderingValue={handleOrderingValue}
            />
            <div className="column-container">
                <Column
                    data={data}
                    selectedValue={selectedValue}
                    orderingValue={orderingValue}
                />
            </div>
        </>
    );
}

export default App;
