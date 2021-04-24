export default async (req, res) => {
  const { quizId } = req.query;
  const response = await fetch(`${process.env.API_URL}/quizzes/getQuiz?id=${quizId}`);
  const quiz = await response.json();
  res.status(200).send(quiz);
};
