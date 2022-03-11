import { QcmsConfig } from '../types'
import findUp from 'find-up'
import { CONFIG_FILES } from '../constants'

const configPath = findUp.sync(CONFIG_FILES, { cwd: __dirname })
if (!configPath) throw new Error('Configuration file was not found')
console.info(`[QCMS] Using config file: ${configPath}`)
const config: QcmsConfig = require(configPath)

export default config
