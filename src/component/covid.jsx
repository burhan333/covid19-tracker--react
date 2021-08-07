import React, { useState, useEffect } from "react";

const Covid = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState()
    const [hobbies, setHobbies] = useState(['cricket', 'football'])
    const [city, setCity] = useState()
    const [newCases, setNewCases] = useState()
    const [total, setTotal] = useState()
    const [death, setDeath] = useState()
    const [data, setData] = useState('')
    const temp = {'sports': 'baseball'}

    function func() {
        setHobbies(prevState => [...prevState, temp])
    }

    // console.log('hobbies', hobbies)


    useEffect(() => {
        fetch("https://api.covid19api.com/summary")
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then((data) => {
            setData(data.currentDateTime)
            setNewCases(data.Global.NewConfirmed)
            setTotal(data.Global.TotalConfirmed)
            setDeath(data.Global.TotalDeaths)
            console.log(data)
        })
        .catch((error) => console.log(error))
    })

    return(
        // <button onClick={func}>click</button>
        <>
            <h1>NewConfirmed {newCases}</h1>
            <h1>TotalConfirmed {total}</h1>
            <h1>TotalDeaths. {death}</h1>
        </>
    );
};

export default Covid;
