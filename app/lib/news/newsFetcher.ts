import newsType from "@/app/types/news.type";
import formatDate from "@/app/utils/formatDate";
import axios from "axios";

const newsArr: newsType[] = [];

const getNews = async ({ lat, long }: { lat: number; long: number }) => {
    try {
        const today = new Date();

        const twoWeeksAgo = new Date(today);
        twoWeeksAgo.setDate(today.getDate() - 14);

        const to = formatDate(today);
        const from = formatDate(twoWeeksAgo);

        const response = await axios.get(
            `https://api.perigon.io/v1/articles/all?language=en&from=${from}&to=${to}&category=Politics%2CEnvironment%2CTravel%2CWeather&topic=Protests%2CDemonstrations%2CPolitical%20Unrest%2CStrikes%2CGovernment%20Policy%2CRoad%20Closures%2CTraffic%2CPublic%20Transport%2CTravel%20Disruptions%2CFlight%20Delays%2CFlight%20Cancellations%2CAirline%20Disruptions%2CBorder%20Closures%2CTravel%20Warnings%2CFlooding%2CHeavy%20Rainfall%2CSevere%20Weather%2CStorms%2CCyclones%2CLandslides%2CWildfires%2CEarthquakes%2CDisaster%20Response%2CPower%20Outages&medium=Article%2CVideo&lat=${lat}&lon=${long}&maxDistance=50&sortBy=date&showReprints=false&showNumResults=true&page=0&size=25&apiKey=${process.env.LOCAL_NEWS_API_KEY}`,
        );

        response.data.articles.map((item: any, index: number) => {
            newsArr.push({
                index,
                date: item.refreshDate.split("T")[0],
                title: item.title,
                summary: item.summary,
                shortSummary: item.shortSummary,
                url: item.url,
                imageURL: item.imageURL,
            });
        });
        // console.log(newsArr)
        return newsArr;
    } catch (error) {
        console.log(error);
    }
};

export default getNews;
