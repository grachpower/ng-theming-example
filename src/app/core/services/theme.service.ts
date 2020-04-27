import { BreakpointObserver } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

import { Theme } from '../../config/theme.enum';
import { COOKIE_EXPIRE, COOKIE_PATH } from '../../tokens/cookie.token';

const THEME_COOKIE_NAME = 'admin-theme';
/** Id to query default theme element */
const DEFAULT_THEME_ID = 'head-theme-script';
/** Whether default script element is not found, then use default theme */
const DEFAULT_THEME = Theme.LIGHT;

@Injectable({
    providedIn: 'root'
})
/**
 * Theme management. Used to
 * - manage programmatic theme changes
 * - store theme in cookie
 * - read `(prefers-color-scheme: dark/light)` media queries
 */
export class ThemeService {

    private readonly isLoading$ = new BehaviorSubject<boolean>(false);
    private readonly currentTheme$ = new BehaviorSubject<Theme>(Theme.LIGHT);
    private readonly renderer = this.rendererFactory.createRenderer(null, null);
    private readonly themeScriptMap = new Map<Theme, Element>();

    constructor(
        @Inject(COOKIE_EXPIRE) private cookieExpireTime: number,
        @Inject(COOKIE_PATH) private cookiePath: string,
        private cookie: CookieService,
        private overlay: OverlayContainer,
        @Inject(DOCUMENT) private document: Document,
        private rendererFactory: RendererFactory2,
        @Inject(PLATFORM_ID) private platformId: Object,
        private breakpointObserver: BreakpointObserver,
    ) {
    }

    public themeChanges(): Observable<Theme> {
        return this.currentTheme$.asObservable();
    }

    public loadingChanges(): Observable<boolean> {
        return this.isLoading$.asObservable();
    }

    public setTheme(theme: Theme): void {
        if (this.isLoading$.getValue()) {

            return;
        }
        const lastTheme = this.currentTheme$.getValue();
        if (this.themeScriptMap.has(theme)) {
            this.applyThemeClasses(theme, lastTheme);
            this.applyThemeSetting(theme);
        } else {
            this.createLinkElement(theme, lastTheme);
            this.applyThemeSetting(theme);
        }
    }

    public initialize(): void {
        if (this.cookie.check(THEME_COOKIE_NAME)) {
            const theme: Theme = this.cookie.get(THEME_COOKIE_NAME) as Theme;
            this.setTheme(theme);
        } else if (this.breakpointObserver.isMatched('(prefers-color-scheme: dark)')) {
            this.setTheme(Theme.DARK);
        } else if (this.breakpointObserver.isMatched('(prefers-color-scheme: light)')) {
            this.setTheme(Theme.LIGHT);
        } else {
            this.setTheme(DEFAULT_THEME);
        }
    }

    private applyThemeClasses(theme: Theme, lastTheme: Theme): void {
        this.document.body.classList.remove(lastTheme);
        this.document.body.classList.add(theme);
        this.overlay.getContainerElement().classList.remove(lastTheme);
        this.overlay.getContainerElement().classList.add(theme);
    }

    private applyThemeSetting(theme: Theme): void {
        // Need to specify path or path would be specified for current route
        this.cookie.set(THEME_COOKIE_NAME, theme, this.cookieExpireTime, this.cookiePath);
        this.currentTheme$.next(theme);
    }

    private createLinkElement(theme: Theme, lastTheme: Theme): void {
        if (isPlatformServer(this.platformId)) {
            const defaultThemeElement = this.document.head.querySelector(`#${DEFAULT_THEME_ID}`);
            if (defaultThemeElement) {
                this.renderer.removeChild(this.document.head, defaultThemeElement);
            }
        }
        this.isLoading$.next(true);
        const linkElement = this.renderer.createElement('link');
        this.renderer.setAttribute(linkElement, 'rel', 'stylesheet');
        this.renderer.setAttribute(linkElement, 'href', `${theme}.css`);
        const listenDestructor = this.renderer.listen(linkElement, 'load', () => {
            this.applyThemeClasses(theme, lastTheme);
            this.isLoading$.next(false);
            listenDestructor();
        });
        this.renderer.appendChild(this.document.head, linkElement);
        this.themeScriptMap.set(theme, linkElement);
    }

}
