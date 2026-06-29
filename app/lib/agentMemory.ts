import { AgentMemory } from "@redis-iris/agent-memory";

const agentMemory = new AgentMemory({
    serverURL: "https://gcp-us-east4.memory.redis.io",
    storeId: "70feeebafbeb404d915fb56d700058e7",
    apiKey: process.env.REDIS_AGENT_MEMORY_API_KEY,
});

export default agentMemory