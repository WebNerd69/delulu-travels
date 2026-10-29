### Agent memory and Lang cache

if the agent memory doesnt work check the redis database and amke new one if needed
file paths :-

```text
@app/services/redis/ShortMemory.ts
@app/services/redis/LongTermMemory.ts

@app/lib/agentMemory/agentMemory.ts
@app/lib/agentMemory/langCache.ts
```
