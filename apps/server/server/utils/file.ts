import fs from 'fs'
import path from 'path'
const write = require('write')

export const cwdPath = (filePath: string) => path.join(process.cwd(), filePath)

const getFilePath = (relPath: string) => path.join(__dirname, relPath)

export const readFile = (relPath: string) => {
  return fs.readFileSync(getFilePath(relPath), { encoding: 'utf8' })
}

export const writeFile = (relPath: string, content: string) => {
  return write.sync(getFilePath(relPath), content)
}
