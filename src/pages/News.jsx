import React, {useEffect, useState} from 'react'
import NewsList from "../components/NewsList";
import NewsService from "../API/NewsService";
import MyLoader from "../components/UI/loader/MyLoader";
import useFetching from "../hooks/useFetching";
import useSorted from "../hooks/useSorted";

function News() {
    const [news, setNews] = useState([])
    const [filter, setFilter] = useState('time')
    const sortedNews = useSorted(news, filter)

    let update = null
    const [fetchNews, isNewsLoading, newsError] = useFetching(async () => {
        if (update) clearInterval(update)
        const response = await NewsService.getAllNews()
        setNews(response)
        update = setInterval(fetchNews, 60000)
    })

    useEffect(() => {
        fetchNews()
    }, [])

    return (
        <div className="App">
            {newsError &&
            <h1>Error: ${newsError}</h1>
            }
            {isNewsLoading
                ?
                <MyLoader title="news" />
                :
                <NewsList news={sortedNews} update={fetchNews} title={'Hacker News'} />
            }
        </div>
    );
}

export default News;
