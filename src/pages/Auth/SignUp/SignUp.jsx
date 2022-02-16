import React, { useCallback, useEffect, useState } from 'react'
import { Button, Row, Col, Image, Typography, Divider, Input } from 'antd';
import { registerWithEmailAndPassword, signInWithGoogle, fetchUserData } from '../../../utils/firebase/authHelper';
import loginLogo from '../../../assets/images/loginLogo.svg';
import logo from '../../../assets/images/logo.svg';
import { useForm, Controller } from 'react-hook-form';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../../utils/firebase';
import { useNavigate } from 'react-router-dom';

// style 
import './SignUp.css';
import { setDataLocalStorage } from '../../../utils/helpers/localStorageHelper';

// constants 
const { Title, Text } = Typography;

const SignUp = () => {
    // state 
    const [loadingFirebase, setLoadingFirebase] = useState(false);

    // hooks 
    const { handleSubmit, control, reset, formState: { errors } } = useForm({});
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const onSubmit = useCallback(async (data) => {
        setLoadingFirebase(true);
        await registerWithEmailAndPassword(data.name, data.email, data.password);
        setLoadingFirebase(false);
    });

    const onGoogleSignIn = useCallback(async () => {
        setLoadingFirebase(true);
        const data = await signInWithGoogle();
        if (data) {
            setDataLocalStorage('user-data', {
                name: data.displayName,
                email: data.email,
                uid: data.uid,
                photoURL: data.photoURL,
                authProvider: "google",
                accessToken: data.accessToken
            });
            navigate('/');
            setLoadingFirebase(false);
        }
    }, [user]);

    // useEffect(() => { // TODO: enhance this logic 
    //     if (user) {
    //     }
    // }, [user]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoadingFirebase(true);
            const userData = await fetchUserData(user);
            if (userData) {
                setDataLocalStorage('user-data', { ...userData, accessToken: user.accessToken });
                setLoadingFirebase(false)
                navigate('/');
            } else {
                alert('Something went wrong, please try again later.')
                setLoadingFirebase(false)
            }
        };
        if (user) {
            fetchUser();
        }
    }, [user]);

    if (loadingFirebase) {
        return <div>
            <Title level={3}>Loading...</Title>
        </div>
    };

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
                        <Button onClick={() => onGoogleSignIn()}>
                            sign up with Google
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default SignUp;