import React from "react";
import DHome from "./DHome";
import Home from "./Home";
import './MainHome.css'
import LoadingSpinner from "../../global/LoadingSpinner";

const MainHome = () => {
    return(
        <div className="main-home-area">
            {/* <LoadingSpinner/> */}
            <div className="mobile">
                <Home/>
            </div>
            <div className="desktop">
                <DHome/>
            </div>
        </div>
    )
}

export default MainHome;