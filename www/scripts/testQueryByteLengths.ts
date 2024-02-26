/* eslint-disable no-console */
import { getByteLength } from '@/utils/getByteLength';
import * as queries from '../src/lib/sanity/queries';

const SANITY_MAX = 307200;

type Result = { queryName: string; byteLength: number };

/**
 * Ensure that our page queries do not exceed the sanity client maximum.
 * (This will cause builds to fail).
 * See more: https://twist.com/a/133876/ch/675943/t/5809345/c/88554381
 */

const main = () => {
  console.log(
    `Checking that sanity queries do not exceed the byte maximum of ${SANITY_MAX}`,
  );
  const results = Object.entries(queries).reduce<Result[]>(
    (prev, [key, query]) => [
      ...prev,
      {
        queryName: key,
        byteLength: getByteLength(query),
      },
    ],
    [],
  );

  results.forEach(({ queryName, byteLength }) => {
    const symbol =
      byteLength > SANITY_MAX
        ? '🔴'
        : byteLength > SANITY_MAX * 0.85
          ? '🟡'
          : '🟢';
    const percent = Math.round((byteLength / SANITY_MAX) * 100)
      .toString()
      .padStart(2, '0')
      .concat('%');
    console.log(`${symbol} ${queryName}: ${byteLength} (${percent})`);
  });

  const tooLargeResults = results.filter((r) => r.byteLength > SANITY_MAX);

  if (tooLargeResults.length) {
    const tooLargeNames = tooLargeResults.map((r) => r.queryName).join(', ');
    throw new Error(
      `One or more queries exceed the maximum byte length: ${tooLargeNames}`,
    );
  }
};

main();
