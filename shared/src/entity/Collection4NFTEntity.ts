import {
    attribute,
    hashKey,
    table,
} from "@aws/dynamodb-data-mapper-annotations";
import { Entity, EntityType} from "../types";
import { buildCollection4NFTGlobalId } from '../util';
import { GlobalIdDelimiter, TableNames } from "../consts";
  
type CollectionId = string;
type MintAddress = string;

@table(TableNames.Entity)
export class Collection4NFTEntity implements Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id: string;

  @attribute()
  primaryEntity: MintAddress;

  @attribute()
  type: EntityType.Collection4NFT;

  @attribute()
  createdAt: Date;

  @attribute()
  updatedAt: Date;

  @attribute()
  data: CollectionId; 

  populate = (data: CollectionId, primaryEntity: MintAddress): void => {
    this.id = primaryEntity + GlobalIdDelimiter + data;
    this.globalId = buildCollection4NFTGlobalId(this.id);
    this.type = EntityType.Collection4NFT;
    this.primaryEntity = primaryEntity;
    const timestamp = new Date();
    this.createdAt = timestamp; 
    this.updatedAt = timestamp; 
    this.data = data;
  }
}