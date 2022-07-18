import { ConfirmedTransactionMeta, CompiledInstruction, Message, PublicKey, TransactionSignature, LAMPORTS_PER_SOL } from "@solana/web3.js"

// FIXME:   This file is becoming too large to maintain.
//          Split into files and put into ./types/ directory.

export enum MarketplaceInstructionType {
    Unknown = 'UNKNOWN',
    Bid = 'BID',
    CancelBid = 'CANCEL_BID',
    Ask = 'ASK',
    CancelAsk = 'CANCEL_ASK',
    ExecuteSale = 'EXECUTE_SALE',
    Transfer = 'TRANSFER',
};

export enum Marketplace {
    MagicEdenV1 = 'MagicEdenV1',
    MagicEdenV2 = 'MagicEdenV2',
    Playdust = 'Playdust'
};

export class MarketplaceTransactionEntityData {
    buyerWalletAccount: StringPublicKey;
    buyerPdaAccount: StringPublicKey;
    sellerWalletAccount: StringPublicKey;
    sellerPdaAccount: StringPublicKey;
    tokenMintAccount: StringPublicKey;
    created: number;
    signature: TransactionSignature;
    marketplace: Marketplace;
    pdaData: string;
    price: number;

    constructor(
        buyerWalletAccount: StringPublicKey,
        buyerPdaAccount: StringPublicKey,
        sellerWalletAccount: StringPublicKey,
        sellerPdaAccount: StringPublicKey,
        tokenMintAccount: StringPublicKey,
        created: number,
        signature: TransactionSignature,
        marketplace: Marketplace,
        pdaData: string,
        price: number,
    )
    {
        this.buyerWalletAccount = buyerWalletAccount;
        this.buyerPdaAccount = buyerPdaAccount;
        this.sellerWalletAccount = sellerWalletAccount;
        this.sellerPdaAccount = sellerPdaAccount;
        this.tokenMintAccount = tokenMintAccount;
        this.created = created;
        this.signature = signature;
        this.marketplace = marketplace;
        this.pdaData = pdaData;
        this.price = price;
    }
};

export class MarketplaceTransactionEntityDataWithType extends MarketplaceTransactionEntityData {
    type: EntityType;
};

export interface CollectionMetaData {
    name?: string;
    symbol?: string;
    elementCount?: number;
    updateAuthority?: string;
    creator?: string;
    description?: string;
    family?: string;
    image?: string;
}

export interface CollectionAttributeData {
    attributes: CollectionAttribute[];
}

export interface CollectionPriceData {
    volume: CollectionVolume;
    floorPrice: CollectionPrice;
    ceilingPrice: CollectionPrice;
}

export interface CollectionAttribute {
    name?: string;
    key?: string;
    values: CollectionAttributeValue[];
}
    
export interface CollectionAttributeValue {
    value: string;
    count: number;
    rarity: number;
}


type TransactionInterface = any;
export class ParseableTransaction {
    Tx: TransactionInterface;
    BlockTime: number;
    Message: Message;
    Signature: TransactionSignature;
    Instructions: CompiledInstruction[];
    constructor(txData: any) {
        this.Tx = txData;
        this.BlockTime = txData.blockTime;
        this.Message = txData.transaction.message;
        this.Signature = txData.transaction.signatures[0];
        this.Instructions = this.Message.instructions;
    }
};

export class OrderStateEntityData {
    active?: boolean;
    price?: number;
    marketplace?: Marketplace;
    blockTime?: number;
    signature?: TransactionSignature;
    constructor() {}
}

export class SalesEntityData {
    active?: boolean;
    price?: number;
    marketplace?: Marketplace;
    bidWallet?: string;
    askWallet?: string;
    txHash?: TransactionSignature;
    blockTime?: number;
    constructor() {}
}

export class OrderStateEntityDataWithWallet extends OrderStateEntityData {
    wallet?: string;
    constructor(orderState?: OrderStateEntityData, wallet?: string) {
        super();
        this.active = orderState.active
        this.blockTime = orderState.blockTime
        this.marketplace = orderState.marketplace
        this.price = orderState.price / LAMPORTS_PER_SOL
        this.signature = orderState.signature
        this.wallet = wallet
    }
}

export class NonceEntityData {
    nonce: string;
    expireTime: number;
    constructor(nonce: string, expireTime: number) {
        this.nonce = nonce;
        this.expireTime = expireTime;
    }
}

export enum EntityType {
    BidTransaction = 'bidTransaction',
    AskTransaction = 'askTransaction',
    CancelBidTransaction = 'cancelBidTransaction',
    CancelAskTransaction = 'cancelAskTransaction',
    ExecuteSaleTransaction = 'executeSaleTransaction',
    MarketplaceTransactionForNFT = 'marketplaceTransaction4NFT',
    MarketplaceTransactionForWallet = 'marketplaceTransaction4Wallet',

    BidOrderState = 'bidOrderState',
    AskOrderState = 'askOrderState',

    UserRefreshTokenEntity = 'userRefreshToken',
    NonceEntity = 'nonce',

    MetaplexOnChainMetadata = 'MetaplexOnChainMetadata',
    MintAddress = 'mintAddress',
    NFTOffchainMetadata = 'NFToffchainMetadata',
    MetaplexOffchainMetadata = 'MetaplexOffchainMetadata',
    Trigger = 'trigger',
    CensorTag = "censorTag",
    CollectionID = "collectionID",
    UserFlag = "userFlag",
    StaleFlag = "staleFlag",

    CollectionAttributeData = 'collectionAttributeData',
    CollectionMetaData = 'collectionMetaData',
    CollectionRawData = 'collectionRawData',
    CollectionPriceData = 'collectionPriceData',

    NFT4Collection = 'NFT4Collection',
    Collection4NFT = 'collection4NFT',
    PlaydustCollection = 'playdustCollection',
    Transaction = 'transaction',

    MarketData4Collection = 'marketData4Collection',
    OffchainMetadata4Collection = 'offchainMetadata4Collection',
    NFTRarity4Collection = 'NFTRarity4Collection',

    NFTRarity = 'NFTRarity',
    SolanaTreasuryMint = "So11111111111111111111111111111111111111112",
    Sale = 'sale'
}

export enum ProgramId {
    MeProgramId = 'MEisE1HzehtrDpAAT8PnLHjpSSkRYakotTuJRPjTpo8',
    MeV2ProgramId = 'M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K',
    TokenMetadataProgram = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
}

export enum TriggerSubtype {
    Default = "default",
    CollectionMetadataProcessor = 'collectionMetadataProcessor',
    CollectionAttributeData = 'collectionAttributeData',
    CollectionPriceData = 'collectionPriceData',
    MagicEdenV2TransactionProcessor = "magicEdenV2TransactionProcessor",
    ActiveOrdersProcessor = "activeOrdersProcessor",
    OffChainMetadata = 'offchainMetadata',
    OnChainMetadata = 'onchainMetadata',
    MetadataAggregation = 'metadataAggregation',
    BidsAsksAggregation = 'bidsAsksAggregation',
    CollectionPriceProcessor = 'collectionPriceProcessor',
    CollectionAggregation = 'collectionAggregation',
    CollectionAttributeProcessor = 'collectionAttributeProcessor',
}

export interface MagicEdenCollectionRawData {
    symbol: string;
    name: string;
    description: string;
    image: string;
    twitter: string;
    discord: string;
    website: string;
    categories: string[];
    isFlagged?: boolean;
    flagMessage?: string;
    blockedMints?: string[];
    candyMachineIds?: string[];
    createdAt?: string;
    derivativeDetails?: {
        originLink: string;
        originName: string;
    };
    disableMakeOffer?: boolean;
    enabledAttributesFilters?: boolean;
    enabledTotalSupply?: boolean;
    enabledUniqueOwners?: boolean;
    enabledVersionFilter?: boolean;
    iframe?: string;
    isDerivative?: string;
    isDraft?: string;
    nftImageType?: string; // ["", "gif", "mp4", null]
    onChainCollectionAddress?: string;
    rarity?: {
        showHowrare: boolean;
        showMoonrank: boolean;
    }
    skipMintsAttributesOverride?: boolean;
    sortBy?: string;
    stackBy?: string[];
    totalItems?: number;
    updatedAt?: string; // date
    useOnChainName?: boolean;
    volumeAll?: number;
    watchlistCount?: number;
}

export interface MagicEdenCollectionRawData {
    symbol: string;
    name: string;
    description: string;
    image: string;
    twitter: string;
    discord: string;
    website: string;
    categories: string[];
    isFlagged?: boolean;
    flagMessage?: string;
    blockedMints?: string[];
    candyMachineIds?: string[];
    createdAt?: string;
    derivativeDetails?: {
        originLink: string;
        originName: string;
    };
    disableMakeOffer?: boolean;
    enabledAttributesFilters?: boolean;
    enabledTotalSupply?: boolean;
    enabledUniqueOwners?: boolean;
    enabledVersionFilter?: boolean;
    iframe?: string;
    isDerivative?: string;
    isDraft?: string;
    nftImageType?: string; // ["", "gif", "mp4", null]
    onChainCollectionAddress?: string;
    rarity?: {
        showHowrare: boolean;
        showMoonrank: boolean;
    }
    skipMintsAttributesOverride?: boolean;
    sortBy?: string;
    stackBy?: string[];
    totalItems?: number;
    updatedAt?: string; // date
    useOnChainName?: boolean;
    volumeAll?: number;
    watchlistCount?: number;
}

export type PipelineConfig = {
    MagicEdenV1TransactionProcessor?: boolean;
    MagicEdenV2TransactionProcessor?: boolean;
    MintAddressProcessor?: boolean;
    DirtyCollectionProcessor?: boolean;
    ActiveOrdersProcessor?: boolean;
};

export class TransactionRelationEntityData {
    transactionSignature: TransactionSignature;
    constructor(transactionSignature: TransactionSignature) {
        this.transactionSignature = transactionSignature;
    }
};

export class UserRefreshTokenEntityData {
    refreshToken: string;
    expireTime: number;
    constructor(refreshToken: string, expireTime: number) {
        this.refreshToken = refreshToken;
        this.expireTime = expireTime;
    }
};

//METADATA class and all its types
export type StringPublicKey = string;
export class Metadata {
	key: MetadataKey;
	updateAuthority: StringPublicKey;
	mint: StringPublicKey;
	data: Data;
	// Immutable, once flipped, all sales of this metadata are considered secondary.
	primarySaleHappened: boolean;
	// Whether or not the data struct is mutable, default is not
	isMutable: boolean;
	/// nonce for easy calculation of editions, if present
	editionNonce: number | null;
	/// Since we cannot easily change Metadata, we add the new DataV2 fields here at the end.
    token_standard: TokenStandard | null;
    /// Collection
    collection: Collection | null;
    /// Uses
    uses: Uses | null;

	// set lazy
	masterEdition?: StringPublicKey;
	edition?: StringPublicKey;

	constructor(args: {
		updateAuthority: StringPublicKey;
		mint: StringPublicKey;
		data: Data;
		primarySaleHappened: boolean;
		isMutable: boolean;
		editionNonce: number | null;
		token_standard: TokenStandard | null;
    	collection: Collection | null;
    	uses: Uses | null;
	}) {
		this.key = MetadataKey.MetadataV1;
		this.updateAuthority = args.updateAuthority;
		this.mint = args.mint;
		this.data = args.data;
		this.primarySaleHappened = args.primarySaleHappened;
		this.isMutable = args.isMutable;
		this.editionNonce = args.editionNonce;
		this.token_standard = args.token_standard;
		this.collection = args.collection;
		this.uses = args.uses;
	}
};
export class Data {
	name: string;
	symbol: string;
	uri: string;
	sellerFeeBasisPoints: number;
	creators: Creator[] | null;
	constructor(args: {
		name: string;
		symbol: string;
		uri: string;
		sellerFeeBasisPoints: number;
		creators: Creator[] | null;
	}) {
		this.name = args.name;
		this.symbol = args.symbol;
		this.uri = args.uri;
		this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
		this.creators = args.creators;
	}
};
export class Creator {
	address: StringPublicKey;
	verified: boolean;
	share: number;

	constructor(args: {
		address: StringPublicKey;
		verified: boolean;
		share: number;
	}) {
		this.address = args.address;
		this.verified = args.verified;
		this.share = args.share;
	}
};
export class Uses  { // 17 bytes + Option byte
    use_method: UseMethod; //1
    remaining: number; //8
    total: number; //8

	constructor(args:{
		use_method: UseMethod;
		remaining: number;
		total: number;
	}){
		this.use_method = args.use_method;
		this.remaining = args.remaining;
		this.total = args.total;
	}
};
export class Collection {
	verified: boolean;
    key: StringPublicKey;

	constructor(args:{
		verified: boolean;
    	key: StringPublicKey;
	}){
		this.verified = args.verified;
		this.key = args.key;
	}
};
export enum TokenStandard {
    NonFungible ,  // This is a master edition
    FungibleAsset , // A token with metadata that can also have attrributes
    Fungible ,     // A token with simple metadata
    NonFungibleEdition ,      // This is a limited edition
};
export enum UseMethod {
    Burn ,
    Multiple ,
    Single ,
};
export enum MetadataKey {
	Uninitialized = 0,
	MetadataV1 = 4,
	EditionV1 = 1,
	MasterEditionV1 = 2,
	MasterEditionV2 = 6,
	EditionMarker = 7,
};

//OffchainMetadata class and all its type
export class OffChainMetadata {
	name: string;
    symbol: string;
	description: string;
    seller_fee_basis_points: number;
	image?: string;
	animation_url?: string;
    external_url: string;
	attributes?: Attribute[];
    collection?: CollectionOLD;
    properties: Properties;

	constructor(args: {
		name: string;
        symbol: string;
        description: string;
        seller_fee_basis_points: number;
        image?: string;
        animation_url?: string;
        external_url: string;
        attributes?: Attribute[];
        collection?: CollectionOLD;
        properties: Properties;
	}) {
		this.name = args.name;
        this.symbol = args.symbol;
        this.description = args.description ;
        this.seller_fee_basis_points = args.seller_fee_basis_points;
        this.image = args.image;
        this.animation_url = args.animation_url;
        this.external_url = args.external_url;
        this.attributes = args.attributes;
        this.collection = args.collection;
        this.properties = args.properties;
	}
};
type CollectionOLD = {
    name: string;
    family: string
};
type CreatorOLD = {
    address: string;
    share: number;
};
type File = {
    uri: string;
    type: string;
    cdn?: boolean;
};
type Properties = {
    files?: File[];
    category: MetadataCategory;
    creators?: CreatorOLD[];
};
export enum MetadataCategory {
	Audio = 'audio',
	Video = 'video',
	Image = 'image',
	VR = 'vr',
};
export type Attribute = {
	trait_type?: string;
	display_type?: string;
	value: string | number;
};

export interface NFTSource  {
	mint?: string;
	uri?: string;
	name?: string; // auto-complete
	symbol?: string; // auto-complete
    image?: string;
    isCollection?: boolean;
    tokenStandard?: string;
	attributes?: {
		key: string,
        value: string
	}[]; // auto-complete
    bids?: {
		marketplace: Marketplace
		price: number
		blocktime: number
	}[];
    asks?: {
		marketplace: Marketplace
		price: number
		blocktime: number
	}[];
	lastSalePrice?: number;
	totalVolume?: number;
    collections?: PlaydustCollectionData[];
    collectionName?: string;
    collectionSymbol?: string;
    collectionDescription?: string;
    primaryCollection?: string;
	//collection?: Pick<CollectionSource, 'id' | 'name' | 'description' | 'symbol'>; // auto-complete
	normalizedRarityScore?: number;
	normalizedStatisticalRarity?: number;

    rarityVolume?: number;
    statisticalRarityVolume?: number;
}
export interface CollectionSource {
    id?: string,
    image?: string,
    collectionType?: CollectionType,
    name?: string,
    description?: string,
    symbol?: string,
    volume?: CollectionVolume,
    floorPrice?: CollectionPrice,
    ceilingPrice?: CollectionPrice,
    attributes?: CollectionAttribute[],
}

export class MintEntityData{
    decimals: number;
    freezeAuthority: StringPublicKey;
    isInitialized: boolean;
    mintAuthority: StringPublicKey;
    supply: number;
    constructor( args: {
        decimals: number;
        freezeAuthority: StringPublicKey;
        isInitialized: boolean;
        mintAuthority: StringPublicKey;
        supply: number;
    }){
        this.decimals = args.decimals;
        this.freezeAuthority = args.freezeAuthority;
        this.isInitialized = args.isInitialized;
        this.mintAuthority = args.mintAuthority;
        this.supply = args.supply;
    }
}

export interface PlaydustCollectionData {
    type: CollectionType;
    id: string;
}

export enum CollectionType {
    Metaplex = 'Metaplex',
    Manual = 'Manual',
    MagicEden = 'MagicEden',
    Derived = 'Derived',
}
export interface Entity {
    globalId: string;
    id?: string;
    type?: EntityType;
    primaryEntity?: string;
    createdAt?: Date;
    updatedAt: Date;
    // FIXME: Use a generic type here
    data?: any;
};

export enum AllowedCensors {
    CENSORED = "CENSORED",
    NSFW = "NSFW",
  }
/**
 * Interface representing Transaction in EntityDB
 */
export interface TransactionEntity {
    globalId: string;
    id: string;
    blockchainAddress: '';
    type: 'transaction';
    data: TaggedTransaction;
}

/**
 * Transaction with metadata.
 */
export interface TransactionWithMeta {
    /** The transaction */
    transaction: Transaction;
    /** Metadata produced from the transaction */
    meta: ConfirmedTransactionMeta | null;
}

/**
 * Transaction with metadata and tag.
 */
export interface TaggedTransaction extends TransactionWithMeta {
    tag?: string;
}

/**
 * Transaction from Metaplex Library
 */
export interface Transaction {
    /** The transaction message */
    message: Message;
    /** The transaction signatures */
    signatures: string[];
}

interface ByMarketplaceCollectionData<T> {
    byMarketplace?: Map<Marketplace, T>;
    global: T;
};

export interface VolumeData {
    d1: number;
    d7: number;
    d30: number;
    total: number;
};

export type CollectionPrice = ByMarketplaceCollectionData<number>;
export type CollectionVolume = ByMarketplaceCollectionData<VolumeData>;

export interface RelatedEntityData {
    globalId: string;
    type: EntityType;
}

export interface NFTRarityData {
  mint: string;
  statisticalRarity: number;
  normalizedStatisticalRarity?: number;
  rarityScore?: number;
  normalizedRarityScore?: number;
  experimentalScore?: number;
}

export class TransactionHashAndBlockTime {
    txHash: string
    blockTime: number
    constructor(txHash, blockTime) {
        this.txHash = txHash,
        this.blockTime = blockTime
    }
}
