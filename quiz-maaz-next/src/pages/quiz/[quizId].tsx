import useSWR from 'swr';
import Quiz from 'types/Quiz';

const fetcher = (url) => fetch(url, { method: 'GET' })
  .then((res) => res.json());

export async function getStaticProps({ params }) {
  const quiz = await fetcher(`http://localhost:3000/api/quizzes/${params.quizId}`);

  return {
    props: {
      quiz,
      id: params.quizId,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

type Props = {
  quiz: Quiz;
  id: string;
};

function QuizPage({ quiz: initialData, id }: Props) {
  const { data } = useSWR(`/api/quizzes/${id}`, fetcher, { initialData });
  const { quiz } = data;
  return (
    <div>
      <div>
        {id}
      </div>
      <div>
        {quiz.name}
      </div>
      {quiz.teams.map((team) => (
        <div key={team.value}>
          {team.value}
          {' '}
          {team.score}
        </div>
      ))}
    </div>
  );
}

export default QuizPage;
