import React from 'react'
import { Typography, Image } from 'antd';
import { useLocation } from 'react-router-dom'

// style 
import './QuizDetails.css';
// constants 
const { Text, Title } = Typography;

const QuizDetails = () => {
    const { state } = useLocation();
    console.log("🚀 ~ file: QuizDetails.jsx ~ line 6 ~ QuizDetails ~ state", state)
    return (
        <div className="details">
            <Title>
                QuizDetails
            </Title>
            <Text>
                {state.description}
            </Text>
            <Image  className='pic' src={state.pic} />
        </div>
    )
}

export default QuizDetails