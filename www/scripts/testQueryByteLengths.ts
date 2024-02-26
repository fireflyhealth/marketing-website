/* eslint-disable no-console */
import { getByteLength } from '@/utils/getByteLength';
import * as queries from '../src/lib/sanity/queries';
import * as fragments from '../src/lib/sanity/queries/fragments';

const SANITY_MAX = 307200;

type FragmentResult = { name: string; byteLength: number };
type QueryResult = FragmentResult & {
  percent: string;
  status: string;
};

/**
 * Ensure that our page queries do not exceed the sanity client maximum.
 * (This will cause builds to fail).
 * See more: https://twist.com/a/133876/ch/675943/t/5809345/c/88554381
 */

const main = () => {
  console.log(
    `Checking that sanity queries do not exceed the byte maximum of ${SANITY_MAX}`,
  );
  const fragmentResults = Object.entries(fragments).reduce<FragmentResult[]>(
    (prev, [key, query]) => [
      ...prev,
      {
        name: key,
        byteLength: getByteLength(query),
      },
    ],
    [],
  );

  console.log('-- fragments --');
  console.table(fragmentResults);

  const queryResults = Object.entries(queries).reduce<QueryResult[]>(
    (prev, [key, query]) => {
      const byteLength = getByteLength(query);
      const percent = Math.round((byteLength / SANITY_MAX) * 100)

        .toString()
        .padStart(2, '0')
        .concat('%');
      const status =
        byteLength > SANITY_MAX
          ? '🔴'
          : byteLength > SANITY_MAX * 0.85
            ? '🟡'
            : '🟢';

      return [
        ...prev,
        {
          status,
          name: key,
          byteLength,
          percent,
        },
      ];
    },
    [],
  );

  console.log('-- compiled queries --');
  console.table(queryResults);

  const tooLargeResults = queryResults.filter((r) => r.byteLength > SANITY_MAX);

  if (tooLargeResults.length) {
    const tooLargeNames = tooLargeResults.map((r) => r.name).join(', ');
    throw new Error(
      `One or more queries exceed the maximum byte length: ${tooLargeNames}`,
    );
  }
};

main();
