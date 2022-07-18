import { BaseOrderStateEntity, MintAddress, WalletAddress } from "./BaseOrderStateEntity"
import { EntityType, OrderStateEntityData } from "../../types";

export class AskOrderStateEntity extends BaseOrderStateEntity<EntityType.AskOrderState> {
  public populate (data: OrderStateEntityData, mint: MintAddress, wallet: WalletAddress) {
    this.type = EntityType.AskOrderState;
    super.populate(data, mint, wallet);
  }
}