const dotEnv = require("dotenv")

const nodeEnv = process.env.NODE_ENV

const path = nodeEnv ? `.env.${nodeEnv}` : '.env'

dotEnv.config({ path: path })

const DB_DIALECT = process.env.DB_DIALECT
const DB_STORAGE = process.env.DB_STORAGE

module.exports = {
  dialect: DB_DIALECT,
  storage: DB_STORAGE,
  logging: nodeEnv === "test" ? undefined : console.log,
}