import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { Tree, TreeNode } from '../../../../../models/tree/tree.model';
import { AppTestingModule } from '../../../../../testing/app.testing.module';
import { headerEntriesStub } from '../../../../../testing/stubs/menu-editor-service.stubs';
import { WideBannerBlock } from '../../../models/header-entry-blocks.model';
import { WideBannerBlockComponent } from './wide-banner-block.component';

describe('WideBannerBlockComponent', () => {
  let component: WideBannerBlockComponent;
  let fixture: ComponentFixture<WideBannerBlockComponent>;
  let expectedTree: Tree<any>;
  let expectedNode: TreeNode<WideBannerBlock>;
  let expectedForm: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ AppTestingModule ],
      declarations: [ WideBannerBlockComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    expectedTree = new Tree<any>(headerEntriesStub, 'content');
    expectedNode = expectedTree.children[0];
    expectedForm = new FormGroup({
      type: new FormControl(''),
    });
    fixture = TestBed.createComponent(WideBannerBlockComponent);
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

    expect(component.form.value).toEqual({type: '', name: '', imageUrl: '', url: ''});
  });


  it('should set values from parent node if defined', () => {
    component.node.value = {type: '', name: 'foo', imageUrl: 'bar', url: 'baz'} as any;

    fixture.detectChanges();

    expect(component.form.value).toEqual({type: '', name: 'foo', imageUrl: 'bar', url: 'baz'});
  });
});
