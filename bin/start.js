#! /usr/bin/env node






var spawn = require('cross-spawn');
console.log('Start bin/start.js');
const result = spawn.sync(
  'fcc_build',
  ['/Users/pavolbincik/Sites/functional-css-converter/resources/sass/_main.scss'],
  {stdio: 'inherit'}
);

// fcc_build /Users/pavolbincik/Sites/functional-css-converter/resources/sass/_main.scss


if (result.error) {
  console.log(result.error);
  process.exit(1);
}
if (result.signal) {
  if (result.signal === 'SIGKILL') {
    console.log(
      'The build failed because the process exited too early. ' +
      'This probably means the system ran out of memory or someone called ' +
      '`kill -9` on the process.'
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      'The build failed because the process exited too early. ' +
      'Someone might have called `kill` or `killall`, or the system could ' +
      'be shutting down.'
    );
  }
  process.exit(1);
}
process.exit(result.status);

// var rs = require("../node_modules/react-scripts/bin/react-scripts.js");

// shell.exec("node PORT=3011 react-scripts start");



