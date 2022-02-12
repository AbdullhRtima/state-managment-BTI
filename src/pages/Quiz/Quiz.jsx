import React, { useCallback, useMemo } from 'react'
import QuizCard, { dataTest } from '../../components/QuizCard';
import { Outlet, useNavigate } from 'react-router-dom';

// style
import './Quiz.css';

// constants
const cardsData = [
    {
        id: 1,
        pic: "https://i.picsum.photos/id/1001/5616/3744.jpg?hmac=38lkvX7tHXmlNbI0HzZbtkJ6_wpWyqvkX4Ty6vYElZE",
        description: "this is card 1",
    },
    {
        id: 2,
        pic: "https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY",
        description: "this is card 2",
    },
    {
        id: 3,
        pic: "https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y",
        description: "this is card 3",
    },
];
const Quiz = () => {
    const navigate = useNavigate();

    const goTo = useCallback((data) => {
        navigate(`details/${data.id}`, { state: data });
    }, [])
    
    const renderCards = useMemo(() => {
        return cardsData.map((card) => {
            return (
                <QuizCard key={card.id} data={card} goTo={goTo} />
            )
        })
    }, []);

    return (
        <div className='container'>
            {renderCards}
            <Outlet />
        </div>
    )
}

export default Quiz