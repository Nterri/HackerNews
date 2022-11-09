import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import useFetching from "../hooks/useFetching";
import NewsService from "../API/NewsService";
import MyLoader from "../components/UI/loader/MyLoader";
import MyButton from "../components/UI/button/MyButton";

const NewsIdPage = () => {
    const params = useParams()
    const [news, setNews] = useState({})
    const [comments, setComments] = useState([])
    const [fetchNewsById, isLoading, error] = useFetching(async () => {
        const response = await NewsService.getById(params.id)
        setNews(response.data)
        let commentsArray = response.data.kids
        for (let i = 0; i < commentsArray.length; i++) {
            commentsArray[i] = (await NewsService.getById(commentsArray[i])).data
            commentsArray[i]["loadComment"] = false
        }
        setComments(commentsArray)
    })
    const [fetchComments, isComLoading, errorCom] = useFetching(async () => {
        let commentsArray = news.kids
        for (let i = 0; i < commentsArray.length; i++) {
            commentsArray[i] = (await NewsService.getById(commentsArray[i].id)).data
            commentsArray[i]["loadComment"] = false
        }
        setComments(commentsArray)
    })

    useEffect(() => {
        fetchNewsById()
        }, [])

    const openComments = async (e, comm) => {
        if (comm.loadComment) return
        comm.loadComment = true
        if (comm.kids) {
            e.target.classList.add('load')
            let commentsArray = comm.kids
            for (let i = 0; i < commentsArray.length; i++) {
                commentsArray[i] = (await NewsService.getById(commentsArray[i])).data
            }
            const comTitle = document.createElement('div')
            comTitle.classList.add('comments')
            comTitle.innerHTML = 'Comments:'
            e.target.classList.remove('load')
            e.target.appendChild(comTitle)
            comm.kids.forEach(com => {
                const comEl = document.createElement('div')
                comEl.classList.add('comment')
                comEl.innerHTML = `<div>Author: <strong>${com.by}</strong> Date: <strong>${com.time}</strong></div><div>"${com.text}"</div>`
                e.target.appendChild(comEl)
            })
        } else {
            e.target.classList.add('no')
        }
    }

    return (
        <div>
            <Link to="/news" className="comeback">
                <MyButton>Go to news</MyButton>
            </Link>
            {error &&
                <div>{error}</div>
            }
            {isLoading
                ?
                <MyLoader title="news" />
                :
                <div>
                    <div className="news__link">Url: <strong><a href={news.url}>{news.url}</a></strong></div>
                    <div className="news__title">Title: <strong>{news.title}</strong></div>
                    <div className="news__time">Date: <strong>{news.time}</strong></div>
                    <div className="news__author">Author: <strong>{news.by}</strong></div>
                    <div className="news__comments">Comments: <strong>{comments.length}</strong></div>
                </div>
            }
            <div className="comments">
                <span>Comments:</span>
                <MyButton onClick={fetchComments}>Update comments</MyButton>
            </div>
            {errorCom &&
            <div>{errorCom}</div>
            }
            {isComLoading || isLoading
                ?
                <MyLoader title="comments" />
                :
                <div>
                    {
                        comments.map(comm =>
                            <div key={comm.id} className="comment" onClick={(e) => openComments(e, comm)}>
                                <div>Author: <strong>{comm.by}</strong> Date: <strong>{comm.time}</strong></div>
                                <div>"{comm.text}"</div>
                                <div className="no-comment"><hr/><strong>No comments</strong></div>
                                <div className="loader">
                                    <MyLoader />
                                </div>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default NewsIdPage;