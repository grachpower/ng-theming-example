import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { Tree, TreeNode } from '../../../../../models/tree/tree.model';
import { AppTestingModule } from '../../../../../testing/app.testing.module';
import { headerEntriesStub } from '../../../../../testing/stubs/menu-editor-service.stubs';
import { SecondLevelLinkBlock } from '../../../models/header-entry-blocks.model';
import { SecondLevelLinkBlockComponent } from './second-level-link-block.component';
import { ToggleModule } from '../../../../../components/toggle/toggle.module';

describe('SecondLevelLinkBlock.TsComponent', () => {
  let component: SecondLevelLinkBlockComponent;
  let fixture: ComponentFixture<SecondLevelLinkBlockComponent>;
  let expectedTree: Tree<any>;
  let expectedNode: TreeNode<SecondLevelLinkBlock>;
  let expectedForm: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        AppTestingModule,
      ],
      declarations: [ SecondLevelLinkBlockComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    expectedTree = new Tree<any>(headerEntriesStub, 'content');
    expectedNode = expectedTree.children[0];
    expectedForm = new FormGroup({
      type: new FormControl(''),
    });
    fixture = TestBed.createComponent(SecondLevelLinkBlockComponent);
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

    expect(component.form.value).toEqual({type: '', name: '', url: '', colored: null});
  });


  it('should set values from parent node if defined', () => {
    component.node.value = {type: '', name: 'foo', url: 'bar', colored: true} as any;

    fixture.detectChanges();

    expect(component.form.value).toEqual({type: '', name: 'foo', url: 'bar', colored: true});
  });
});
