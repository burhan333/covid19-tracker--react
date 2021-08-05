import { getDefaultNormalizer } from "@testing-library/react";
import React, { useState } from "react";

const Covid = () => {
    const [data, setData] = useState("")

    const getData = () => {
        fetch("https://api.covid19api.com/summarya")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.log("ERROR");
                }
            })
            .then((data) => console.log(data.Countries[1].TotalConfirmed))
            .catch((error) => console.log("Error"))
    }


    return null;
};

export default Covid;
