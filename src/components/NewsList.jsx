import React from 'react';
import NewsItem from "./NewsItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import MyButton from "./UI/button/MyButton";

const NewsList = ({news, title, update}) => {

    if (!news.length) {
        return (
            <h1 style={{textAlign: 'center', marginTop: '10px'}}>No found news</h1>
        )
    }

    return (
        <div>
            <h1 className="title-list">
                <span>{title}</span>
                <MyButton onClick={update}>Update</MyButton>
            </h1>
            <TransitionGroup>
                {news.map(newsItem =>
                    <CSSTransition
                        key={newsItem.id}
                        timeout={500}
                        classNames="news"
                    >
                        <NewsItem newsItem={newsItem} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default NewsList;