import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ThemeService } from './core/services/theme.service';
import { RegionTypes } from './config/region.enum';
import { REGION } from './tokens/region.token';
import { SHOW_SIDEBAR } from './tokens/sidebar.token';

@Component({
  selector: 'admin-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

    constructor(
        @Optional() @Inject(SHOW_SIDEBAR) public showSidebar: boolean,
        private themeService: ThemeService,
        private translateService: TranslateService,
        @Inject(REGION) private region: RegionTypes,
    ) { }

    public ngOnInit(): void {
        this.themeService.initialize();
        this.translateService.setDefaultLang(this.region);

        try {
            this.translateService.use(this.region);
        } catch (e) {
            console.error(e);
        }
    }
}
