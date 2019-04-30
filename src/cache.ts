import * as Redis from 'ioredis';
import { Weather } from './darksky';

const WEATHER_EXPIRE_SECONDS = 90;

class Cache {
  private redisClient = new Redis(process.env.REDIS_URL);

  async getCityWeather(cityName: string): Promise<any> {
    await this.redisClient.hgetall(cityName);
  }

  async setCityWeather(cityName: string, weather: Weather): Promise<void> {
    await this.redisClient.hmset(cityName, weather);
    await this.redisClient.expire(cityName, WEATHER_EXPIRE_SECONDS);
  }

  async addError(cityName: string): Promise<void> {
    await this.redisClient.hset('api.errors', Date.now().toString(), cityName);
  }
}

export const cache = new Cache();
