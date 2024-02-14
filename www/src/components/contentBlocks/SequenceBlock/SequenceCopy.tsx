import { FC, useRef, useEffect } from 'react';
import * as SanityTypes from '@/types/sanity';
import { useUIProvider } from '@/context/UIProvider';

type Props = {
  copy: SanityTypes.SequenceBlockTextFields;
  headerCopy?: boolean;
};

export const SequenceCopy: FC<Props> = ({ copy, headerCopy }) => {
  const { title, bellyButtonText, description } = copy;

  const { sequenceLinePosition, setSequenceLinePosition } = useUIProvider();
  const bellyButtonTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const getLinePosition = () => {
      if (!bellyButtonTextRef.current) return;
      const width =
        bellyButtonTextRef.current.getBoundingClientRect().width / 2;
      const marker =
        bellyButtonTextRef.current.getBoundingClientRect().left + width;
      setSequenceLinePosition(marker);
    };

    if (sequenceLinePosition === 0) {
      if (!bellyButtonTextRef.current) return;
      const width =
        bellyButtonTextRef.current.getBoundingClientRect().width / 2;
      const marker =
        bellyButtonTextRef.current.getBoundingClientRect().left + width;
      setSequenceLinePosition(marker);
    }

    window.addEventListener('resize', getLinePosition);
  }, [bellyButtonTextRef, setSequenceLinePosition]);
  return (
    <div className="flex flex-col space-y-2 text-center items-center">
      {headerCopy ? (
        <h2 className="font-size-4 font-trust theme-text-color-primary">
          {title}
        </h2>
      ) : (
        <h3 className="font-size-6 font-trust theme-text-color-primary">
          {title}
        </h3>
      )}
      <span
        ref={bellyButtonTextRef}
        className="font-size-10 font-roobert text-yellow w-fit"
      >
        {bellyButtonText}
      </span>
      <p className="font-size-8 font-roobert theme-text-color-secondary">
        {description}
      </p>
    </div>
  );
};
