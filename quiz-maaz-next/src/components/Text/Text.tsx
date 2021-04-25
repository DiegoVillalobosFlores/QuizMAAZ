import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Text({ children, className = '' }: Props) {
  return <p className={`text-beige ${className}`}>{children}</p>;
}
