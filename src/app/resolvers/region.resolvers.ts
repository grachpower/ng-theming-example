import { get } from 'lodash';

import { RegionTypes } from '../config/region.enum';
import { URL_REGION_MAP } from '../config/url.contants';

export function regionDetector(host: string): RegionTypes {
    return get(URL_REGION_MAP, host, RegionTypes.RU);
}
