import { attribute, hashKey, table } from "@aws/dynamodb-data-mapper-annotations";
import { TableNames } from "../consts";
import { CollectionPriceData, Entity, EntityType } from "../types";

@table(TableNames.Entity)
export class CollectionPriceDataEntity implements Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id: string;

  @attribute()
  createdAt: Date;

  @attribute()
  primaryEntity?: string;

  @attribute()
  type = EntityType.CollectionPriceData;

  @attribute()
  updatedAt: Date;

  @attribute()
  data: CollectionPriceData;

  generateGlobalId(): string {
    return [this.type, this.id].join('-');
  }

  populate = (id: string, primaryEntity: string, data: CollectionPriceData) => {
    this.id = id;
    this.globalId = this.generateGlobalId();
    this.primaryEntity = primaryEntity;
    const now = new Date();
    this.createdAt = now; 
    this.updatedAt = now; 
    this.data = data; 
  }
}
