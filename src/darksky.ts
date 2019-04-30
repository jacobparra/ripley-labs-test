import axios, { AxiosInstance } from 'axios';

const DARK_SKY_BASE_URL = 'https://api.darksky.net/forecast';
const ERROR_PERCENTAGE = 0.1;

export interface Weather {
  time: Date;
  temperature: string;
}

export class DarkSky {
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

  async getCurrent(latitude: string, longitude: string): Promise<Weather> {
    if (Math.random() < ERROR_PERCENTAGE) {
      throw new Error('How unfortunate! The API Request Failed');
    }
    const { data } = await this.httpClient.get(`${latitude},${longitude}`);
    console.log(data);
    return {
      temperature: data.currently.temperature,
      time: data.currently.time
    };
  }
}
