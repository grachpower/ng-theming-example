import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NEVER, of } from 'rxjs';
import { Tree } from '../../models/tree/tree.model';
import { AppTestingModule } from '../../testing/app.testing.module';
import { DialogRefMock, MatDialogMock } from '../../testing/mat-dialog.mock';
import { MenuEditorStoreServiceMock } from '../../testing/menu-editor-store.service.mock';
import { headerEntriesStub, headerEntriesStubModified } from '../../testing/stubs/menu-editor-service.stubs';
import { MenuEditorComponent } from './menu-editor.component';
import { MenuEditorStoreService } from './services/menu-editor-store.service';

describe('MenuEditorComponent', () => {
  let component: MenuEditorComponent;
  let fixture: ComponentFixture<MenuEditorComponent>;
  let menuEditorStoreService: MenuEditorStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MenuEditorComponent],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MenuEditorStoreService, useClass: MenuEditorStoreServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuEditorComponent);
    component = fixture.componentInstance;
    menuEditorStoreService = TestBed.get(MenuEditorStoreService);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should load menu content on init', () => {
    const loadContextSpy = spyOn(menuEditorStoreService, 'loadMenuContent').and.callThrough();
    const stubTree = new Tree(headerEntriesStub, 'content');
    const menuTree$ = spyOnProperty(menuEditorStoreService, 'menuTree$', 'get').and.returnValue(of(stubTree));

    component.ngOnInit();
    expect(loadContextSpy).toHaveBeenCalled();
    expect(component.treeData$.value).toEqual(new Tree(headerEntriesStub, 'content'));
  });

  it('should load load empty array data if error', () => {
    const loadContextSpy = spyOn(menuEditorStoreService, 'loadMenuContent').and.callThrough();
    const stubTree = new Tree([], 'content');
    const menuTree$ = spyOnProperty(menuEditorStoreService, 'menuTree$', 'get').and.returnValue(NEVER);

    component.ngOnInit();
    expect(loadContextSpy).toHaveBeenCalled();
    expect(component.treeData$.value).toEqual(stubTree);
  });

  describe('confirm', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.confirm();
      expect(matDialogStub.open).toHaveBeenCalled();
    });

    it('should save data if answer "true"', () => {
      const stubTree = new Tree(headerEntriesStub, 'content');
      spyOnProperty(menuEditorStoreService, 'menuTree$', 'get').and.returnValue(of(stubTree));
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(MatDialog);
      spyOn(matDialogStub, 'open').and.returnValue(new DialogRefMock(true));
      const updateMenuSpy = spyOn(menuEditorStoreService, 'updateMenuContent').and.callThrough();
      spyOn(menuEditorStoreService, 'desirializeMenuTree').and.returnValue(headerEntriesStubModified);

      component.ngOnInit();
      const tree = component.treeData$.value;
      tree.children[0].children[0].removeNode(1);
      component.confirm();

      const updatedTree = component.treeData$.value;

      expect(updatedTree.getSerializedSource()).toEqual(headerEntriesStubModified);
      expect(updateMenuSpy).toHaveBeenCalledWith(headerEntriesStubModified);
    });

    it('should not save data if answer "false"', () => {
      const stubTree = new Tree(headerEntriesStub, 'content');
      spyOnProperty(menuEditorStoreService, 'menuTree$', 'get').and.returnValue(of(stubTree));
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(MatDialog);
      spyOn(matDialogStub, 'open').and.returnValue(new DialogRefMock(false));
      const updateMenuSpy = spyOn(menuEditorStoreService, 'updateMenuContent').and.callThrough();
      spyOn(menuEditorStoreService, 'desirializeMenuTree').and.returnValue(headerEntriesStub);

      component.ngOnInit();
      const tree = component.treeData$.value;
      tree.children[0].children[0].removeNode(1);
      component.confirm();

      const updatedTree = component.treeData$.value;

      expect(updatedTree.getSerializedSource()).toEqual(headerEntriesStubModified);
      expect(updateMenuSpy).not.toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.cancel();
      expect(matDialogStub.open).toHaveBeenCalled();
    });

    it('should not revert data if anwser "false"', () => {
      const stubTree = new Tree(headerEntriesStub, 'content');
      spyOnProperty(menuEditorStoreService, 'menuTree$', 'get').and.returnValue(of(stubTree));
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(MatDialog);
      spyOn(matDialogStub, 'open').and.returnValue(new DialogRefMock(false));
      const updateMenuSpy = spyOn(menuEditorStoreService, 'updateMenuContent').and.callThrough();

      component.ngOnInit();
      const tree = component.treeData$.value;
      tree.children[0].children[0].removeNode(1);
      component.cancel();

      const updatedTree = component.treeData$.value;

      expect(updateMenuSpy).not.toHaveBeenCalled();
      expect(updatedTree.getSerializedSource()).not.toEqual(headerEntriesStub);
      expect(updatedTree.getSerializedSource()).toEqual(headerEntriesStubModified);
    });

    it('should revert data if answer "true"', () => {
      const stubTree = new Tree(headerEntriesStub, 'content');
      spyOnProperty(menuEditorStoreService, 'menuTree$', 'get').and.returnValue(of(stubTree));
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(MatDialog);
      spyOn(matDialogStub, 'open').and.returnValue(new DialogRefMock(true));
      spyOn(menuEditorStoreService, 'getOriginalEntriesTree').and.returnValue(new Tree(headerEntriesStub, 'content'));
      const updateMenuSpy = spyOn(menuEditorStoreService, 'updateMenuContent').and.callThrough();

      component.ngOnInit();
      const tree = component.treeData$.value;
      tree.children[0].children[0].removeNode(1);

      component.cancel();

      const updatedTree = component.treeData$.value;

      expect(updateMenuSpy).not.toHaveBeenCalled();
      expect(updatedTree.getSerializedSource()).toEqual(headerEntriesStub);
      expect(updatedTree.getSerializedSource()).not.toEqual(headerEntriesStubModified);
    });
  });
});
