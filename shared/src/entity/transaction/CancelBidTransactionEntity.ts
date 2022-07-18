import { BaseTransactionEntity } from "./BaseTransactionEntity"
import { EntityType, MarketplaceTransactionEntityData } from "../../types";

export class CancelBidTransactionEntity extends BaseTransactionEntity<EntityType.CancelBidTransaction> {
  public populate (order: MarketplaceTransactionEntityData, transactionSignature: string) {
    this.type = EntityType.CancelBidTransaction;
    super.populate(order, transactionSignature);
  }
}