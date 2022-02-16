import React, { useState, useCallback, useContext, useEffect } from 'react'
import { Button, Row, Col, Image, Typography, Divider, Input } from 'antd';
import { signInWithGoogle, logInWithEmailAndPassword, fetchUserData } from '../../../utils/firebase/authHelper';
import loginLogo from '../../../assets/images/loginLogo.svg';
import logo from '../../../assets/images/logo.svg';
import { useForm, Controller } from 'react-hook-form';
import { getDataLocalStorage, setDataLocalStorage } from '../../../utils/helpers/localStorageHelper';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../utils/hooks/Auth';
import { ACTIONS, GlobalContext } from '../../../utils/context/GlobalContext';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, query, collection, getDocs, where } from '../../../utils/firebase';

// style 
import './Login.css';

// constants 
const { Title, Text } = Typography;

const Login = () => {

    // state 
    const { globalState, dispatch } = useContext(GlobalContext);
    const [loadingFirebase, setLoadingFirebase] = useState(false);

    // hooks 
    const { handleSubmit, control, reset, formState: { errors } } = useForm({});
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    useAuth();

    const onSubmit = useCallback((data) => {
        setLoadingFirebase(true);
        logInWithEmailAndPassword(data.email, data.password);
        setLoadingFirebase(false);
    });

    const onGoogleSignIn = useCallback(async () => {
        setLoadingFirebase(true);
        const data = await signInWithGoogle();
        console.log("🚀 ~ file: SignUp.jsx ~ line 44 ~ onGoogleSignIn ~ data", data)
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
            console.log("🚀 ~ file: SignUp.jsx ~ line 23 ~ onGoogleSignIn ~ data", data)
        }
    }, [user]);

    useEffect(() => {
        if (loading) return;
        if (user) {
            console.log("🚀 ~ file: Login.jsx ~ line 25 ~ Login ~ user", user)
        }
    }, [user, loading]);

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
                                name="email"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => <Input type={"password"} {...field} />}
                            />
                            <Button htmlType="submit" >
                                sign in
                            </Button>
                        </form>
                        <Button onClick={() => onGoogleSignIn()}>
                            sign in with Google
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Login;