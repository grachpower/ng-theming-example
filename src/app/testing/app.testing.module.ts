import { LayoutModule } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxPermissionModule } from 'ngx-role-permissions';

import { AppRoutingModule } from '../app-routing.module';
import { apiUrlResolver, HttpLoaderFactory, regionResolver } from '../app.module';
import { PageSharedModule } from '../pages/page-shared.module';
import { SharedModule } from '../shared/shared.module';
import { API_URL } from '../tokens/api-url.token';
import { COOKIE_EXPIRE, COOKIE_PATH } from '../tokens/cookie.token';
import { REGION } from '../tokens/region.token';
import { CoreTestingModule } from './core.testing.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        PageSharedModule,
        CoreTestingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient, REGION],
            }
        }),
        LayoutModule,
        NgxPermissionModule.withElements([]),
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
        CookieService,
    ],
    exports: [
        NoopAnimationsModule,
        SharedModule,
        PageSharedModule,
        CoreTestingModule,
        AppRoutingModule,
        TranslateModule,
        LayoutModule,
        NgxPermissionModule,
    ],
})
export class AppTestingModule {}
