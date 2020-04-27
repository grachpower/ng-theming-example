import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TitleService {

    private readonly title$ = new BehaviorSubject<string>(this.title.getTitle());

    constructor(
        private title: Title,
    ) {
    }

    titleChanges(): Observable<string> {
        return this.title$.asObservable();
    }

    setTitle(newTitle: string, metaTitle?: string): void {
        this.title.setTitle(metaTitle || newTitle);
        this.title$.next(newTitle);
    }

}
