import { useNavigate } from "react-router-dom"

interface PropsType {
    id: number,
    name: string,
    rating: number,
    imageUrl?: string,
}


const Card = ({ id, name, rating, imageUrl }: PropsType) => {

    const navigate = useNavigate();
    return (
        <div className="CardContainer" onClick={() => navigate(`/${id}`)}>
            <img src={imageUrl} alt="" />
            <div>
                <h4>{name}</h4>
                <span>{rating}</span>
            </div>
        </div>
    )
}

export default Card