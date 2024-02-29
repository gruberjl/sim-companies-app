import fs from 'fs'
import path from 'path'

const copyDist = () => {
  // fs.unlinkSync(path.resolve('./docs'))
  fs.cpSync(path.resolve('./dist'), path.resolve('./docs'), {recursive: true})
}

copyDist()