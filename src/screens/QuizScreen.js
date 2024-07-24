import React, {useEffect, useState} from 'react';
import {View, Alert, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import {apiService} from '../services/apiService';
import {createApiHeader} from '../services/createApiHeader';
import Header from '../components/Header';
import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Leaderboard from '../components/Leaderboard';
import Paragraph from '../components/Paragraph';
import Bar from '../components/Bar';

const QuizScreen = ({route, navigation}) => {
  const {user} = useUserContext();
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answersUntilNow, setAnswersUntilNow] = useState(0);
  const [questionsInQuiz, setQuestionsInQuiz] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [typedOption, setTypedOption] = useState('');
  const {quizId, classQuizId} = route.params;
  const [leaderboardScore, setLeaderboardScore] = useState([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quiz = await apiService.fetchAllQuestions(
          createApiHeader(user.token),
          quizId,
        );
        setQuestions(quiz.data.studentQuestion);
        setAnswersUntilNow(quiz.data.questionsAnsweredUntilNow);
        setQuestionsInQuiz(quiz.data.allQuestionsInQuiz);
        setLoading(false);
        console.log(quiz.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user && user.token && route.params) {
      fetchQuizData();
    }
  }, [quizId, route.params, user]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const leaderboard = await apiService.fetchLeaderboard(
          createApiHeader(user.token),
          classQuizId,
        );
        setLeaderboardScore(leaderboard.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (questions[currentQuestion] === undefined) {
      fetchLeaderboardData();
    }
  }, [currentQuestion, classQuizId, questions, user.token]);

  const answerQuestion = async answers => {
    if (answers.length === 0 || answers[0] === '') {
      Alert.alert(
        'Būtinai įveskite atsakymą arba pasirinkite bent vieną atsakymą',
      );
      return;
    }
    const answerInfo = {
      answers: answers,
      questionId: questions[currentQuestion].id,
    };
    try {
      const response = await apiService.answerQuestion(
        createApiHeader(user.token),
        answerInfo,
      );
      const message = response.data
        ? 'Atsakėte teisingai'
        : 'Atsakėte neteisingai';
      const explanation = questions[currentQuestion].explanation;
      Alert.alert(message, explanation, [
        {text: 'OK', onPress: () => setCurrentQuestion(prev => prev + 1)},
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleOption = option => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(opt => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const getOptionStyle = option => {
    return {
      backgroundColor: selectedOptions.includes(option.optionText)
        ? '#bae8e3'
        : 'transparent',
    };
  };

  return (
    <Background>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {questions[currentQuestion] !== undefined && (
            <View style={styles.container}>
              <Bar
                progress={
                  (answersUntilNow + currentQuestion + 1) / questionsInQuiz
                }
                currentQuestion={answersUntilNow + currentQuestion}
                totalQuestions={questionsInQuiz}
              />
              <Paragraph>{questions[currentQuestion].text}</Paragraph>
              {questions[currentQuestion].imageURL !== null && (
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: `${questions[currentQuestion].imageURL}`,
                    }}
                    style={styles.image}
                  />
                </View>
              )}
              <Paragraph>Galimi atsakymai:</Paragraph>

              {questions[currentQuestion].category === 'One' && (
                <View style={styles.container}>
                  {questions[currentQuestion].optionResponses.map(
                    (option, index) => (
                      <Button
                        key={index}
                        mode="outlined"
                        onPress={() => answerQuestion([option.optionText])}>
                        {option.optionText}
                      </Button>
                    ),
                  )}
                </View>
              )}

              {questions[currentQuestion].category === 'Multiple' && (
                <View style={styles.container}>
                  <View style={styles.container}>
                    {questions[currentQuestion].optionResponses.map(option => (
                      <Button
                        key={option.optionText}
                        mode="outlined"
                        onPress={() => toggleOption(option.optionText)}
                        style={getOptionStyle(option)}>
                        {option.optionText}
                      </Button>
                    ))}
                  </View>
                  <Button
                    mode="contained"
                    onPress={() => answerQuestion(selectedOptions)}>
                    Pateikti atsakymą
                  </Button>
                </View>
              )}

              {questions[currentQuestion].category === 'Word' && (
                <View style={styles.container}>
                  <View style={styles.container}>
                    <TextInput
                      label="Įrašykite atsakymą"
                      returnKeyType="done"
                      value={typedOption}
                      onChangeText={text => setTypedOption(text)}
                    />
                  </View>
                  <Button
                    mode="contained"
                    onPress={() => answerQuestion([typedOption])}>
                    Pateikti atsakymą
                  </Button>
                </View>
              )}
            </View>
          )}

          {questions[currentQuestion] === undefined && (
            <View style={styles.leaderboard}>
              <Header>Turnyrinė lentelė</Header>
              <Leaderboard leaderboardScore={leaderboardScore} />
              <Button
                mode="contained"
                onPress={() => navigation.navigate('MainScreen')}>
                Atgal
              </Button>
            </View>
          )}
        </>
      )}
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '95%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  leaderboard: {
    width: '80%',
  },
});

export default QuizScreen;
