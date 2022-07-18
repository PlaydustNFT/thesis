import {
    attribute,
    hashKey,
    table,
  } from "@aws/dynamodb-data-mapper-annotations";
import { TableNames } from "../consts";
  import {buildMintEntityGlobalId} from '../../../shared/src/util';
  import { Entity, EntityType, MintEntityData} from "../types";

  type mintAddress = string;
  
  @table(TableNames.Entity)
  export class MintAddressEntity implements Entity {
    @hashKey()
    globalId: string;
  
    @attribute()
    id: mintAddress;
  
    @attribute()
    primaryEntity: null;
  
    @attribute()
    type: EntityType.MintAddress;
  
    @attribute()
    createdAt: Date;
  
    @attribute()
    updatedAt: Date;
  
    @attribute()
    pipelines: null;
  
    @attribute()
    data: MintEntityData;
  
    populate = (data: MintEntityData, mintAddress: mintAddress) => {
      this.globalId = buildMintEntityGlobalId(mintAddress);
      this.id = mintAddress;
      this.type = EntityType.MintAddress;
      const timestamp = new Date();
      this.createdAt = timestamp; 
      this.updatedAt = timestamp; 
      this.data = data;
    }
  }