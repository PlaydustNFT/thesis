import { BaseTransactionEntity } from "./BaseTransactionEntity"
import { EntityType, MarketplaceTransactionEntityData } from "../../types";

export class CancelAskTransactionEntity extends BaseTransactionEntity<EntityType.CancelAskTransaction> {
  public populate (order: MarketplaceTransactionEntityData, transactionSignature: string) {
    this.type = EntityType.CancelAskTransaction;
    super.populate(order, transactionSignature);
  }
}