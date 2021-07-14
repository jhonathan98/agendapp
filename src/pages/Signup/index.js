import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { LinkTo } from "../../components/LinkTo";
import { useForm } from "react-hook-form";
import { FormGroup, PageWrapper } from "../../globalStyles";
import { LogoWrapper, TopLink } from "../Signin/styles";
import {LabelError} from '../../globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { RegisterTitle } from "./styles";
import { fetchCreateUsers } from "../../store/user/userActions";

export const Signup = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);
    const [msj, setMsj] = useState('');

    const {
        register,
        handleSubmit,
        formState: {
        errors,
        isValid
        }
    } = useForm({ mode: 'onChange' });

    const onSubmitRegister = (data) => {
        console.log("data form register", data);
        dispatch(fetchCreateUsers(data));
        if(Object.keys(userData.singleUser).length === 0 && userData.error == 'error '){
            setMsj('Usuario'+userData.singleUser.name+'registrado correctamente');
        }
    };

    return (
        <PageWrapper>
            <TopLink>
                <LinkTo text="Sign in" url="/" />
            </TopLink>
            <LogoWrapper>
                <img src="./assets/logo-color.png" alt="logo" />
            </LogoWrapper>
            <RegisterTitle>Register user</RegisterTitle>
            {
                userData.error && <LabelError>{userData.error}</LabelError>
            }
            <form onSubmit={handleSubmit(onSubmitRegister)}>
                <FormGroup>
                <Input 
                    register={register} 
                    name="name" 
                    rules={{ 
                    required: true,
                    minLength: 8 
                    }}
                    label="Full name" 
                    type="text" 
                    placeholder="Enter your full name" 
                />
                {   errors.email?.type === "required" && <LabelError>Field required</LabelError> }
                { errors.name?.type === 'minLength' && <LabelError>Min Length 8 characters</LabelError> }
                </FormGroup>
                <FormGroup>
                <Input 
                    register={register} 
                    name="email" 
                    rules={{ 
                    required: true ,
                    // eslint-disable-next-line
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    }}
                    label="Email address" 
                    type="email" 
                    placeholder="Enter your email" 
                />
                {   errors.email?.type === "required" && <LabelError>Field required</LabelError> }
                {   errors.email?.type === "pattern" && <LabelError>Email is not valid</LabelError> }
                </FormGroup>
                <FormGroup>
                <Input 
                    register={register} 
                    name="password" 
                    rules={{ required: true, minLength: 6 }}
                    label="Password" 
                    type="password" 
                    placeholder="Enter your password" 
                />
                { errors.password?.type === 'required' && <LabelError>Field required</LabelError> }
                { errors.password?.type === 'minLength' && <LabelError>Min Length 6 characters</LabelError> }
                </FormGroup>
                <Button disabled={!isValid} type="submit" text={ userData.loading ? "Cheking..." : "Sign up" } />
                {
                    msj == '' ? '':<LabelError>{msj}</LabelError> 
                }                
            </form>
        </PageWrapper>
    );
}
