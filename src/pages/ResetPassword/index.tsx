/* eslint-disable camelcase */
import React, { useCallback, useRef } from 'react';
import { FiLock, FiLogIn } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErrors';
import { Container, Content, AnimationContainer, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha Obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');
        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', [
          password,
          password_confirmation,
          token,
        ]);

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na criação de nova senha',
          description:
            'Ocorreu um erro ao tentar realizar criação da nova senha, digite novamente.',
        });
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Criar Nova Senha</h1>

            <Input name="password" icon={FiLock} placeholder="Nova Senha" />
            <Input
              name="password_confirmation"
              icon={FiLock}
              placeholder="Confirmar Senha"
            />

            <Button name="entrar" type="submit">
              Recuperar Senha
            </Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Fazer login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
