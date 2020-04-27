import { BlockObjectTypes } from '../config/block-object.enum';

export class BlockObject<T> {
  public id?: string;
  public objectId: string;
  public objectType: BlockObjectTypes;
  public content: T;
}
