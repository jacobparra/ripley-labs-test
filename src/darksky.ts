import axios, { AxiosInstance } from 'axios';

const DARK_SKY_BASE_URL = 'https://api.darksky.net/forecast';
const ERROR_PERCENTAGE = 0.1;

export interface Weather {
  temperature: string;
  time: number;
  timezone: string;
}

export class DarkSkyRandomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DarkSkyRandomError';
    this.message = message;
  }
}

class DarkSky {
  private httpClient: AxiosInstance;

  constructor(secretKey: string) {
    this.httpClient = axios.create({
      baseURL: `${DARK_SKY_BASE_URL}/${secretKey}`,
      timeout: 1000,
      params: {
        lang: 'es',
        units: 'si',
        exclude: 'minutely, hourly, daily, alerts, flags'
      }
    });
  }

  async getCurrentWeather(latitude: number, longitude: number): Promise<Weather> {
    if (Math.random() < ERROR_PERCENTAGE) {
      throw new DarkSkyRandomError('How unfortunate! The API Request Failed');
    }
    const { data } = await this.httpClient.get(`${latitude},${longitude}`);
    return {
      temperature: data.currently.temperature,
      time: data.currently.time,
      timezone: data.timezone
    };
  }
}

export const darkSky = new DarkSky(process.env.DARK_SKY_KEY || '');
