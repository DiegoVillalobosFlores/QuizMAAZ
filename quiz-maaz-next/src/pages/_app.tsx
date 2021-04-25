import 'tailwindcss/tailwind.css';
import { ReactNode } from 'react';

type Props = {
  Component: ReactNode;
  pageProps: any;
};

function QuizMaaz({ Component, pageProps }: Props) {
  // @ts-ignore
  return <Component {...pageProps} />;
}

export default QuizMaaz;
