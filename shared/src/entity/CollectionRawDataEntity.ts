import { attribute, hashKey, table } from "@aws/dynamodb-data-mapper-annotations";
import { TableNames } from "../consts";
import { Entity, EntityType, MagicEdenCollectionRawData, PipelineConfig } from "../types";

type RawData = MagicEdenCollectionRawData;

@table(TableNames.Entity)
export class CollectionRawDataEntity implements Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id: string;

  @attribute()
  createdAt: Date;

  @attribute()
  primaryEntity?: string;

  @attribute()
  type = EntityType.CollectionRawData;

  @attribute()
  updatedAt: Date;

  @attribute()
  data: RawData;
  
  @attribute()
  pipelines: PipelineConfig;

  generateGlobalId(): string {
    return [this.type, this.id].join('-');
  }

  populate = (id: string, primaryEntity: string, data: RawData) => {
    this.id = id;
    this.globalId = this.generateGlobalId();
    this.primaryEntity = primaryEntity;
    const now = new Date();
    this.createdAt = now; 
    this.updatedAt = now; 
    this.data = data; 
  }
}
