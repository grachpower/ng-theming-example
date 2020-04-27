import { Gender } from '../config/gender.enum';
import { EntryType } from '../config/entry-type.enum';

export class HeaderEntryModel {
    /** Only top level can have gender */
    public gender?: Gender;
    public type?: EntryType;
    /** Only content level types */
    public name?: string;
    /** Only content level types */
    public url?: string;
    /** Only for banner types */
    public imageUrl?: string;
    /** Only for n-level types */
    public content?: HeaderEntryModel[];
    /** Nofollow flag is suitable for links only */
    public isButton?: boolean;
    /**
     * Link only attribute, applied if `isButton` is falsy.
     * Opens link in new window.
     */
    public inNewWindow?: boolean;
    /**
     * Applies to second level category.
     * Whether category colored in primary color.
     */
    public colored?: boolean;
}
