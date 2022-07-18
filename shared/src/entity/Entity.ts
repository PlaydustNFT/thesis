import { attribute, hashKey, table } from "@aws/dynamodb-data-mapper-annotations";
import { TableNames } from "../consts";
import { CollectionPriceData, EntityType, PipelineConfig } from "../types";

@table(TableNames.Entity)
export class Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id?: string;

  @attribute()
  createdAt?: Date;

  @attribute()
  primaryEntity?: string;

  @attribute()
  type?: EntityType;

  @attribute()
  updatedAt?: Date;

  @attribute()
  data?: any;
  
  @attribute()
  pipelines?: PipelineConfig;

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
