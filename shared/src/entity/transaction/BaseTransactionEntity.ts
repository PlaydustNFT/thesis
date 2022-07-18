import {
  attribute,
  hashKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";

import { GlobalIdDelimiter, TableNames } from "../../consts";
import { Entity, EntityType, MarketplaceTransactionEntityData, StringPublicKey } from "../../types";

type TransactionSignature = string;

const TABLE_NAME = process.env.ENTITY_TABLE_NAME || 'playdust-parrotfish-prod-entitydb';
@table(TABLE_NAME)
export class BaseTransactionEntity <T extends EntityType> implements Entity {
  @hashKey()
  globalId: string;

  @attribute()
  id: TransactionSignature;

  @attribute()
  primaryEntity: StringPublicKey;

  @attribute()
  type: T;

  @attribute()
  createdAt: Date;

  @attribute()
  updatedAt: Date;

  @attribute()
  data: MarketplaceTransactionEntityData;

  generateGlobalId = () => {
    return [this.type, this.id].join(GlobalIdDelimiter);
  }

  /**
   * @param order 
   * @param transactionSignature 
   */
  public populate (order: MarketplaceTransactionEntityData, transactionSignature: TransactionSignature) {
    this.id = transactionSignature;
    this.globalId = this.generateGlobalId();
    this.primaryEntity = order.tokenMintAccount.toString();
    const now = new Date();
    this.createdAt = now; 
    this.updatedAt = now; 
    this.data = order;
  }

}
