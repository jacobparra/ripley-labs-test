import { darkSky, Weather } from './darksky';
import { cache } from './cache';
import { cities } from './constants';

export interface City {
  name: string;
  latitude: number;
  longitude: number;
  weather?: Weather;
}

class CityManager {

  async getAllCitiesWeather(): Promise<City[]> {
    const promises = cities.map(async (city) => {
      city.weather = await this.getWeather(city);
      return city;
    });
    return Promise.all(promises);
  }

  async getWeather(city: City): Promise<Weather> {
    const weather = await cache.getCityWeather(city.name);
    if (Object.keys(weather).length === 0) {
      return this.updateWeather(city);
    }
    return weather;
  }

  async updateWeather(city: City): Promise<Weather> {
    try {
      const weather = await darkSky.getCurrentWeather(city.latitude, city.longitude);
      cache.setCityWeather(city.name, weather);
      return weather;
    } catch (e) {
      if (e.name === 'DarkSkyRandomError') {
        console.error(`Unable to get weather for ${city.name}. Retrying.`);
        await cache.addError(city.name);
        return this.updateWeather(city);
      }
      throw e;
    }
  }
}

export const cityManager = new CityManager();
