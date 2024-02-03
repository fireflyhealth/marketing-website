import path from 'path';
import fs from 'fs';
import prettier from 'prettier';
import { mockDataQuery } from '@/mockData/groq';
import { client } from '@/lib/sanity';

const jsonFilePath = path.resolve(__dirname, '../src/mockData/mockData.json');

const main = async () => {
  const mockData = await client
    .withConfig({ useCdn: false })
    .fetch(mockDataQuery);
  const fileContents = await prettier.format(JSON.stringify(mockData, null), {
    parser: 'json',
  });
  fs.writeFileSync(jsonFilePath, fileContents, 'utf8');
};

main();
