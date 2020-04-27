import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BlockObject } from '../../../models/block-object.model';
import { Tree } from '../../../models/tree/tree.model';
import { HeaderEntryModel } from '../models/header-entry.model';

export const childrenField = 'content';

@Injectable()
export class MenuEditorStoreService  implements OnDestroy {
  private readonly menuEntriesData$ =
    new BehaviorSubject<Tree<HeaderEntryModel>>(new Tree<HeaderEntryModel>([], childrenField));
  private readonly destroyed$ = new Subject<void>();
  private originalEntries: HeaderEntryModel[];
  private originalBlock: BlockObject<HeaderEntryModel[]>;

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public get menuTree$(): Observable<Tree<HeaderEntryModel>> {
    return this.menuEntriesData$.asObservable();
  }

  public loadMenuContent(): void {
    this.originalEntries = [];
    this.menuEntriesData$.next(this.constructMenuTree([]));
  }

  public updateMenuContent(entries: HeaderEntryModel[]): void {
    const block = { ...this.originalBlock, content: entries } as BlockObject<HeaderEntryModel[]>;
  }

  public constructMenuTree(entries: HeaderEntryModel[]): Tree<HeaderEntryModel> {
    return new Tree<HeaderEntryModel>(entries, childrenField);
  }

  public desirializeMenuTree(tree: Tree<HeaderEntryModel>): HeaderEntryModel[] {
    return tree.getSerializedSource();
  }

  public getOriginalEntriesTree(): Tree<HeaderEntryModel> {
    return this.constructMenuTree(this.originalEntries);
  }
}
