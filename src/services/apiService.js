import axios from 'axios';

const apilink = 'https://b175-158-129-6-43.ngrok-free.app';
const login = loginInfo =>
  axios.post(`${apilink}/api/Student/Login`, loginInfo);

const fetchUserInfo = headers =>
  axios.get(`${apilink}/api/Student/GetStudent`, {
    headers: headers,
  });
const fetchAllQuizes = (headers, quizId) =>
  axios.get(`${apilink}/api/Quiz/GetAllClassesQuiz?classId=${quizId}`, {
    headers: headers,
  });
const fetchAllQuestions = (headers, quizId) =>
  axios.get(
    `${apilink}/api/Question/GetQuestionsWhichAreNotAnsweredByStudent?quizId=${quizId}`,
    {
      headers: headers,
    },
  );

const answerQuestion = (headers, answerinfo) =>
  axios.post(`${apilink}/api/Question/AnswerQuestion`, answerinfo, {
    headers: headers,
  });

const changePassword = (headers, changeInfo) =>
  axios.put(`${apilink}/api/Student/ChangePassword`, changeInfo, {
    headers: headers,
  });

const fetchLeaderboard = (headers, classQuizid) =>
  axios.get(
    `${apilink}/api/Student/GetLeaderboardOfQuiz?classQuizId=${classQuizid}`,
    {
      headers: headers,
    },
  );

const fetchAvatars = headers =>
  axios.get(`${apilink}/api/Avatar/GetAllAvatars`, {
    headers: headers,
  });

const buyAvatar = (headers, avatarId) =>
  axios.post(`${apilink}/api/Avatar/BuyAvatar?avatarId=${avatarId}`, null, {
    headers: headers,
  });

const equipAvatar = (headers, avatarId) =>
  axios.put(
    `${apilink}/api/Avatar/ChangeCurrentAvatar?avatarId=${avatarId}`,
    null,
    {
      headers: headers,
    },
  );

export const apiService = {
  login,
  fetchUserInfo,
  fetchAllQuizes,
  fetchAllQuestions,
  answerQuestion,
  changePassword,
  fetchLeaderboard,
  fetchAvatars,
  buyAvatar,
  equipAvatar,
};
