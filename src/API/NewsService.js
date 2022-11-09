import axios from "axios";

export default class NewsService {
    static async getAllNews() {
        try {
            const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
            let news = []
            for (let i = 0; (i < 100 && i < response.data.length); i++) {
                const newsItem = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${response.data[i]}.json?print=pretty`)
                news.push(newsItem.data)
            }
            return news
        } catch (e) {
            console.log(e)
        }
    }

    static async getById(id) {
        try {
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            return response
        } catch (e) {
            console.log(e)
        }
    }
}