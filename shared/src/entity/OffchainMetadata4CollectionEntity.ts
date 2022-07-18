import {
    attribute,
    hashKey,
    table,
} from "@aws/dynamodb-data-mapper-annotations";
import { Entity, EntityType, RelatedEntityData} from "../types";
import { GlobalIdDelimiter, TableNames } from "../consts";

type EntityGlobalId = string;
type CollectionId = string;

@table(TableNames.Entity)
export class OffchainMetadata4CollectionEntity implements Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id: string;

  @attribute()
  primaryEntity: CollectionId;

  @attribute()
  type = EntityType.OffchainMetadata4Collection;

  @attribute()
  createdAt: Date;

  @attribute()
  updatedAt: Date;

  @attribute()
  data: RelatedEntityData;

  generateGlobalId = () => {
    return [ this.type, this.id, this.primaryEntity ].join(GlobalIdDelimiter);
  }

  populate = (relatedEntityData: RelatedEntityData, collectionId: CollectionId, mintAddress:string): void => {
    /** Not sure if we should put the mint address somewhere */
    this.id = mintAddress;
    this.primaryEntity = collectionId;
    this.globalId = this.generateGlobalId();
    const timestamp = new Date();
    this.createdAt = timestamp; 
    this.updatedAt = timestamp; 
    this.data = relatedEntityData;
  }
}