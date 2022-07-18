import { attribute, hashKey, table } from "@aws/dynamodb-data-mapper-annotations";
import { TableNames } from "../consts";
import { CollectionAttributeData, Entity, EntityType } from "../types";

@table(TableNames.Entity)
export class CollectionAttributeDataEntity implements Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id: string;

  @attribute()
  createdAt: Date;
  
  @attribute()
  primaryEntity?: string;

  @attribute()
  type = EntityType.CollectionAttributeData;

  @attribute()
  updatedAt: Date;

  @attribute()
  data: CollectionAttributeData;

  generateGlobalId(): string {
    return [this.type, this.id].join('-');
  }

  populate = (id: string, primaryEntity: string, data: CollectionAttributeData) => {
    this.id = id;
    this.globalId = this.generateGlobalId();
    this.primaryEntity = primaryEntity;
    const now = new Date();
    this.createdAt = now; 
    this.updatedAt = now; 
    this.data = data; 
  }
}
