import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNodeComponent } from './create-node.component';
import { AppTestingModule } from '../../../../testing/app.testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Tree, TreeNode } from '../../../../models/tree/tree.model';
import { headerEntriesStub } from '../../../../testing/stubs/menu-editor-service.stubs';
import { CreateNodeBlocksModule } from '../create-node-blocks/create-node-levels.module';
import { FormGroup, Validators } from '@angular/forms';
import { EntryType } from '../../config/entry-type.enum';
import { LevelTypes } from '../../config/level.types';
import { cloneDeep } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DialogRefMock } from '../../../../testing/mat-dialog.mock';

describe('CreateNodeComponent', () => {
  let component: CreateNodeComponent;
  let fixture: ComponentFixture<CreateNodeComponent>;
  let expectedTree: Tree<any>;
  let expectedNode: TreeNode<any>;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ AppTestingModule, CreateNodeBlocksModule ],
      declarations: [ CreateNodeComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNodeComponent);
    component = fixture.componentInstance;
    dialog = TestBed.get(MatDialog);
    expectedTree = new Tree<any>(headerEntriesStub, 'content');
    expectedNode = expectedTree.children[0];
    component.node = expectedNode;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should use mutable node instance on init', () => {
    fixture.detectChanges();

    expect(component.currentNode).toEqual(component.node);

    component.node.value = {} as any;

    expect(component.currentNode).toEqual(component.node);
  });

  it('should create form with "type" control', () => {
    fixture.detectChanges();

    expect(component.treeNodeForm).toBeDefined();
    expect(component.treeNodeForm instanceof FormGroup).toBeTruthy();
    expect(component.treeNodeForm.get('type')).toBeTruthy();
  });

  it('should look for type control change', () => {
    const watchForEntryTypeSpy = spyOn(component, 'lookForEntryTypeChange').and.callThrough();

    fixture.detectChanges();

    expect(watchForEntryTypeSpy).toHaveBeenCalled();
  });

  describe('submit form', () => {
    it('should sumbit valid form', () => {
      fixture.detectChanges();

      const markAllTouchedSpy = spyOn(component.treeNodeForm, 'markAllAsTouched').and.callThrough();
      const nodeChangeSpy = spyOn(component.nodeChange, 'emit').and.callThrough();

      component.treeNodeForm.get('type').setValue(EntryType.LINK_BLOCK);
      component.formSubmit();

      expect(markAllTouchedSpy).toHaveBeenCalled();
      expect(nodeChangeSpy).toHaveBeenCalledWith(component.currentNode);
      expect(component.currentNode.value).toEqual(component.treeNodeForm.value);
    });

    it('should do nothing if form not valid', () => {
      fixture.detectChanges();

      const markAllTouchedSpy = spyOn(component.treeNodeForm, 'markAllAsTouched').and.callThrough();
      const nodeChangeSpy = spyOn(component.nodeChange, 'emit').and.callThrough();

      component.treeNodeForm.get('type').setValue(EntryType.LINK_BLOCK);
      component.formSubmit();

      expect(markAllTouchedSpy).toHaveBeenCalled();
      expect(nodeChangeSpy).toHaveBeenCalledWith(component.currentNode);
      expect(component.currentNode.value).toEqual(component.treeNodeForm.value);
    });
  });

  describe('delete current node', () => {
    it('should delete current node if answer ok', () => {
      spyOn(dialog, 'open').and.returnValue(new DialogRefMock(true));
      const deleteNodeSpy = spyOn(component.deleteNode, 'emit').and.callThrough();

      component.deleteCurrentNode();

      expect(deleteNodeSpy).toHaveBeenCalledWith(component.node);
    });

    it('should do nothing if answer "false"', () => {
      spyOn(dialog, 'open').and.returnValue(new DialogRefMock(false));
      const deleteNodeSpy = spyOn(component.deleteNode, 'emit').and.callThrough();

      expect(deleteNodeSpy).not.toHaveBeenCalled();
    });
  });

  describe('getAvailabeEntryTypes', () => {
    it('first level check available types', () => {
      component.node.level = LevelTypes.FIRST;
      expect(component.availabeEntryTypes).toEqual([ EntryType.FIRST_LEVEL ]);
    });

    it('second level check available types', () => {
      component.node.level = LevelTypes.SECOND;
      expect(component.availabeEntryTypes).toEqual([ EntryType.SECOND_LEVEL, EntryType.SECOND_LEVEL_LINK ]);
    });

    it('third level check available types', () => {
      component.node.level = LevelTypes.THIRD;
      expect(component.availabeEntryTypes).toEqual([ EntryType.LINK_BLOCK, EntryType.BANNER, EntryType.WIDE_BANNER]);
    });

    it('fourth level check available types', () => {
      component.node.level = LevelTypes.FOURTH;
      expect(component.availabeEntryTypes).toEqual([ EntryType.OPERATOR_LINK, EntryType.LINK, EntryType.HIGHLIGHTED_LINK ]);
    });
  });

  describe('cancel', () => {
    it('should cancel create node', () => {
      const cancelNodeSpy = spyOn(component.cancelNodeCreation, 'emit').and.callThrough();

      component.cancel();

      expect(cancelNodeSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should check if current form is valid', () => {
    fixture.detectChanges();
    expect(component.isFormValid()).toEqual(component.treeNodeForm.valid);
  });

  describe('lookForEntryTypeChange', () => {
    it('should set parent node type if defined', () => {
      const typeControlSpy = spyOn(component.entryTypeControl, 'setValue').and.callThrough();
      expect(component.node.value.type).toBeDefined();

      fixture.detectChanges();

      expect(typeControlSpy).toHaveBeenCalled();
    });

    it('should pick first option if node type not defined', () => {
      const availableEntryTypesMock = spyOnProperty(component, 'availabeEntryTypes').and.returnValue([EntryType.LINK_BLOCK]);
      const typeControlSpy = spyOn(component.entryTypeControl, 'setValue').and.callThrough();
      expect(component.node.value.type).toBeDefined();
      const newNode = cloneDeep(component.node);
      component.node = { ...newNode, value: { type: null } } as any;

      fixture.detectChanges();

      expect(component.entryTypeControl.value).toEqual(EntryType.LINK_BLOCK);
      expect(availableEntryTypesMock).toHaveBeenCalled();
      expect(typeControlSpy).toHaveBeenCalled();
    });
  });
});
