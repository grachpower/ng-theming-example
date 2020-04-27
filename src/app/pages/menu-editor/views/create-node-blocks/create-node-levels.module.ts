import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { PageSharedModule } from '../../../page-shared.module';
import { BannerBlockComponent } from './banner-block/banner-block.component';
import { FirstLevelBlockComponent } from './first-level-block/first-level-block.component';
import { HighlightedLinkBlockComponent } from './highlighted-link-block/highlighted-link-block.component';
import { LinkBlockBlockComponent } from './link-block-block/link-block-block.component';
import { LinkBlockComponent } from './link-block/link-block.component';
import { OperatorLinkBlockComponent } from './operator-link-block/operator-link-block.component';
import { SecondLevelBlockComponent } from './second-level-block/second-level-block.component';
import { SecondLevelLinkBlockComponent } from './second-level-link-block/second-level-link-block.component';
import { WideBannerBlockComponent } from './wide-banner-block/wide-banner-block.component';

const dynamicComponents = [
    FirstLevelBlockComponent,
    SecondLevelBlockComponent,
    SecondLevelLinkBlockComponent,
    LinkBlockBlockComponent,
    BannerBlockComponent,
    WideBannerBlockComponent,
    OperatorLinkBlockComponent,
    LinkBlockComponent,
    HighlightedLinkBlockComponent,
];

@NgModule({
    declarations: [
        ...dynamicComponents,
    ],
    imports: [
        SharedModule,
        PageSharedModule,
    ],
    entryComponents: [
        ...dynamicComponents,
    ],
})
export class CreateNodeBlocksModule { }
