import React, { useCallback } from 'react'
import { Button, Row, Col, Image, Typography, Divider, Input } from 'antd';
import { registerWithEmailAndPassword, signInWithGoogle } from '../../../utils/firebase/authHelper';
import loginLogo from '../../../assets/images/loginLogo.svg';
import logo from '../../../assets/images/logo.svg';
import { useForm, Controller } from 'react-hook-form';
import useAuth from '../../../utils/hooks/Auth';

// style 
import './SignUp.css';

// constants 
const { Title, Text } = Typography;

const SignUp = () => {
    // hooks 
    const { handleSubmit, control, reset, formState: { errors } } = useForm({});
    const onSubmit = useCallback((data) => {
        console.log("🚀 ~ file: Login.jsx ~ line 17 ~ onSubmit ~ data", data)
        registerWithEmailAndPassword(data.name, data.email, data.password);
    });
    useAuth();
    return (
        <div>
            <Row>
                <Col className='section-one' span={12}>
                    <div className='logo-container'>
                        <Image src={loginLogo} preview={false} />
                        <Text className='text-title'>
                            Welcome to BTI Image Uploader App
                        </Text>
                    </div>
                </Col>
                <Col className='section-two' span={12}>
                    <div className='header-login'>
                        <div className='title-container'>
                            <Title className='title'>
                                Image uploader
                            </Title>
                            <Text className='sub-title'>
                                Upload your images to the cloud
                            </Text>
                        </div>
                        <Divider className='divider' type={'vertical'} />
                        <Image src={logo} preview={false} />
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <Input type={"email"} {...field} />}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => <Input type={"password"} {...field} />}
                            />
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => <Input type={"password"} {...field} />}
                            />
                            <Button htmlType="submit" >
                                sign up
                            </Button>
                        </form>
                        <Button onClick={() => signInWithGoogle()}>
                            sign up with Google
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default SignUp;