import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
import { LockTypes, NgxPermissionModule } from 'ngx-role-permissions';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './components/layout/layout.module';
import { RegionTypes } from './config/region.enum';
import { apiUrls } from './config/url.contants';
import { CoreModule } from './core/core.module';
import { NavigationMenuElements } from './permissions/navigation-menu.permissions';
import { regionDetector } from './resolvers/region.resolvers';
import { SharedModule } from './shared/shared.module';
import { API_URL } from './tokens/api-url.token';
import { COOKIE_EXPIRE, COOKIE_PATH } from './tokens/cookie.token';
import { BASEAPIURL_KEY, REGION_KEY } from './tokens/extension-tokens';
import { REGION } from './tokens/region.token';
import { SHOW_SIDEBAR } from './tokens/sidebar.token';

export function regionResolver(): RegionTypes {
    const defValue = localStorage.getItem(REGION_KEY);
    const browserUrl = window.location.host;
    const region = defValue as RegionTypes || regionDetector(browserUrl);

    return region;
}

export function apiUrlResolver(region: RegionTypes): string {
    const defValue = localStorage.getItem(BASEAPIURL_KEY);

    return defValue || apiUrls[region];
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        CoreModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient, REGION],
            }
        }),
        LayoutModule,
        NgxPermissionModule.withElements([
            {name: NavigationMenuElements.DROPDOWN_MENU_EDITOR, lockType: LockTypes.LOCKABLE, keys: []}
        ]),
    ],
    providers: [
        {
            provide: REGION,
            useFactory: regionResolver,
        },
        {
            provide: API_URL,
            useFactory: apiUrlResolver,
            deps: [REGION],
        },
        {
            provide: COOKIE_EXPIRE,
            useValue: 14 * 24 * 60 * 60e3,
        },
        {
            provide: COOKIE_PATH,
            useValue: '',
        },
        {
            provide: SHOW_SIDEBAR,
            useValue: !environment.production
        },
        CookieService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
