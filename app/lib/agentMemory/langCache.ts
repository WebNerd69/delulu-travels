import { LangCache } from "@redis-ai/langcache";

const langCache = new LangCache({
  serverURL: "https://aws-us-east-1.langcache.redis.io",
  cacheId: "eaa464f8465b4de2ab3667dae72cf968",
  apiKey: process.env.REDIS_LANGCACHE_API_KEY,
});

export default langCache