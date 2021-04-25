import { ReactNode } from 'react';

type Props = {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
};

export default function Layout({ children, header, sidebar }:Props) {
  return (
    <div className="w-screen h-screen bg-background-primary grid grid-cols-4 gap-0 auto-rows-max">
      <div className="col-span-full">
        {header}
      </div>
      <div className="h-screen">
        {sidebar}
      </div>
      <div className="col-span-3">
        {children}
      </div>
    </div>
  );
}
