import { EntryType } from './entry-type.enum';

export const BLOCK_TYPE_TO_ICON_MAP: { [entryType: string]: string } = {
    [EntryType.SECOND_LEVEL]: 'list',
    [EntryType.SECOND_LEVEL_LINK]: 'share',
    [EntryType.LINK_BLOCK]: 'view_column',
    [EntryType.BANNER]: 'photo',
    [EntryType.WIDE_BANNER]: 'photo_size_select_actual',
    [EntryType.OPERATOR_LINK]: 'phonelink_setup',
    [EntryType.LINK]: 'share',
    [EntryType.HIGHLIGHTED_LINK]: 'whatshot',
};
