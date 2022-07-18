import {
    attribute,
    hashKey,
    table,
} from "@aws/dynamodb-data-mapper-annotations";
import { Entity, EntityType, RelatedEntityData} from "../types";
import { GlobalIdDelimiter, TableNames } from "../consts";

type EntityGlobalId = string;
type CollectionId = string;

// TODO: table name should be read from environment var rather than defined in consts
@table(TableNames.Entity)
export class MarketData4CollectionEntity implements Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id: string;

  @attribute()
  primaryEntity: CollectionId;

  @attribute()
  type = EntityType.MarketData4Collection;

  @attribute()
  createdAt: Date;

  @attribute()
  updatedAt: Date;

  @attribute()
  data: RelatedEntityData;

  generateGlobalId = () => {
    return [ this.type, this.id, this.primaryEntity ].join(GlobalIdDelimiter);
  }

  populate = (relatedEntityData: RelatedEntityData, collectionId: CollectionId): void => {
    /** Not sure if we should put the mint address somewhere */
    this.id = relatedEntityData.globalId;
    this.primaryEntity = collectionId;
    this.globalId = this.generateGlobalId();
    const timestamp = new Date();
    this.createdAt = timestamp; 
    this.updatedAt = timestamp; 
    this.data = relatedEntityData;
  }
}