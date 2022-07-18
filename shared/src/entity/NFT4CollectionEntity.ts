import {
    attribute,
    hashKey,
    table,
} from "@aws/dynamodb-data-mapper-annotations";
import { Entity, EntityType} from "../types";
import {buildNFT4CollectionGlobalId} from '../../../shared/src/util';
import { GlobalIdDelimiter } from "../../../shared/src/consts";
import { TableNames } from "../consts";
  
  type collectionID = string;
  type mintAddress = string;

@table(TableNames.Entity)
export class NFT4CollectionEntity implements Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id: string;

  @attribute()
  primaryEntity: collectionID;

  @attribute()
  type: EntityType.NFT4Collection;

  @attribute()
  createdAt: Date;

  @attribute()
  updatedAt: Date;

  //TODO PIPELINE
  @attribute()
  pipelines: null;

  @attribute()
  data: mintAddress;


  populate = (data: mintAddress, collectionID: collectionID): void => {
    this.id = collectionID + GlobalIdDelimiter + data;
    this.globalId = buildNFT4CollectionGlobalId(this.id);
    this.type = EntityType.NFT4Collection;
    this.primaryEntity = collectionID;
    const timestamp = new Date();
    this.createdAt = timestamp; 
    this.updatedAt = timestamp; 
    this.data = data;
  }
}