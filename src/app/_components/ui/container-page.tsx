import React from 'react';

interface TProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

const ContainerPage = (props: TProps) => {
  const { title, children, ...attrs } = props;
  return (
    <article className="space-y-6 max-w-full " {...attrs}>
      <h1 className="font-semibold text-body-2xl">{title}</h1>
      <div className="border p-8 bg-white max-w-full">{children}</div>
    </article>
  );
};

export default ContainerPage;
