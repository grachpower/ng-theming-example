import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { Tree, TreeNode } from '../../../../../models/tree/tree.model';
import { AppTestingModule } from '../../../../../testing/app.testing.module';
import { headerEntriesStub } from '../../../../../testing/stubs/menu-editor-service.stubs';
import { HighlightedLinkBlock } from '../../../models/header-entry-blocks.model';
import { HighlightedLinkBlockComponent } from './highlighted-link-block.component';

describe('HighlightedLinkBlockComponent', () => {
  let component: HighlightedLinkBlockComponent;
  let fixture: ComponentFixture<HighlightedLinkBlockComponent>;
  let expectedTree: Tree<any>;
  let expectedNode: TreeNode<HighlightedLinkBlock>;
  let expectedForm: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ AppTestingModule ],
      declarations: [ HighlightedLinkBlockComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    expectedTree = new Tree<any>(headerEntriesStub, 'content');
    expectedNode = expectedTree.children[0];
    expectedForm = new FormGroup({
      type: new FormControl(''),
    });
    fixture = TestBed.createComponent(HighlightedLinkBlockComponent);
    component = fixture.componentInstance;

    component.node = expectedNode;
    component.form = expectedForm;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set empty form if node empty', () => {
    component.node.value = {type: ''} as any;

    fixture.detectChanges();

    expect(component.form.value).toEqual({type: '', name: '', url: '', isButton: false, inNewWindow: false});
  });


  it('should set values from parent node if defined', () => {
    component.node.value = {type: '', name: 'foo', url: 'bar', isButton: true, inNewWindow: true} as any;

    fixture.detectChanges();

    expect(component.form.value).toEqual({type: '', name: 'foo', url: 'bar', isButton: true, inNewWindow: true});
  });
});
