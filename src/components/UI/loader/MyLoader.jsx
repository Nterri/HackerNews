import React from 'react';
import classes from './MyLoader.module.css'

const MyLoader = ({title}) => {
    let text = 'Loading...'
    if (title) text = `Loading ${title}...`

    return (
        <div className={classes.block}>
            <div className={classes.block__text}>
                {text}
            </div>
            <div className={classes.lds_roller}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default MyLoader;