import React, {useEffect} from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import {useUserContext} from '../contexts/UserContext';
import Score from '../components/Score';
import Avatar from '../components/Avatar';
import {apiService} from '../services/apiService';
import {createApiHeader} from '../services/createApiHeader';

const ProfileScreen = ({navigation}) => {
  const {user, setUser} = useUserContext();
  useEffect(() => {
    const getUser = async () => {
      const userResponse = await apiService.fetchUserInfo(
        createApiHeader(user.token),
      );
      setUser({
        token: user.token,
        refreshtoken: user.refreshtoken,
        id: userResponse.data.id,
        username: userResponse.data.username,
        classroomid: userResponse.data.classroomId,
        money: userResponse.data.money,
        avatarImage: userResponse.data.avatarImage,
      });
    };
    getUser();
  }, [setUser, user.refreshtoken, user.token]);

  return (
    <Background>
      <Avatar image={user.avatarImage} />
      <Header>{user.username} profilis</Header>
      <Score points={user.money} />

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('ChangePasswordScreen')}>
        Pakeisti slaptažodį
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('AvatarScreen')}>
        Veikėjų parduotuvė
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('MainScreen')}>
        Atgal
      </Button>
    </Background>
  );
};

export default ProfileScreen;
