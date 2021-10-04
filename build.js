const { join } = require('path');
const fs = require('fs-extra');

const getDist = () => join(__dirname, './dist');
const logger = console;

async function cleanDist() {
  try {
    await fs.remove(getDist());
    logger.log('=> Remove dist folder with success');
  } catch (err) {
    logger.error('=> Error on clean dist:', err);
    process.exit(1);
  }
}

async function createDir(dir) {
  try {
    await fs.mkdir(dir);
    logger.log(`=> Create ${dir} folder with success`);
  } catch (err) {
    logger.error(`=> Error on create ${dir}:`, err);
    process.exit(1);
  }
}

async function copyToDist(folder, dest) {
  const ignoreFiles = (src) => {
    const IGNORED_FOLDERS = ['__testfixtures__', '__tests__', 'tests'];
    return !IGNORED_FOLDERS.some((ignoredFolder) => src.includes(ignoredFolder));
  };

  const destionation = dest ? join(__dirname, `./dist/${dest}`) : getDist();

  try {
    await fs.copy(folder, destionation, { filter: ignoreFiles });
    logger.log(`=> Copy ${folder} with success`);
  } catch (err) {
    logger.error(`=> Error on copy ${folder} to dist:`, err);
    process.exit(1);
  }
}

async function build() {
  await cleanDist();
  await createDir(getDist());
  await createDir(`${getDist()}/bin`);
  await copyToDist(join(__dirname, './src'));
  process.exit(0);
}

build();
