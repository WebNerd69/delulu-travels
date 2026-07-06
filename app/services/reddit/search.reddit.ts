import formatQuery from "@/app/utils/formatQuery";
import axios from "axios";
import REDDIT_POST_TYPE from "@/app/types/redditPosts.type";


const getRedditPosts = async (query: string) => {
    const q = formatQuery(query);

    try {
        const res = await axios.get(
            `https://api.redditapis.com/api/reddit/search?q=${q}&sort=relevance&nsfw=no&limit=10`,
            {
                headers: { Authorization: `Bearer ${process.env.REDDIT_SCRAPER_API_KEY}` },
            },
        );

        const data = res.data.posts.map((item:REDDIT_POST_TYPE, index:number)=>(
          {
               index,
               source_url: item.url,
               author: item.author,
               title: item.title,
               text: item.text,
               subreddit: item.subreddit,
          }
        ))
        return data
    } catch (error) {
        console.log(error);
    }
};

export default getRedditPosts