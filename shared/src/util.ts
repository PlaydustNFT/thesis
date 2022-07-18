import { GlobalIdDelimiter, IndexNames } from "./consts";
import jwt, {
  JwtPayload,
} from "jsonwebtoken";
import { EntityType, Marketplace, MarketplaceInstructionType, RelatedEntityData, TriggerSubtype } from "./types";
import { ddbmapper } from '../../shared/src/service/dynamodb'
import { MarketData4CollectionEntity } from "./entity/MarketData4CollectionEntity";
import { OffchainMetadata4CollectionEntity } from "./entity/OffchainMetadata4CollectionEntity";
import { Collection4NFTEntity } from "./entity/Collection4NFTEntity";

// TODO: Use dependency inversion here?

export const buildOrderEntityGlobalId = (type: EntityType.AskOrderState | EntityType.BidOrderState, wallet: string, mint: string, marketplace: Marketplace): string => {
    return type+GlobalIdDelimiter+wallet+GlobalIdDelimiter+mint+GlobalIdDelimiter+marketplace;
}

type MarketplaceTransactionEntityTypes = EntityType.MarketplaceTransactionForNFT | EntityType.MarketplaceTransactionForWallet;
export const buildMarketplaceTransactionEntityGlobalId = (type: MarketplaceTransactionEntityTypes, instructionType: MarketplaceInstructionType, signature: string): string => {
    return type+GlobalIdDelimiter+instructionType+GlobalIdDelimiter+signature;
}

export const buildUserRefreshTokenEntityGlobalId = (type: EntityType.UserRefreshTokenEntity, wallet: string): string => {
    return type+GlobalIdDelimiter+wallet;
}

export const buildNonceEntityGlobalId = (type: EntityType.NonceEntity, nonce: string): string => {
    return type+GlobalIdDelimiter+nonce;
}
export const extractWalletFromToken = (token: string): string => {
      if (!token) {
        console.log(`Invalid Header`);
        throw new Error("Invalid Header");
      }
      return (jwt.decode(token) as JwtPayload).wallet;
};
export const buildMetadataEntityGlobalId = (metadataAddress: string): string => {
    return EntityType.MetaplexOnChainMetadata + GlobalIdDelimiter + metadataAddress;
}
export const buildMintEntityGlobalId = (mintAddress: string): string => {
    return EntityType.MintAddress + GlobalIdDelimiter + mintAddress;
}
export const buildTriggerEntityGlobalId = (source: string, subtype: TriggerSubtype) => {
    return [source, EntityType.Trigger, subtype].join(GlobalIdDelimiter);
}
export const buildOffchainMetadataEntityGlobalId = (id: string): string => {
    return EntityType.MetaplexOffchainMetadata + GlobalIdDelimiter + id;
}
export const buildNFT4CollectionGlobalId = (id: string): string => {
    return EntityType.NFT4Collection + GlobalIdDelimiter + id;
}

export const buildCollection4NFTGlobalId = (id: string): string => {
    return EntityType.Collection4NFT + GlobalIdDelimiter + id;
}

export const getCollectionIds = async (mintAddress: string): Promise<string[]> => {
    const collectionIds: string[] = [];
    for await (const entity of
        ddbmapper.query(
            Collection4NFTEntity,
            { type: EntityType.Collection4NFT, primaryEntity: mintAddress },
            {
              indexName: IndexNames.EntityDb.typePrimaryEntityIndex,
            }
        ))
    {
        collectionIds.push(entity.data);
    }
    return collectionIds;
}

export const createMarketData4CollectionObjects = (relatedEntityData: RelatedEntityData, collectionIds: string[]): MarketData4CollectionEntity[] => {
    const md4Collections: MarketData4CollectionEntity[] = [];
    for (const collectionId of collectionIds) {
        const md = new MarketData4CollectionEntity();
        md.populate(relatedEntityData, collectionId);
        md4Collections.push(md);
    }
    return md4Collections;
}

/** Generalize above function instead of copying */
export const createOffchainMetadata4CollectionObjects = (relatedEntityData: RelatedEntityData, collectionIds: string[], mintAddress: string): OffchainMetadata4CollectionEntity[] => {
    const offchainMd4Collections: OffchainMetadata4CollectionEntity[] = [];
    for (const collectionId of collectionIds) {
        //console.log(`Create OffchainMetadata4Collection: CollectionId=${collectionId}`);
        const md = new OffchainMetadata4CollectionEntity();
        md.populate(relatedEntityData, collectionId, mintAddress);
        offchainMd4Collections.push(md);
    }
    return offchainMd4Collections;
}

export const generateGlobalIdForAsksAndBids = (type, id, primaryEntity, marketplace) => {
    return [type, id, primaryEntity, marketplace].join(GlobalIdDelimiter);
}
