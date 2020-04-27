import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, OnDestroy, Output, ViewEncapsulation, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CanColor, CanColorCtor, CanDisable, CanDisableCtor, CanDisableRipple, CanDisableRippleCtor, mixinColor, mixinDisabled, mixinDisableRipple, ThemePalette } from '@angular/material/core';

class MatButtonBase {
    constructor(public _elementRef: ElementRef) {}
}

const AdminButtonMixinBase: CanDisableRippleCtor & CanDisableCtor & CanColorCtor &
      typeof MatButtonBase = mixinColor(mixinDisabled(mixinDisableRipple(MatButtonBase)));

@Component({
    selector: 'admin-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AdminToggleComponent),
        multi: true,
    }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AdminToggleComponent
    extends AdminButtonMixinBase
    implements ControlValueAccessor, AfterViewInit, OnDestroy, CanDisable, CanColor, CanDisableRipple {

    @HostBinding('class.admin-toggle-wrapper') baseClassBinding = true;
    @HostBinding('class.disabled') @Input() disabled = false;
    /** Whether content should be placed upon foreground instead of background */
    @HostBinding('class.contrast') @Input() contrast = false;
    /** Whether ripple should persist on active toggle */
    @HostBinding('class.active-ripple') @Input() activeRipple = true;
    @HostBinding('class.active') checked = false;
    @Input() label = '';
    @Input() color: ThemePalette = 'accent';
    @Input() name: string;
    @Input() disableRipple: boolean;
    @Output() valueChange = new EventEmitter<boolean>();
    public focused = false;

    @HostListener('click') public toggle(): void {
        this.writeValue(!this.checked);
    }

    public get hostElement(): HTMLElement {

        return this.elementRef.nativeElement;
    }

    private onChange: Function;
    private onTouched: Function;

    constructor(
        private focusMonitor: FocusMonitor,
        private elementRef: ElementRef,
    ) {
        super(elementRef);
    }

    ngAfterViewInit(): void {
        this.focusMonitor
            .monitor(this.hostElement, true)
            .subscribe((focusOrigin: FocusOrigin) => {
                if (!focusOrigin) {
                    Promise.resolve().then(() => {
                        this.onTouched();
                    });
                }
            });
    }

    ngOnDestroy(): void {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }

    writeValue(isSelected: boolean): void {
        this.checked = Boolean(isSelected);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    change(event: Event): void {
        event.stopPropagation();
        this.checked = !this.checked;
        this.valueChange.emit(this.checked);
        if (this.onChange) {
            this.onChange(this.checked);
        }
    }

}
