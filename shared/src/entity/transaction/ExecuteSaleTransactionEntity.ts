import { BaseTransactionEntity } from "./BaseTransactionEntity"
import { EntityType, MarketplaceTransactionEntityData } from "../../types";

export class ExecuteSaleTransactionEntity extends BaseTransactionEntity<EntityType.ExecuteSaleTransaction> {
  public populate (order: MarketplaceTransactionEntityData, transactionSignature: string) {
    this.type = EntityType.ExecuteSaleTransaction;
    super.populate(order, transactionSignature);
  }
}