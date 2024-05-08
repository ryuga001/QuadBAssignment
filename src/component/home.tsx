import axios from "axios"
import { useEffect, useState } from "react"
import Card from "./card"

interface ShowType {
    id: number,
    imageUrl?: string,
    name: string,
    rating: number,
}

const Home = () => {
    const [shows, setShows] = useState<Array<ShowType>>([])
    useEffect(() => {
        const fetchData = async () => {

            await axios.get("https://api.tvmaze.com/search/shows?q=all").then((res) =>
                setShows(res.data.map((item: any) => ({
                    id: item.show.id,
                    imageUrl: item.show.image?.original,
                    name: item.show.name,
                    rating: item.show.rating.average
                })))
            ).catch(err => {
                console.error("Error fetching data:", err);
            })
        }
        fetchData();
    }, [])
    return (
        <div className="HomeContainer">
            {shows.map((item: ShowType) => (
                <Card id={item.id} imageUrl={item.imageUrl} rating={item.rating} name={item.name} />
            ))}
        </div >
    )
}

export default Home