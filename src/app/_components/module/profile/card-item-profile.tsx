import React from 'react';

interface TProps extends React.HTMLProps<HTMLDivElement> {
  label: string;
  value: string;
}

const CardItemProfile = (props: TProps) => {
  const { label, value, ...attrs } = props;
  return (
    <div className="flex flex-col gap-2" {...attrs}>
      <div className="font-medium">{label}</div>
      <div className="border py-3 px-2">{value}</div>
    </div>
  );
};

export default CardItemProfile;
