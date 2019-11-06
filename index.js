const fs = require('fs');
const { animateString } = require('./animate-string');

const contents = fs.readdirSync('./animals');

animateString(contents.join('\n'));