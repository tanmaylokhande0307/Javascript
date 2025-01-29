import { createClient, RedisClientType } from "redis";

export class RedisClientManager {
  static instance: RedisClientManager;
  private client: RedisClientType;

  private constructor() {
    this.client = createClient();
    this.client.connect();
  }

  static getInstance() {
    if (!RedisClientManager.instance) {
      return new RedisClientManager();
    }

    return RedisClientManager.instance;
  }

  getClient() {
    return this.client;
  }
}

export const redisClient = RedisClientManager.getInstance();
