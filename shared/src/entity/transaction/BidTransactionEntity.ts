import { BaseTransactionEntity } from "./BaseTransactionEntity"
import { EntityType, MarketplaceTransactionEntityData } from "../../types";

export class BidTransactionEntity extends BaseTransactionEntity<EntityType.BidTransaction> {
  public populate (order: MarketplaceTransactionEntityData, transactionSignature: string) {
    this.type = EntityType.BidTransaction;
    super.populate(order, transactionSignature);
  }
}