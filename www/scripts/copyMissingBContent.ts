/* eslint-disable no-console */

import FS from 'fs';
import Path from 'path';
import ChildProcess from 'child_process';

const sourceDirectory = Path.resolve(__dirname, '../out');
const output = ChildProcess.execSync(
  'find . -name "*.html" -o -name "*.json"',
  {
    cwd: sourceDirectory,
  },
);

const outputString = output.toString('utf8');
const sourceFilepaths: string[] = [];
const targetFilepaths: string[] = [];

outputString.split('\n').forEach((line) => {
  if (!line.endsWith('.html') && !line.endsWith('.json')) {
    return;
  }

  if (line.includes('b-content')) {
    targetFilepaths.push(line);
  } else {
    sourceFilepaths.push(line);
  }
});

sourceFilepaths.forEach((sourceFilepath) => {
  const parts = sourceFilepath.split('.');
  const suffix = parts.pop();
  const segments = parts.join('.').split('/');
  const lastSegment = segments.pop();

  if (lastSegment !== 'index' && lastSegment !== undefined) {
    segments.push(lastSegment);
  }

  const filepathSansSuffix = segments.join('/');
  const targetFilepath = `${filepathSansSuffix}/b-content.${suffix}`;

  if (targetFilepaths.includes(targetFilepath)) {
    // The b-content file already exists.
    return;
  }

  const resolvedSourceFilepath = Path.resolve(sourceDirectory, sourceFilepath);
  const resolvedTargetFilepath = Path.resolve(sourceDirectory, targetFilepath);
  const targetDirectory = Path.resolve(sourceDirectory, filepathSansSuffix);

  if (!FS.existsSync(targetDirectory)) {
    FS.mkdirSync(targetDirectory);
  }

  console.log(`Creating fallback file: ${resolvedTargetFilepath}`);

  FS.copyFileSync(resolvedSourceFilepath, resolvedTargetFilepath);
});
