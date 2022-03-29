/* eslint-disable @typescript-eslint/no-var-requires */
import { QcmsConfig } from '../types'
const findup = require('findup-sync')
import { CONFIG_FILES } from '../constants'

let configPath: string
const fixedConfigFilePath = process.env.QCMS_FIXED_CONFIG_PATH
if (fixedConfigFilePath) {
  configPath = fixedConfigFilePath
} else {
  configPath = findup(CONFIG_FILES, { cwd: __dirname })
}
if (!configPath) throw new Error('Configuration file was not found')
console.info(`[QCMS] Using config file: ${configPath}`)
const config: QcmsConfig = require(configPath)

export default config
