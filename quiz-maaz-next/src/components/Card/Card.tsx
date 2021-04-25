import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return <div className={`bg-background-secondary p-4 rounded-md ${className}`}>{children}</div>;
}
