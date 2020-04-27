import { Observable, of } from 'rxjs';

export class MatDialogMock {
    open(arg1, object2) {
        return {
            afterClosed: () => ({ pipe: () => ({ subscribe: () => ({}) }) })
        };
    }
}

export class DialogRefMock {
    constructor(
        private returnValue: any,
    ) { }

    afterClosed(): Observable<any> {
        return of(this.returnValue);
    }
}
