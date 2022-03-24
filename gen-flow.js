const {beautify, compiler} = require('flowgen')
const fs = require('fs')

const flowdef = beautify(compiler.compileDefinitionFile('./dist/maybe.d.ts'))
fs.writeFile(
  './flow/maybe.js',
  `declare module '@freckle/maybe' \{ 
${flowdef}\}
`,
  e => {
    if (e) console.error(e)
    else {
      console.log('Flow types written')
    }
  }
)
