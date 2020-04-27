import { NavItem } from './nav-item.model';

export class SideMenuEditedCategoryModel {
    title: string;
    avatar: string;
    /**
     * Represents overline for header according to material spec.
     * Usually contains entity name for edited item.
     */
    overline: string;
    /**
     * Represents overline for header according to material spec.
     * Usually contains description for edited entity.
     */
    caption: string;
    options: NavItem[];
}
