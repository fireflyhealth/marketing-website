import { FC } from 'react';

export const SequenceLines: FC = () => {
  return (
    <div className="SequenceLines__container">
      <div className="SequenceLines__point" />
      <div className="SequenceLines__segment--top" />
      <div className="SequenceLines__col-left" />
      <div className="SequenceLines__col-right">
        <div className="SequenceLines__segment--middle" />
      </div>
      <div className="SequenceLines__segment--bottom" />
    </div>
  );
};
