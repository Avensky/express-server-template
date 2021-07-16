import React from 'react';
import classes from './Home.module.css';

const Home = () => {
    return(
        <div className={['card', classes.Home].join(' ')}>
            <div className="container">
                <div className="page-header text-center">
                    <h1>Home</h1>
                </div>
            </div>

        </div>
    )  
}

export default Home;