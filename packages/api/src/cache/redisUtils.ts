import type { RedisClientType, RedisClusterType } from '@redis/client';
import { logger } from '@librechat/data-schemas';
import { cacheConfig } from './cacheConfig';

/**
 * Set to true after a CROSSSLOT error is detected on a single-node connection.
 * This happens with managed/proxy Redis services that enforce slot constraints
 * internally but don't expose standard cluster topology discovery.
 * Once detected, all subsequent deletes use individual-key mode automatically.
 */
let crossslotSafeMode = false;

function isCrossslotError(err: unknown): boolean {
  return err instanceof Error && err.message.includes('CROSSSLOT');
}

async function deleteIndividually(
  client: RedisClientType | RedisClusterType,
  keys: string[],
  chunkSize: number,
): Promise<number> {
  let total = 0;
  for (let i = 0; i < keys.length; i += chunkSize) {
    const chunk = keys.slice(i, i + chunkSize);
    const counts = await Promise.all(chunk.map((key) => client.del(key)));
    total += counts.reduce((a, b) => a + b, 0);
  }
  return total;
}

/**
 * Efficiently deletes multiple Redis keys with support for both cluster and single-node modes.
 *
 * - Cluster mode or crossslot-safe mode: Deletes keys individually in parallel chunks
 * - Single-node mode: Uses batch DEL commands for efficiency; falls back to individual
 *   deletes automatically if a CROSSSLOT error is detected (e.g. managed/proxy Redis)
 *
 * @param client - Redis client (node or cluster)
 * @param keys - Array of keys to delete
 * @param chunkSize - Optional chunk size (defaults to REDIS_DELETE_CHUNK_SIZE config)
 * @returns Number of keys deleted
 *
 * @example
 * ```typescript
 * const deletedCount = await batchDeleteKeys(keyvRedisClient, ['key1', 'key2', 'key3']);
 * console.log(`Deleted ${deletedCount} keys`);
 * ```
 */
export async function batchDeleteKeys(
  client: RedisClientType | RedisClusterType,
  keys: string[],
  chunkSize?: number,
): Promise<number> {
  const startTime = Date.now();

  if (keys.length === 0) {
    return 0;
  }

  const size = chunkSize ?? cacheConfig.REDIS_DELETE_CHUNK_SIZE;

  let deletedCount: number;
  let mode: string;

  if (cacheConfig.USE_REDIS_CLUSTER || crossslotSafeMode) {
    mode = cacheConfig.USE_REDIS_CLUSTER ? 'cluster' : 'crossslot-safe';
    deletedCount = await deleteIndividually(client, keys, size);
  } else {
    // Attempt to delete in single cluster mode, but fallback to safe crosslot mode if needed
    mode = 'single-node';
    const deletePromises = [];
    for (let i = 0; i < keys.length; i += size) {
      deletePromises.push(client.del(keys.slice(i, i + size)));
    }
    try {
      const results = await Promise.all(deletePromises);
      deletedCount = results.reduce((sum, count) => sum + count, 0);
    } catch (err) {
      if (!isCrossslotError(err)) {
        throw err;
      }
      logger.warn(
        '[Redis][batchDeleteKeys] CROSSSLOT error detected — switching to per-key delete mode for this Redis instance',
      );
      crossslotSafeMode = true;
      mode = 'crossslot-safe';
      deletedCount = await deleteIndividually(client, keys, size);
    }
  }

  const duration = Date.now() - startTime;
  const batchCount = Math.ceil(keys.length / size);

  if (duration > 1000) {
    logger.warn(
      `[Redis][batchDeleteKeys] Slow operation - Duration: ${duration}ms, Mode: ${mode}, Keys: ${keys.length}, Deleted: ${deletedCount}, Batches: ${batchCount}, Chunk size: ${size}`,
    );
  } else {
    logger.debug(
      `[Redis][batchDeleteKeys] Duration: ${duration}ms, Mode: ${mode}, Keys: ${keys.length}, Deleted: ${deletedCount}, Batches: ${batchCount}`,
    );
  }

  return deletedCount;
}

/**
 * Scans Redis for keys matching a pattern and collects them into an array.
 * Uses Redis SCAN to avoid blocking the server.
 *
 * @param client - Redis client (node or cluster) with scanIterator support
 * @param pattern - Pattern to match keys (e.g., 'user:*', 'session:*:active')
 * @param count - Optional SCAN COUNT hint (defaults to REDIS_SCAN_COUNT config)
 * @returns Array of matching keys
 *
 * @example
 * ```typescript
 * const userKeys = await scanKeys(keyvRedisClient, 'user:*');
 * const sessionKeys = await scanKeys(keyvRedisClient, 'session:*:active', 500);
 * ```
 */
export async function scanKeys(
  client: RedisClientType | RedisClusterType,
  pattern: string,
  count?: number,
): Promise<string[]> {
  const startTime = Date.now();
  const keys: string[] = [];

  // Type guard to check if client has scanIterator
  if (!('scanIterator' in client)) {
    throw new Error('Redis client does not support scanIterator');
  }

  const scanCount = count ?? cacheConfig.REDIS_SCAN_COUNT;

  for await (const key of client.scanIterator({
    MATCH: pattern,
    COUNT: scanCount,
  })) {
    keys.push(key);
  }

  // Performance monitoring
  const duration = Date.now() - startTime;

  if (duration > 1000) {
    logger.warn(
      `[Redis][scanKeys] Slow operation - Duration: ${duration}ms, Pattern: "${pattern}", Keys found: ${keys.length}, Scan count: ${scanCount}`,
    );
  } else {
    logger.debug(
      `[Redis][scanKeys] Duration: ${duration}ms, Pattern: "${pattern}", Keys found: ${keys.length}`,
    );
  }

  return keys;
}
