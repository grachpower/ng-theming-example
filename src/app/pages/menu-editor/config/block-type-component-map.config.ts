import { Type } from '@angular/core';
import { CreateNode } from '../views/core/create-node.interface';
import { BannerBlockComponent } from '../views/create-node-blocks/banner-block/banner-block.component';
import { FirstLevelBlockComponent } from '../views/create-node-blocks/first-level-block/first-level-block.component';
import { HighlightedLinkBlockComponent } from '../views/create-node-blocks/highlighted-link-block/highlighted-link-block.component';
import { LinkBlockBlockComponent } from '../views/create-node-blocks/link-block-block/link-block-block.component';
import { LinkBlockComponent } from '../views/create-node-blocks/link-block/link-block.component';
import { OperatorLinkBlockComponent } from '../views/create-node-blocks/operator-link-block/operator-link-block.component';
import { SecondLevelBlockComponent } from '../views/create-node-blocks/second-level-block/second-level-block.component';
import { SecondLevelLinkBlockComponent } from '../views/create-node-blocks/second-level-link-block/second-level-link-block.component';
import { WideBannerBlockComponent } from '../views/create-node-blocks/wide-banner-block/wide-banner-block.component';
import { EntryType } from './entry-type.enum';

export const BLOCK_TYPE_TO_COMPONENT_MAP: { [entryType: string]: Type<CreateNode> } = {
    [EntryType.FIRST_LEVEL]: FirstLevelBlockComponent,
    [EntryType.SECOND_LEVEL]: SecondLevelBlockComponent,
    [EntryType.SECOND_LEVEL_LINK]: SecondLevelLinkBlockComponent,
    [EntryType.LINK_BLOCK]: LinkBlockBlockComponent,
    [EntryType.BANNER]: BannerBlockComponent,
    [EntryType.WIDE_BANNER]: WideBannerBlockComponent,
    [EntryType.OPERATOR_LINK]: OperatorLinkBlockComponent,
    [EntryType.LINK]: LinkBlockComponent,
    [EntryType.HIGHLIGHTED_LINK]: HighlightedLinkBlockComponent,
};
