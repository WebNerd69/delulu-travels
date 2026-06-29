import { LangCache } from "@redis-ai/langcache";

const langCache = new LangCache({
  serverURL: "https://aws-ap-south-1.langcache.redis.io",
  cacheId: "4ee32646f7c54c8aa532969356c94808",
  apiKey: process.env.REDIS_LANGCACHE_API_KEY,
});

export default langCache