import React from 'react';

type SomeComponentProps = {
  title: string;
  count: number;
};

const SomeComponent: React.FC<SomeComponentProps> = ({ title, count }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
    </div>
  );
};

export default SomeComponent;
