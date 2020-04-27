import { NavItem } from '../models/nav-item.model';
import { NavigationMenuElements } from '../../../../../permissions/navigation-menu.permissions';

export const NAV_MENU_CONFIG: NavItem[] = [
    {
        url: ['/pages', 'menu-editor'],
        title: 'sidenav-menu.MENU_EDITOR',
        permissionElement: NavigationMenuElements.DROPDOWN_MENU_EDITOR,
    },
];