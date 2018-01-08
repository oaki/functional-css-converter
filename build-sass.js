/**
 * Created by oaki on 23/12/2017.
 */
const fse = require('fs-extra');
const del = require('del');
const nodeSass = require('node-sass');
const sassPath = process.argv[2];
const cssTargetPath = './public/assets/css/main.css';

function writeFile(filePath, content) {
  console.log('Create the file', filePath);
  return fse.writeFile(filePath, content)
    .catch(err => {
      console.error(`writeFile '${filePath}' error: ${err}`);
      throw err;
    });
}

function deleteDirs(dirs) {
  console.log('Delete dirs', dirs.map(dir => dir));
  return del(dirs).catch(console.error);
}

deleteDirs([cssTargetPath]).then(() => {
  nodeSass.render({
    file: sassPath
  }, (err, result) => {
    if (err) {
      console.error('nodeSass error:', JSON.stringify(err));
      reject();
      return;
    }

    return writeFile(cssTargetPath, result.css);

  });
})
