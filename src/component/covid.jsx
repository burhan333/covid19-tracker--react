import React, { useState, useEffect } from "react";
import cases from '../images/diagnosed-cases.png';
import deaths from '../images/deaths.png'
import recovered from '../images/recovered.png'

const Covid = () => {
    const [newCases, setNewCases] = useState()
    const [totalCases, setTotalCases] = useState()
    const [newDeath, setNewDeath] = useState()
    const [totalDeath, setTotalDeath] = useState()
    const [totalRecovery, setTotalRecovery] = useState()
    const [global, setGlobal] = useState(true)
    const [isLoading, setIsLoading] = useState(true)


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
            if (global) {
                setNewCases((data.Global.NewConfirmed))
                setTotalCases((data.Global.TotalConfirmed))
                setNewDeath((data.Global.NewDeaths))
                setTotalDeath((data.Global.TotalDeaths))
                setTotalRecovery((totalCases - totalDeath))
                setIsLoading(false)
            }
            else {
                setNewCases((data.Countries[129].NewConfirmed))
                setTotalCases((data.Countries[129].TotalConfirmed))
                setNewDeath((data.Countries[129].NewDeaths))
                setTotalDeath((data.Countries[129].TotalDeaths))
                setTotalRecovery((totalCases - totalDeath))
                setIsLoading(false)
            }
        })
        .catch((error) => console.log(error))
    })

    const handleClick = () => {
        if (global) {
            setGlobal(false)
            setIsLoading(true)
        }
        else {
            setGlobal(true)
            setIsLoading(true)
        }
    }

    return(
        <>
            <h1 className="title">Covid-19 Tracker</h1>
            <div className="buttons">
                {global && <button onClick={handleClick} disabled>GLOBAL</button>}
                {!global && <button onClick={handleClick}>GLOBAL</button>}
                {!global && <button onClick={handleClick} disabled>PAKISTAN</button>}
                {global && <button onClick={handleClick}>PAKISTAN</button>}
            </div>
            <div className="body">
                <div className="card cases">
                    <div className="head">
                        <h3>Total Cases</h3>
                        <img src={cases}/>
                    </div>
                    {isLoading && <h1>Loading...</h1>}
                    {!isLoading && <h1>{totalCases.toLocaleString()}</h1>}
                </div>
                <div className="card cases">
                    <div className="head">
                        <h3>New Cases</h3>
                        <img src={cases}/>
                    </div>
                    {isLoading && <h1>Loading...</h1>}
                    {!isLoading && <h1>{newCases.toLocaleString()}</h1>}
                </div>
                <div className="card deaths">
                    <div className="head">
                        <h3>Total Deaths</h3>
                        <img src={deaths}/>
                    </div>
                    {isLoading && <h1>Loading...</h1>}
                    {!isLoading && <h1>{totalDeath.toLocaleString()}</h1>}
                </div>
                <div className="card deaths">
                    <div className="head">
                        <h3>New Deaths</h3>
                        <img src={deaths}/>
                    </div>
                    {isLoading && <h1>Loading...</h1>}
                    {!isLoading && <h1>{newDeath.toLocaleString()}</h1>}
                </div>
                <div className="card recovery">
                    <div className="head">
                        <h3>Total Recoveries</h3>
                        <img src={cases}/>
                    </div>
                    {isLoading && <h1>Loading...</h1>}
                    {!isLoading && <h1>{totalRecovery.toLocaleString()}</h1>}
                </div>
            </div>
            <div className="body">

            </div>
            <div className="foot">
                <p>NOTE: This App is Made Using <a href="https://documenter.getpostman.com/view/10808728/SzS8rjbc" target="_blank">This</a> API The Data will keep on updated until this API is being updated by its contributors</p>
            </div>
        </>
    );
};

export default Covid;
