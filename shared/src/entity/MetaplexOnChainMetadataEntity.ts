import {
    attribute,
    hashKey,
    table,
} from "@aws/dynamodb-data-mapper-annotations";
import {Metadata, Entity, EntityType} from "../types";
import {buildMetadataEntityGlobalId} from '../../../shared/src/util';
import { TableNames } from "../consts";
  
  type metadataAddress = string;
  type mintAddress = string;

  @table(TableNames.Entity)
  export class MetaplexOnChainMetadataEntity implements Entity {
    @hashKey()
    globalId: string;
  
    @attribute()
    id: metadataAddress;
  
    @attribute()
    primaryEntity: mintAddress;
  
    @attribute()
    type: EntityType.MetaplexOnChainMetadata;
  
    @attribute()
    createdAt: Date;
  
    @attribute()
    updatedAt: Date;

    //TODO PIPELINE
    @attribute()
    pipelines: null;
  
    @attribute()
    data: Metadata;
  
populate = (data: Metadata, metadataAddress: metadataAddress, mintAddress: mintAddress): void => {
      this.globalId = buildMetadataEntityGlobalId(metadataAddress);
      this.id = metadataAddress;
      this.type = EntityType.MetaplexOnChainMetadata;
      this.primaryEntity = mintAddress;
      const timestamp = new Date();
      this.createdAt = timestamp; 
      this.updatedAt = timestamp; 
      this.data = data;
    }
  }