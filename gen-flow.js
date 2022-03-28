const {beautify, compiler} = require('flowgen')
const fs = require('fs')
const glob = require('glob')
const path = require('path')

glob('./dist/**/*.d.ts', {}, (err, files) => {
  if (err) console.error(err)
  files.forEach(f => {
    const flowdef = beautify(compiler.compileDefinitionFile(f))
    const p = path.parse(f)
    const name = /(.*).d/.exec(p.name)[1]
    fs.writeFile(
      `${p.dir}/${name}.js.flow`,
      `//@flow
${flowdef}`,
      e => {
        if (e) console.error(e)
      }
    )
  })
})
