import { HeaderEntryModel } from '../models/header-entry.model';
import { EntryType } from './entry-type.enum';
import { GENDERS_TRANSLATE_MAP } from './gender.config';
import { Gender } from './gender.enum';

export const DEFAULT_MENU_STORE_DATA: HeaderEntryModel[] = [
    {
        type: EntryType.FIRST_LEVEL,
        name: GENDERS_TRANSLATE_MAP[Gender.FEMALE],
        gender: Gender.FEMALE,
        content: [],
    },
    {
        type: EntryType.FIRST_LEVEL,
        name: GENDERS_TRANSLATE_MAP[Gender.MALE],
        gender: Gender.MALE,
        content: [],
    },
    {
        type: EntryType.FIRST_LEVEL,
        name: GENDERS_TRANSLATE_MAP[Gender.CHILDREN],
        gender: Gender.CHILDREN,
        content: [],
    }
];
