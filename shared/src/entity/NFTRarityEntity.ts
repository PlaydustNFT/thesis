import {
  attribute,
  hashKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";

import { GlobalIdDelimiter, TableNames } from "../consts";
import { Entity, EntityType, NFTRarityData, StringPublicKey } from "../types";

type CollectionId = string;

@table(TableNames.Entity)
export class NFTRarityEntity implements Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id: CollectionId;

  @attribute()
  primaryEntity: StringPublicKey;

  @attribute()
  type = EntityType.NFTRarity;

  @attribute()
  createdAt: Date;

  @attribute()
  updatedAt: Date;

  @attribute()
  data: NFTRarityData;

  generateGlobalId = () => {
    return [this.type, this.id, this.primaryEntity].join(GlobalIdDelimiter);
  }

  /**
   * @param order 
   * @param transactionSignature 
   */
  public populate (data: NFTRarityData, collectionId: string) {
    this.id = collectionId;
    this.primaryEntity = data.mint;
    this.globalId = this.generateGlobalId();
    const now = new Date();
    this.createdAt = now; 
    this.updatedAt = now; 
    this.data = data;
  }

}
