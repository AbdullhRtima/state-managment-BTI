import React from 'react';
import Uploader from '../../components/ImageUploader';
import Layout from '../../components/Layout';

const ImageUploader = () => {
    return (
        <Layout isAuth={true}>
            <Uploader />
        </Layout>
    )
};

export default ImageUploader;
