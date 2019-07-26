import React from 'react';
import './Loader.css';

const Loader = (props) => {
    // return (
    //     <div className="loader">
    //         <div className="lds-roller">
    //             <div/>
    //             <div/>
    //             <div/>
    //             <div/>
    //             <div/>
    //             <div/>
    //             <div/>
    //             <div/>
    //         </div>
    //     </div>
    // )
    return (
        <div className="preloader d-flex justify-content-center align-items-center">
            <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
};
export default Loader;