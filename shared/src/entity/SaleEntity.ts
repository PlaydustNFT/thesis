import {
    attribute,
    hashKey,
    table,
  } from "@aws/dynamodb-data-mapper-annotations";
  import { v4 as uuid } from "uuid";
  import { GlobalIdDelimiter, TableNames } from "../consts";
  import { Entity, EntityType, Marketplace, OrderStateEntityData, SalesEntityData } from "../types";
  
  export type MintAddress = string;
  export type WalletAddress = string;
  
  const TABLE_NAME = process.env.ENTITY_TABLE_NAME || 'playdust-parrotfish-prod-entitydb';
  @table(TABLE_NAME)
  export class SaleEntity implements Entity {
    @hashKey()
    globalId: string;
  
    @attribute()
    id: string;
  
    @attribute()
    primaryEntity: MintAddress;
  
    @attribute()
    type = EntityType.Sale;
  
    @attribute()
    createdAt: Date;
  
    @attribute()
    updatedAt: Date;
  
    @attribute()
    data: SalesEntityData;
  
    generateGlobalId = () => {
        //dodaj ovdje jos wallet od buyera
      return [EntityType.Sale, this.data.marketplace, this.id].join(GlobalIdDelimiter);
    }
  
    /**
     * @param data
     * @param transactionSignature 
     */
    public populate (data: OrderStateEntityData, mint: MintAddress) {
      this.data = data;
      this.id = uuid();
      this.primaryEntity = mint;
      this.globalId = this.generateGlobalId();
  
      const now = new Date();
      this.createdAt = now; 
      this.updatedAt = now; 
    }
  }
  