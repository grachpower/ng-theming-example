import { Observable, of } from 'rxjs';
import { Tree } from '../models/tree/tree.model';
import { HeaderEntryModel } from '../pages/menu-editor/models/header-entry.model';

export class MenuEditorStoreServiceMock {
    public get menuTree$(): Observable<Tree<HeaderEntryModel>> {
        return of(new Tree([], 'content'));
    }

    public loadMenuContent(): void { }

    public updateMenuContent(entries: HeaderEntryModel[]): void {
    }

    public constructMenuTree(entries: HeaderEntryModel[]) { }

    public desirializeMenuTree(tree: Tree<HeaderEntryModel>) { }

    public getOriginalEntriesTree() { }
}