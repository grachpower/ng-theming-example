import { RegionTypes } from './region.enum';

export enum BackendApiUrl {
  RU = 'https://mysite.ru/api',
  EN = 'https://mysite.com/en',
}

export const URL_REGION_MAP = {
  'mysite.ru': [RegionTypes.RU],
  'mysite.com': [RegionTypes.EN],
};

export const apiUrls =  {
  [RegionTypes.RU]: BackendApiUrl.RU,
  [RegionTypes.EN]: BackendApiUrl.EN,
};
