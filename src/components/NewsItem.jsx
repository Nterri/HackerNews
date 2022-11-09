import React from 'react';
import {useHistory} from "react-router-dom";

const NewsItem = (props) => {
    const router = useHistory()
    return (
        <div className="news" onClick={() => {router.push(`/news/${props.newsItem.id}`)}}>
            <div className="news__content">
                <div className="news-title">Title: <strong>{props.newsItem.title}</strong></div>
                <div className="news-score">Score: <strong>{props.newsItem.score}</strong></div>
                <div className="news-author">Author: <strong>{props.newsItem.by}</strong></div>
                <div className="news-date">Date: <strong>{props.newsItem.time}</strong></div>
            </div>
        </div>
    );
};

export default NewsItem;