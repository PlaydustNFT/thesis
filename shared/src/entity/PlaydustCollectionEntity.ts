import { attribute, hashKey, table } from "@aws/dynamodb-data-mapper-annotations";
import { TableNames } from "../consts";
import { Entity, EntityType, PlaydustCollectionData, CollectionType } from "../types";


@table(TableNames.Entity)
export class PlaydustCollectionEntity implements Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id: string;

  @attribute()
  createdAt: Date;

  @attribute()
  primaryEntity?: string;

  @attribute()
  type = EntityType.PlaydustCollection;

  @attribute()
  updatedAt: Date;

  @attribute()
  data: PlaydustCollectionData;

  generateGlobalId(): string {
    return [this.type, this.id].join('-');
  }

  populate = (id: string, data: PlaydustCollectionData, options: any) => {
    this.id = id;
    this.globalId = this.generateGlobalId();
    const now = new Date();
    this.createdAt = now; 
    this.updatedAt = now; 
    this.data = data; 
    if(data.type == CollectionType.Metaplex){
        this.primaryEntity = id;
    }
    if(data.type == CollectionType.Derived){
      this.primaryEntity = options.candyMachine;
    }
  }
}

