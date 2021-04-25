import useSWR from 'swr';
import Quiz from 'types/Quiz';
import React from 'react';
import Admin from '../../components/Admin';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar/Sidebar';

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

function AdminPage({ quiz: initialData, id }: Props) {
  const { data } = useSWR(`/api/quizzes/${id}`, fetcher, { initialData });
  const { quiz } = data;
  return (
    <Layout sidebar={<Sidebar teams={quiz.teams} categories={quiz.categories} />}>
      <Admin quiz={quiz} id={id} />
    </Layout>
  );
}

export default AdminPage;
