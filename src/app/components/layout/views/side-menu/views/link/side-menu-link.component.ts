import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { NavItem } from '../../models/nav-item.model';

@Component({
    selector: 'side-menu-link',
    templateUrl: './side-menu-link.component.html',
    styleUrls: ['./side-menu-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuLinkComponent {

    @Input() link: NavItem;
    @Output() ngNavigate = new EventEmitter<void>();

    get hasIcon(): boolean {
        return Boolean(this.link.icon);
    }

    get linkUrl(): string[] {
        return this.link.url;
    }

    get linkTitle(): string {
        return this.link.title;
    }

    get iconName(): string {
        return this.link.icon || '';
    }

    emitNavigation(): void {
        this.ngNavigate.emit();
    }

}
