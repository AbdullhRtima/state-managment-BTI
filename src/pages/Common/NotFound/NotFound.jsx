import React, { useCallback } from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    const goBack = useCallback(() => {
        navigate('/');
    }, []);

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button onClick={goBack} type="primary">Back Home</Button>}
        />
    )
};
