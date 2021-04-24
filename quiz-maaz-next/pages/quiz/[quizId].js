import PropTypes from 'prop-types';
import React from 'react';
import useSWR from 'swr';

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

function Quiz({ quiz: initialData, id }) {
  const { data } = useSWR(`/api/quizzes/${id}`, fetcher, { initialData });
  const { quiz } = data;
  return (<div>
    <div>
      {id}
    </div>
    <div>
      {quiz.name}
    </div>
    {quiz.teams.map((team, index) => <div key={index}>{team.value} {team.score}</div>)}
  </div>);
}

Quiz.propTypes = {
  quiz: PropTypes.shape({
    name: PropTypes.string,
    teams: PropTypes.array,
  }),
  id: PropTypes.string,
};

export default Quiz;
