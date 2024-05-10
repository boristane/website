import { defineConfig } from "drizzle-kit"
export default defineConfig({
  dialect: 'sqlite',
  schema: "./src/schema.ts",
  out: "./migrations",
  driver: 'd1',
  dbCredentials: {
    wranglerConfigPath: '.',
    dbName: 'website'
  },
  verbose: true,
})