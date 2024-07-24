import React, {useState} from 'react';
import {Alert} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {passwordValidator} from '../services/helpers/passwordValidator';
import {apiService} from '../services/apiService';
import {createApiHeader} from '../services/createApiHeader';
import {useUserContext} from '../contexts/UserContext';

const ChangePasswordScreen = ({navigation}) => {
  const {user} = useUserContext();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordChange = async () => {
    const oldPasswordError = passwordValidator(oldPassword.value);
    const newPasswordError = passwordValidator(newPassword.value);
    const confirmedPasswordError = passwordValidator(confirmNewPassword.value);

    if (oldPasswordError || newPasswordError || confirmedPasswordError) {
      setOldPassword({...oldPassword, error: oldPasswordError});
      setNewPassword({...newPassword, error: newPasswordError});
      setConfirmNewPassword({
        ...confirmNewPassword,
        error: confirmedPasswordError,
      });
      return;
    }

    if (newPassword.value !== confirmNewPassword.value) {
      Alert.alert('Error', 'New passwords do not match!');
      return;
    }

    try {
      await apiService.changePassword(createApiHeader(user.token), {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
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
      <Header>Keisti slaptžodį</Header>
      <TextInput
        label="Įveskite seną slaptažodį"
        returnKeyType="next"
        value={oldPassword.value}
        onChangeText={text => setOldPassword({value: text, error: ''})}
        error={!!oldPassword.error}
        errorText={oldPassword.error}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        label="Įvesktie naują slaptažodį"
        returnKeyType="next"
        value={newPassword.value}
        onChangeText={text => setNewPassword({value: text, error: ''})}
        error={!!newPassword.error}
        errorText={newPassword.error}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        label="Pakartokite Naują slaptažodį"
        returnKeyType="done"
        value={confirmNewPassword.value}
        onChangeText={text => setConfirmNewPassword({value: text, error: ''})}
        error={!!confirmNewPassword.error}
        errorText={confirmNewPassword.error}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button mode="contained" onPress={handlePasswordChange}>
        Pakeisti
      </Button>
    </Background>
  );
};

export default ChangePasswordScreen;
