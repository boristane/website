import type { BaselimeLogger } from "@baselime/edge-logger";
import { UAParser } from "ua-parser-js";

interface DataPoint {
  slug: string;
  type: string;

  host?: string | undefined;
  userAgent?: string;
  url?: string;
  country?: string;
  city?: string;
  referrer?: string;
  browserName?: string;
  deviceModel?: string;
  osName?: string;

  newVisitor: number;
  newSession: number;
}

export async function collect(request: { VIEWS: AnalyticsEngineDataset; body: { slug: string; type: string; referrer?: string }, userAgent?: string, headers: Request["headers"]; url: string; cf?: CfProperties, logger: BaselimeLogger }) {

  const { body, userAgent, VIEWS } = request;
  const parsedUserAgent = new UAParser(userAgent);

  const { newVisitor, newSession } = checkVisitorSession(
    request.headers.get("if-modified-since"),
  );
  const host = request.headers.get("origin") || undefined;


  const data: DataPoint = {
    slug: body.slug,
    type: body.type,
    host,
    url: request.url,
    referrer: body.referrer,
    newVisitor: newVisitor ? 1 : 0,
    newSession: newSession ? 1 : 0,
    userAgent: userAgent,
    browserName: parsedUserAgent.getBrowser().name,
    deviceModel: parsedUserAgent.getDevice().model,
    osName: parsedUserAgent.getOS().name,
  };

  request.logger.info("The data", { data })

  const country = request.cf?.country;
  if (typeof country === "string") {
    data.country = country;
  }

  const city = request.cf?.city;
  if (typeof city === "string") {
    data.city = city;
  }

  incrementView(VIEWS, data, request.logger)
}


function incrementView(analyticsEngine: AnalyticsEngineDataset, data: DataPoint, logger: BaselimeLogger) {
  const datapoint = {
    indexes: [data.slug],
    blobs: [
      data.host || "", // blob1
      data.userAgent || "", // blob2
      data.url || "", // blob3
      data.country || "", // blob4
      data.city || "", // blob5
      data.referrer || "", // blob6
      data.browserName || "", // blob7
      data.deviceModel || "", // blob8
      data.osName || "", // blob9
      data.slug || "", // blob10
      data.type || "", // blob11
    ],
    doubles: [data.newVisitor || 0, data.newSession || 0],
  };

  logger.info("The datapoint", datapoint);
  if (!analyticsEngine) {
    logger.info("Analytics engine not found");
    return;
  }

  logger.info("Analytics engine found");

  try {
    analyticsEngine.writeDataPoint(datapoint);
    logger.info("Wrote to analytics engine");
  } catch (err) {
    logger.error("There was an issue", { message: (err as any).message, err })
  }

}

function getPath(s: string) {
  const url = new URL(s);
  return url.pathname;
}

function checkVisitorSession(ifModifiedSince: string | null): {
  newVisitor: boolean;
  newSession: boolean;
} {
  if (!ifModifiedSince) return { newVisitor: true, newSession: true };

  let newVisitor = true;
  let newSession = true;

  const maxSessionDuration = 30 * 60 * 1000; // 30mins

  const now = new Date();
  const ifModifiedSinceDate = new Date(ifModifiedSince);
  const isSameDay = now.getFullYear() === ifModifiedSinceDate.getFullYear() && now.getMonth() === ifModifiedSinceDate.getMonth() && now.getDate() === ifModifiedSinceDate.getDate();
  if (isSameDay) {
    newVisitor = false;
  }

  const sessionDuration = Date.now() - new Date(ifModifiedSince).getTime();
  if (sessionDuration < maxSessionDuration) {
    newSession = false;
  }

  return { newVisitor, newSession };
}
