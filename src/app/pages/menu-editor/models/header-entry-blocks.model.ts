import { EntryType } from '../config/entry-type.enum';
import { Gender } from '../config/gender.enum';

export interface FirstLevelBlock {
    type: EntryType.FIRST_LEVEL;
    name: string;
    gender: Gender;
    content: (SecondLevelBlock | SecondLevelLinkBlock)[];
}

export interface SecondLevelLinkBlock {
    type: EntryType.SECOND_LEVEL_LINK;
    name: string;
    url: string;
    colored?: boolean;
}

export interface SecondLevelBlock {
    type: EntryType.SECOND_LEVEL;
    name: string;
    content: (LinkBlockBlock | BannerBlock | WideBannerBlock)[];
}

export interface BannerBlock {
    type: EntryType.BANNER;
    imageUrl: string;
    name: string;
    url: string;
}

export interface WideBannerBlock {
    type: EntryType.BANNER;
    imageUrl: string;
    name: string;
    url: string;
}

export interface LinkBlockBlock {
    type: EntryType.LINK_BLOCK;
    name: string;
    content: (OperatorLinkBlock | LinkBlock | HighlightedLinkBlock)[];
}

export interface OperatorLinkBlock {
    type: EntryType.OPERATOR_LINK;
    url: string;
}

export interface LinkBlock {
    type: EntryType.LINK;
    name: string;
    url: string;
    isButton: boolean;
    inNewWindow: boolean;
}

export interface HighlightedLinkBlock {
    type: EntryType.HIGHLIGHTED_LINK;
    name: string;
    url: string;
    isButton: boolean;
    inNewWindow: boolean;
}

export type HeaderEntryBlocks = FirstLevelBlock
    | SecondLevelBlock
    | SecondLevelLinkBlock
    | LinkBlockBlock
    | BannerBlock
    | WideBannerBlock
    | OperatorLinkBlock
    | LinkBlock
    | HighlightedLinkBlock;
