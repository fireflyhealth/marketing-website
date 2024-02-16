import { FC } from 'react';

export const SequenceLines: FC = () => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full"
      // this div should match the sequence card width for all breakpoints
      style={{
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        // lg card item max width (left)
        // + lg card item max width (right)
        // + left padding
        // + gutter
        // + right padding
        maxWidth: 'calc(580px + 580px + 48px + 48px + 48px)',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <div
        style={
          // matches the sequence card container styling
          {
            display: 'grid',
            columnGap: '48px',
            gridTemplateColumns: '1fr 1fr',
            height: '100%',
          }
        }
      >
        <div />

        <div
          style={{
            backgroundColor: 'green',
            // should match card right item width at md & large
            maxWidth: '580px',
          }}
        />
      </div>
      {/* Top-left segment */}
      <div
        className="absolute left-[50%] h-[100px] border-l border-b border-sienna"
        style={{
          width: '32px',

          // borderRadius: '0 0 0 16px',
        }}
      />
      {/* middle segment */}
      <div
        className="absolute border-t border-r border-b border-sienna"
        style={{
          left: 'calc(50%)',
          // 25% to be halfway through the 2nd column of cards
          // - 48px -48px to offset container padding
          // - 2px to offset border widths
          // - 3px to fudge
          // width: 'calc(25% - 24px)',
          top: 'calc(100px - 1px)',
          width: 'calc(25% + 24px)',
          maxWidth: 'calc((580px / 2))',
          // 100%
          // - offset from top
          // - offset from bottom
          // + 2 px to offset border width
          height: 'calc(100% - 100px - 350px + 2px)',
          // borderRadius: '0 16px 16px 0',
        }}
      />

      {/* bottom segment */}
      <div
        className="absolute border-l border-t border-sienna"
        style={{
          top: 'calc(100% - 350px)',
          width: '32px',
          height: '200px',
          left: '50%',
          // borderRadius: '16px 0 0 0',
        }}
      />
    </div>
  );
};
