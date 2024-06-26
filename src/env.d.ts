/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type AnalyticsEngineDataset = import("@cloudflare/workers-types").AnalyticsEngineDataset;
type D1Database = import("@cloudflare/workers-types").D1Database;
type ENV = {
  VIEWS: AnalyticsEngineDataset;
  DB: D1Database;
  BASELIME_API_KEY: string;
  IS_LOCAL: string;
  CLOUDFLARE_TOKEN: string;
  CLOUDFLARE_ACCOUNT: string;
};

// Depending on your adapter mode
// use `AdvancedRuntime<ENV>` for advance runtime mode
// use `DirectoryRuntime<ENV>` for directory runtime mode
type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;
declare namespace App {
  interface Locals extends Runtime {}
}