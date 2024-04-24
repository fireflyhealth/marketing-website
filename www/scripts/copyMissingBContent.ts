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

function getAbsoluteFilepath(relativeFilepath: string): string {
  return Path.resolve(sourceDirectory, relativeFilepath);
}

outputString.split('\n').forEach((line) => {
  if (!line.endsWith('.html') && !line.endsWith('.json')) {
    return;
  }

  const absoluteFilepath = getAbsoluteFilepath(line);

  if (line.includes('b-content')) {
    targetFilepaths.push(absoluteFilepath);
  } else {
    sourceFilepaths.push(absoluteFilepath);
  }
});

// foo/bar/baz.html    ->  foo/bar/b-content/baz.html
// foo/bar/index.html  ->  foo/bar/b-content/index.html
function getTargetFilepathForSource(sourceFilepath: string): string {
  const parsedPath = Path.parse(sourceFilepath);
  const filename = parsedPath.base;
  const filepath = parsedPath.dir;

  return Path.resolve(filepath, './b-content', filename);
}

function sourceFilepathShouldBeCopied(sourceFilepath: string): boolean {
  const targetFilepath = getTargetFilepathForSource(sourceFilepath);
  const fileExists = FS.existsSync(targetFilepath);

  return !fileExists;
}

function shortenPath(absoluteFilepath: string): string {
  return absoluteFilepath.replace(sourceDirectory, '');
}

function copySourceToTarget(sourceFilepath: string): void {
  const targetFilepath = getTargetFilepathForSource(sourceFilepath);
  const parsedPath = Path.parse(targetFilepath);
  const targetDirectory = parsedPath.dir;

  if (!FS.existsSync(targetDirectory)) {
    FS.mkdirSync(targetDirectory);
  }

  console.log(`Copying from ${shortenPath(sourceFilepath)} to ${shortenPath(targetFilepath)}...`);

  FS.copyFileSync(sourceFilepath, targetFilepath);
}

sourceFilepaths.forEach((sourceFilepath) => {
  if (sourceFilepathShouldBeCopied(sourceFilepath)) {
    copySourceToTarget(sourceFilepath);
  }
});
