import '@src/renderer/views/auth/index.scss';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message, Col, Modal } from 'antd';
import logo from '@assets/images/logo.png';
import LocalStorageService from '@renderer/shared/localstorage';
import useStoreAuth from '@renderer/cases/auth/store';
import { FormAuth } from '@renderer/interfaces';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { auth, loading, setAuth } = useStoreAuth();

  const success = () => {
    navigate('/workspace');
    messageApi.open({
      type: 'success',
      content: 'Autenticado correctamente',
    });
  };

  useEffect(() => {
    const auth = () => {
      LocalStorageService.getData().auth !== null
        ? navigate('/workspace')
        : false;
      return;
    };

    auth();
  }, []);

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Usuario/Password incorrectos',
    });
  };

  const onFinish = async (values: FormAuth) => {
    const { remenber, ...data } = values;
    const [result, err] = await auth(data);
    result ? success() : error();
    LocalStorageService.saveData({ auth: result });
  };

  return (
    <div className='auth-main'>
      {contextHolder}
      <div className='logo'>
        <img src={logo} alt='' />
      </div>
      <Form
        name='auth'
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name='email'
          rules={[
            { required: true, message: 'Ingrese su dirección de correo!' },
          ]}
        >
          <Input size='large' prefix={<UserOutlined />} placeholder='Correo' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Ingrese su contraseña!' }]}
        >
          <Input
            size='large'
            prefix={<LockOutlined />}
            type='password'
            placeholder='Contraseña'
          />
        </Form.Item>
        <Form.Item>
          <Flex justify='space-between' align='center'>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Recordarme</Checkbox>
            </Form.Item>
            <a href=''>Olvide mi contrasena</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Flex gap='middle' vertical>
            <React.Fragment>
              <Button
                loading={loading}
                size='large'
                block
                type='primary'
                htmlType='submit'
              >
                Entrar
              </Button>
              <p className='text-center'>
                or <a href=''>Crear cuenta!</a>
              </p>
            </React.Fragment>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;
