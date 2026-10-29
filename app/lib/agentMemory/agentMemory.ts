import { AgentMemory } from "@redis-iris/agent-memory";

const agentMemory = new AgentMemory({
    serverURL: "https://aws-us-east-1.memory.redis.io",
    storeId: "c3f6e0a2936f4070b8f3cd22c886b463",
    apiKey: process.env.REDIS_AGENT_MEMORY_API_KEY,
});

export default agentMemory