import { createHash } from "node:crypto";

import { prisma } from "./prisma";

const REQUESTS_PER_HOUR_PER_VISITOR = 10;
const REQUESTS_PER_DAY_GLOBAL = 60;

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
  reason?: "hourly" | "daily";
};

function getHourWindow(date: Date) {
  const windowStart = new Date(date);

  windowStart.setUTCMinutes(0, 0, 0);

  return windowStart;
}

function getDayWindow(date: Date) {
  const windowStart = new Date(date);

  windowStart.setUTCHours(0, 0, 0, 0);

  return windowStart;
}

function getSecondsUntilNextHour(date: Date) {
  const nextHour = new Date(date);

  nextHour.setUTCHours(nextHour.getUTCHours() + 1);
  nextHour.setUTCMinutes(0, 0, 0);

  return Math.max(1, Math.ceil((nextHour.getTime() - date.getTime()) / 1000));
}

function getSecondsUntilNextDay(date: Date) {
  const nextDay = new Date(date);

  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  nextDay.setUTCHours(0, 0, 0, 0);

  return Math.max(1, Math.ceil((nextDay.getTime() - date.getTime()) / 1000));
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  const clientIp =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local-development";

  return createHash("sha256").update(clientIp).digest("hex");
}

async function incrementCounter(identifier: string, windowStart: Date) {
  return prisma.assistantRateLimit.upsert({
    where: {
      identifier_windowStart: {
        identifier,
        windowStart,
      },
    },
    update: {
      requestCount: {
        increment: 1,
      },
    },
    create: {
      identifier,
      windowStart,
      requestCount: 1,
    },
    select: {
      requestCount: true,
    },
  });
}

export async function checkAssistantRateLimit(
  request: Request,
): Promise<RateLimitResult> {
  const now = new Date();
  const clientIdentifier = getClientIdentifier(request);

  const hourWindow = getHourWindow(now);
  const dayWindow = getDayWindow(now);

  const [hourlyUsage, dailyUsage] = await Promise.all([
    incrementCounter(`visitor-hour:${clientIdentifier}`, hourWindow),
    incrementCounter("global-day", dayWindow),
  ]);

  if (hourlyUsage.requestCount > REQUESTS_PER_HOUR_PER_VISITOR) {
    return {
      allowed: false,
      retryAfterSeconds: getSecondsUntilNextHour(now),
      reason: "hourly",
    };
  }

  if (dailyUsage.requestCount > REQUESTS_PER_DAY_GLOBAL) {
    return {
      allowed: false,
      retryAfterSeconds: getSecondsUntilNextDay(now),
      reason: "daily",
    };
  }

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}
