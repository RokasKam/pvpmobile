import React, {useState} from 'react';
import {Alert} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {classRoomValidator} from '../services/helpers/classRoomValidator';
import {userNameValidator} from '../services/helpers/userNameValidator';
import {passwordValidator} from '../services/helpers/passwordValidator';
import {apiService} from '../services/apiService';
import {createApiHeader} from '../services/createApiHeader';
import {useUserContext} from '../contexts/UserContext';

const LoginScreen = ({navigation}) => {
  const [classRoom, setClassRoom] = useState({value: '', error: ''});
  const [userName, setUserName] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const {setUser} = useUserContext();

  const onLoginPressed = async () => {
    const classError = classRoomValidator(classRoom.value);
    const userNameError = userNameValidator(userName.value);
    const passwordError = passwordValidator(password.value);

    if (classError || userNameError || passwordError) {
      setClassRoom({...classRoom, error: classError});
      setUserName({...userName, error: userNameError});
      setPassword({...password, error: passwordError});
      return;
    }
    try {
      const loginResponse = await apiService.login({
        username: userName.value,
        password: password.value,
        classroomCode: classRoom.value,
      });
      const userResponse = await apiService.fetchUserInfo(
        createApiHeader(loginResponse.data.accessToken),
      );
      setUser({
        token: loginResponse.data.accessToken,
        refreshtoken: loginResponse.data.refreshToken,
        id: userResponse.data.id,
        username: userResponse.data.username,
        classroomid: userResponse.data.classroomId,
        money: userResponse.data.money,
        avatarImage: userResponse.data.avatarImage,
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'MainScreen'}],
      });
    } catch (e) {
      Alert.alert(e.response.data.Message);
    }
  };

  return (
    <Background>
      <Logo />
      <Header>Prisijungimas</Header>
      <TextInput
        label="Klasė"
        returnKeyType="next"
        value={classRoom.value}
        onChangeText={text => setClassRoom({value: text, error: ''})}
        error={!!classRoom.error}
        errorText={classRoom.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Prisijungimo vardas"
        returnKeyType="next"
        value={userName.value}
        onChangeText={text => setUserName({value: text, error: ''})}
        error={!!userName.error}
        errorText={userName.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Slaptažodis"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Prisijungti
      </Button>
    </Background>
  );
};

export default LoginScreen;
