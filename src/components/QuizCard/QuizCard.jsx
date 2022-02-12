import React from 'react'
import { Card } from 'antd';


//constants 
const { Meta } = Card;
export const data = {
    test: " test"
}
const QuizCard = ({ data, goTo }) => {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={data.pic} />}
            onClick={() => goTo(data)}
        >
            <Meta title="This is Quiz" description={data.description} />
        </Card>
    )
}

export default QuizCard;