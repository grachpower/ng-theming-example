import { EntryType } from './entry-type.enum';
import { LevelTypes } from './level.types';

export const LEVEL_AVAILABLE_ENTRY_TYPES: {[level: number]: EntryType[]} = {
    [LevelTypes.FIRST]: [ EntryType.FIRST_LEVEL ],
    [LevelTypes.SECOND]: [ EntryType.SECOND_LEVEL, EntryType.SECOND_LEVEL_LINK ],
    [LevelTypes.THIRD]: [ EntryType.LINK_BLOCK, EntryType.BANNER, EntryType.WIDE_BANNER],
    [LevelTypes.FOURTH]: [ EntryType.OPERATOR_LINK, EntryType.LINK, EntryType.HIGHLIGHTED_LINK ],
};
