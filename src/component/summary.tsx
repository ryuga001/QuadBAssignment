import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface showDataType {
    id?: number,
    summary: string,
    image?: string,
    language?: string,
    name?: string,
}
interface formDataType {
    showName?: string,
    username?: string,
    email?: string,
    language?: string,
}
const Summary = () => {
    const { id } = useParams();
    const [showData, setShowData] = useState<showDataType>();
    useEffect(() => {
        const fetchData = async () => {

            await axios.get("https://api.tvmaze.com/search/shows?q=all").then((res) => {
                const data = res.data.find((e: any) => e.show.id === Number(id))
                setShowData({
                    id: data.show.id,
                    summary: data.show.summary,
                    image: data.show.image.original,
                    name: data.show.name,
                    language: data.show.language
                })
            }
            ).catch(err => {
                console.error("Error fetching summary data:", err);
            })
        }
        fetchData();
    }, [])
    const [openForm, setOpenForm] = useState<boolean>(false);
    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        const open = localStorage.getItem('open');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
        if (open) {
            setOpenForm(true)
        }
    }, []);
    const [formData, setFormData] = useState<formDataType>();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        localStorage.setItem('formData', JSON.stringify(
            {
                ...formData,
                [name]: value
            }
        ))
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Ticket Booked!');
        setOpenForm(false);
        localStorage.removeItem('open')
        localStorage.removeItem('formData')
    }
    return (
        <div className="SummaryContainer" >

            <main>
                <img src={showData?.image} alt='poster' />
            </main>

            <aside>

                {!openForm ? <><h1>Summary</h1>
                    {showData && <div
                        dangerouslySetInnerHTML={{ __html: showData?.summary }}
                    >

                    </div>}
                    <button onClick={() => {
                        setOpenForm(true)
                        localStorage.setItem('open', "true");
                    }}>Book Ticket</button>


                </>
                    : <div className="modalContainer">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <button className="close" onClick={() => {
                                    setOpenForm(false)
                                    localStorage.removeItem('open')
                                }}>X</button>
                            </div>
                            <div>
                                <input disabled={true} value={showData?.name} />
                            </div>
                            <div>
                                <input disabled={true} value={showData?.language} />
                            </div>
                            <div>
                                <label htmlFor="username">
                                    Username:
                                </label>
                                <input type="text" id="username" name="username" value={formData?.username} onChange={(e) => handleChange(e)} />
                            </div>



                            <div>
                                <label htmlFor="email">
                                    Email:
                                </label>
                                <input type="text" id="email" name="email" value={formData?.email} onChange={(e) => handleChange(e)} />

                            </div>
                            <button type="submit">Book</button>

                        </form>
                    </div>
                }
            </aside >

        </div >

    )
}

export default Summary