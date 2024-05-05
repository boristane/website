import type { APIRoute } from "astro"

interface AnalyticsQueryResult<
  SelectionSet extends Record<string, string | number>,
> {
  meta: string;
  data: SelectionSet[];
  rows: number;
  rows_before_limit_at_least: number;
}

interface AnalyticsCountResult {
  views: number;
  visits: number;
  visitors: number;
}

export const ColumnMappings = {
  host: "blob1",
  userAgent: "blob2",
  url: "blob3",
  country: "blob4",
  city: "blob5",
  referrer: "blob6",
  browserName: "blob7",
  deviceModel: "blob8",
  osName: "blob9",
  slug: "blob10",
  type: "blob11",

  newVisitor: "double1",
  newSession: "double2",
} as const;



async function runQuery(account: string, token: string, query: string) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${account}/analytics_engine/sql`;
  const headers = {
    "content-type": "application/json;charset=UTF-8",
    "X-Source": "Cloudflare-Workers",
    Authorization: `Bearer ${token}`,
  };
  return fetch(url, {
    method: "POST",
    body: query,
    headers,
  });
}


export async function count(type: string, slug: string, account: string, token: string): Promise<AnalyticsCountResult> {
  const query = `
      SELECT SUM(_sample_interval) as count,
          ${ColumnMappings.newVisitor} as isVisitor,
          ${ColumnMappings.newSession} as isVisit
      FROM views
      WHERE ${ColumnMappings.type} = '${type}'
      AND ${ColumnMappings.slug} = '${slug}'
      GROUP BY isVisitor, isVisit
      ORDER BY isVisitor, isVisit ASC`;


  type SelectionSet = {
    count: number;
    isVisitor: number;
    isVisit: number;
  };

  const queryResult = runQuery(account, token, query);

  const returnPromise = new Promise<AnalyticsCountResult>(
    (resolve, reject) =>
      (async () => {
        const response = await queryResult;

        if (!response.ok) {
          reject(response.statusText);
        }

        const responseData =
          (await response.json()) as AnalyticsQueryResult<SelectionSet>;

        const counts: AnalyticsCountResult = {
          views: 0,
          visitors: 0,
          visits: 0,
        };

        responseData.data.forEach((row) => {
          accumulateCountsFromRowResult(counts, row);
        });
        resolve(counts);
      })(),
  );

  return returnPromise;
}

function accumulateCountsFromRowResult(
  counts: AnalyticsCountResult,
  row: {
    count: number;
    isVisitor: number;
    isVisit: number;
  },
) {
  if (row.isVisit == 1) {
    counts.visits += Number(row.count);
  }
  if (row.isVisitor == 1) {
    counts.visitors += Number(row.count);
  }
  counts.views += Number(row.count);
}
