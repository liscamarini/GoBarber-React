import React, { useCallback, useRef, useContext } from 'react';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { AuthContext } from '../../context/AuthContext';
import getValidationErros from '../../utils/getValidationErrors';
import {Container, Content, Background} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import { Form } from '@unform/web';

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { singnIn } = useContext(AuthContext);
    
    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'Senha Obrigatória'),
            });
            
            await schema.validate(data, {
                abortEarly: false,
            });

            singnIn();
        } catch (err){
            console.log(err);
            
            const errors = getValidationErros(err);
            
            formRef.current?.setErrors(errors);
        } 
        
    },
    [singnIn]);
    
    return (
        <Container>
        <Content>
            <img src={logoImg} alt="GoBarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu logon</h1>
        
                <Input name="email" icon={FiMail} placeholder="E-mail" />
                <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
        
                <Button name="entrar" type="submit">Entrar</Button>
                <a href="forgot">Esqueci minha senha</a>
            </Form>
        <a href="login">
            <FiLogIn />
            Criar Contar
        </a>
        </Content>
        <Background />
        </Container>
    );
}
        
        
        
        
    export default SignIn;