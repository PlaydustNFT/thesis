import { BaseOrderStateEntity, MintAddress, WalletAddress } from "./BaseOrderStateEntity"
import { EntityType, OrderStateEntityData } from "../../types";

export class BidOrderStateEntity extends BaseOrderStateEntity<EntityType.BidOrderState> {
  public populate (data: OrderStateEntityData, mint: MintAddress, wallet: WalletAddress) {
    this.type = EntityType.BidOrderState;
    super.populate(data, mint, wallet);
  }
}