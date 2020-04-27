import { Location } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PermissionService } from 'ngx-role-permissions';
import { Observable, Subject, Subscription, zip } from 'rxjs';
import { filter, flatMap, map, switchMapTo, takeUntil } from 'rxjs/operators';

import { NAV_MENU_CONFIG } from '../config/menu.config';
import { NavItem } from '../models/nav-item.model';
import { TitleService } from './../../../../../core/services/title.service';

interface NavItemWithAccessor {
    element: NavItem;
    canAccess: boolean;
}

@Injectable()
export class SideMenuStorageService implements OnDestroy {
    private readonly destroy$ = new Subject<void>();
    private readonly routeSubscription$ = this.routeSubscription();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private title: TitleService,
        private location: Location,
        private translateService: TranslateService,
        private permissionService: PermissionService,
    ) { }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public get sideMenuContent$(): Observable<NavItem[]> {
        return this.getAvailableMenuElements();
    }

    private routeSubscription(): Subscription {
        return this.router.events
            .pipe(
                filter((event: RouterEvent) => event instanceof NavigationEnd),
                switchMapTo(this.route.url),
                takeUntil(this.destroy$),
                flatMap(() => this.sideMenuContent$),
            )
            .subscribe((sideMenuContent: NavItem[]) => {
                const path = this.location.path();
                for (const sideMenuLink of sideMenuContent) {
                    if (this.assignTitle(path, sideMenuLink)) {

                        return;
                    }
                }
            });
    }

    private assignTitle(path: string, sideMenuLink: NavItem): boolean {
        if (path.startsWith(sideMenuLink.url.join('/'))) {
            this.translateService.get(sideMenuLink.title)
                .pipe(takeUntil(this.destroy$))
                .subscribe((title: string) => this.title.setTitle(title));

            return true;
        }

        return false;
    }

    private getAvailableMenuElements(): Observable<NavItem[]> {
        return zip(
            ...NAV_MENU_CONFIG.map((navItem: NavItem) => this.getNavItemWithAccessor(navItem)),
        ).pipe(
            map((elements: NavItemWithAccessor[]) => elements.filter(element => element.canAccess)),
            map((elements: NavItemWithAccessor[]) => elements.map(element => element.element)),
        );
    }

    private getNavItemWithAccessor(navItem: NavItem): Observable<NavItemWithAccessor> {
        return this.permissionService.canAccess(navItem.permissionElement)
            .pipe(
                map((canAccess: boolean) => ({ element: navItem, canAccess })),
            );
    }

}
