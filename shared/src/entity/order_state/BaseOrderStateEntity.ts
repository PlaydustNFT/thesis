import {
  attribute,
  hashKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";

import { GlobalIdDelimiter, TableNames } from "../../consts";
import { Entity, EntityType, OrderStateEntityData } from "../../types";

export type MintAddress = string;
export type WalletAddress = string;

const TABLE_NAME = process.env.ENTITY_TABLE_NAME || 'playdust-parrotfish-prod-entitydb';
@table(TABLE_NAME)
export class BaseOrderStateEntity <T extends EntityType> implements Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id: string;

  @attribute()
  primaryEntity: MintAddress;

  @attribute()
  type: T;

  @attribute()
  createdAt: Date;

  @attribute()
  updatedAt: Date;

  @attribute()
  data: OrderStateEntityData;

  generateGlobalId = () => {
    return [this.type, this.id, this.primaryEntity, this.data.marketplace].join(GlobalIdDelimiter);
  }

  /**
   * @param data
   * @param transactionSignature 
   */
  public populate (data: OrderStateEntityData, mint: MintAddress, wallet: WalletAddress) {
    this.data = data;
    this.id = wallet;
    this.primaryEntity = mint;
    this.globalId = this.generateGlobalId();

    const now = new Date();
    this.createdAt = now; 
    this.updatedAt = now; 
  }
}
