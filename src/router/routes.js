import News from "../pages/News";
import NewsIdPage from "../pages/NewsIdPage";

const routes = [
    {path: '/news', component: News, exact: true},
    {path: '/news/:id', component: NewsIdPage, exact: true},
]

export default routes