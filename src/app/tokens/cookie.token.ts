import { InjectionToken } from '@angular/core';

export const COOKIE_PATH = new InjectionToken<string>('__cookie-path');
export const COOKIE_EXPIRE = new InjectionToken<number>('__cookie-expire');
