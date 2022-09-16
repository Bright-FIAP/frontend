import * as React from 'react';
import { Alert } from 'react-native';
import userService from '../services/UserService';

export const useLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const submit = navigation => {
    const nextErrors = {};
    if (!ValidateEmail(email)) {
      nextErrors.email = 'Informe um email válido.';
    }
    if (email.length === 0) {
      nextErrors.email = 'Preencha este campo.';
    }
    if (password.length === 0) {
      nextErrors.password = 'Preencha este campo.';
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return null;
    }

    let data = {
      email: email,
      senha: password,
    };

    userService.login(data).then(response => {
      const resetAction = navigation.reset({
        index: 0,
        actions: [
          navigation.navigate('InsideApp', {
            screen: 'Chat',
            params: { user: response.data },
          }),
        ],
      });
      navigation.dispatch(resetAction);
      alert('Success!', `Email: ${email} \n Password: ${password}`);
    });
    return null;
  };

  return {
    submit,
    errors,
    email,
    setEmail,
    password,
    setPassword,
  };
};

export const useRegister = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [uf, setUf] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const submit = navigation => {
    const nextErrors = {};
    if (name.length === 0) {
      nextErrors.name = 'Preencha este campo.';
    }
    if (!ValidateEmail(email)) {
      nextErrors.email = 'Informe um email válido.';
    }
    if (email.length === 0) {
      nextErrors.email = 'Preencha este campo.';
    }
    if (password.length === 0) {
      nextErrors.password = 'Preencha este campo.';
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return null;
    }
    let data = {
      nome: name,
      email: email,
      senha: password,
    };

    userService.register(data).then(response => {
      const resetAction = navigation.reset({
        index: 0,
        actions: [
          navigation.navigate('InsideApp', {
            screen: 'Chat',
            params: { user: response.data },
          }),
        ],
      });
      navigation.dispatch(resetAction);
    });

    return null;
  };

  return {
    submit,
    errors,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    // uf,
    // setUf
  };
};

export const useRecoveryAccount = () => {
  const [email, setEmail] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const submit = navigation => {
    const nextErrors = {};
    if (!ValidateEmail(email)) {
      nextErrors.email = 'Informe um email válido.';
    }
    if (email.length === 0) {
      nextErrors.email = 'Preencha este campo.';
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return null;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });

    Alert.alert('Success!', `Email: ${email}`);
    return null;
  };

  return {
    submit,
    errors,
    email,
    setEmail,
  };
};

export function ValidateEmail(mail) {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(mail)) {
    return true;
  }
}
