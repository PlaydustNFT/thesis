import { BaseTransactionEntity } from "./BaseTransactionEntity"
import { EntityType, MarketplaceTransactionEntityData } from "../../types";
export class AskTransactionEntity extends BaseTransactionEntity<EntityType.AskTransaction> {
  public populate (order: MarketplaceTransactionEntityData, transactionSignature: string) {
    this.type = EntityType.AskTransaction;
    super.populate(order, transactionSignature);
  }
}