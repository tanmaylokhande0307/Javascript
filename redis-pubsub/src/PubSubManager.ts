import { createClient, RedisClientType } from "redis";

export class PubSubManager {
  private static instance: PubSubManager;
  private redisClient: RedisClientType;
  private subscriptions: Map<string, string[]>;

  private constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }

  static getInstance() {
    if (!PubSubManager.instance) {
      return new PubSubManager();
    }
    return PubSubManager.instance;
  }

  listenForUpdates() {
    this.redisClient.subscribe("apple", (message) => {
      console.log(message);
    });
  }

  addUserToStock(userId: string, stockTicker: string) {
    if (!this.subscriptions.has(stockTicker)) {
      this.subscriptions.set(stockTicker, []);
    }
    this.subscriptions.get(stockTicker)?.push(userId);
  }

  removeUserFromStock(userId: string, stockTicker: string) {}

  forwardMessageToUser(userId: string, stockTicker: string, price: string) {}
}
