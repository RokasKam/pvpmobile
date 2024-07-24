import React, {useEffect, useState} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import {useUserContext} from '../contexts/UserContext';
import {apiService} from '../services/apiService';
import {createApiHeader} from '../services/createApiHeader';

const MainScreen = ({navigation}) => {
  const {user, setUser} = useUserContext();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const getQuizData = async () => {
      try {
        const quiz = await apiService.fetchAllQuizes(
          createApiHeader(user.token),
          user.classroomid,
        );
        setQuizzes(quiz.data);
      } catch (e) {
        console.error(e);
      }
    };

    if (user && user.token && user.classroomid) {
      getQuizData();
    }
  }, [user]);

  const onLogoutPressed = () => {
    setUser(null);
    navigation.reset({
      index: 0,
      routes: [{name: 'StartScreen'}],
    });
  };

  return (
    <Background>
      <Logo />
      {user != null && <Header>Sveiki, {user.username}!</Header>}
      <Button mode="outlined" onPress={onLogoutPressed}>
        Atsijungti
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('ProfileScreen')}>
        Jūsų profilis
      </Button>

      <Header>Tavo klausimynai:</Header>
      {quizzes.map(quiz => (
        <Button
          key={quiz.quizId}
          mode="outlined"
          onPress={() =>
            navigation.navigate('QuizScreen', {
              quizId: quiz.quizId,
              classQuizId: quiz.id,
            })
          }>
          {quiz.name}
        </Button>
      ))}
    </Background>
  );
};

export default MainScreen;
