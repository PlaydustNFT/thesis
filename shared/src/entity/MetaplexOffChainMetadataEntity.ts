import {
  attribute,
  hashKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import {v4 as uuidv4} from 'uuid';
import {buildOffchainMetadataEntityGlobalId} from '../../../shared/src/util';
import { Entity, EntityType, OffChainMetadata} from "../types";
import {  TableNames } from "../consts";
 

type mintAddress = string;

@table(TableNames.Entity)
export class MetaplexOffChainMetadataEntity implements Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id: string;

  @attribute()
  primaryEntity: mintAddress;

  @attribute()
  type: EntityType.MetaplexOffchainMetadata;

  @attribute()
  createdAt: Date;

  @attribute()
  updatedAt: Date;

  //TODO PIPELINE
  @attribute()
  pipelines: null;

  @attribute()
  data: OffChainMetadata;

  populate = (data: OffChainMetadata, mintAddress: mintAddress, uri: string) => {
    this.id = uri;
    this.globalId = buildOffchainMetadataEntityGlobalId(this.id);
    this.type = EntityType.MetaplexOffchainMetadata;
    this.primaryEntity = mintAddress;
    const now = new Date();
    this.createdAt = now; 
    this.updatedAt = now; 
    this.data = data;
  }
}