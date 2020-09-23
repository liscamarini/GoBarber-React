import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import {useToast} from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErrors';
import {Container, Content, AnimationContainer, Background} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';


interface SigninFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn} = useAuth();
    const { addToast } = useToast();
    const history = useHistory();
    
    const handleSubmit = useCallback(
        async (data: SigninFormData) => {
            try {
                formRef.current?.setErrors({});
                
                const schema = Yup.object().shape({
                    email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                    password: Yup.string().min(6, 'Senha Obrigatória'),
                });
                
                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({
                    email: data.email,
                    password: data.password,
                });

                history.push('/dashboard');

            } catch (err){
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErros(err);
                
                    formRef.current?.setErrors(errors);

                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro na autenticação',
                    description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
                });
            }
        }, [signIn, addToast, history]);
    
    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>
                    
                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    
                        <Button name="entrar" type="submit">Entrar</Button>
                        <a href="forgot">Esqueci minha senha</a>
                    </Form>
                    <Link to="/signup">
                        <FiLogIn />
                        Criar Contar
                    </Link>
                </AnimationContainer>
            </Content>
        <Background />
        </Container>
    );
}
        
        
        
        
    export default SignIn;