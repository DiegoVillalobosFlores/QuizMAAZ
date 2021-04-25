import Answer from './Answer';

type Question = {
  id: string,
  question: string;
  answers: Array<Answer>
};

export default Question;
