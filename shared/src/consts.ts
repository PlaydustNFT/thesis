import { Marketplace, MarketplaceInstructionType } from "./types";

export const TableNames = {
    Entity: process.env.ENTITY_TABLE_NAME || 'playdust-parrotfish-prod-entitydb'
}

export const GlobalIdDelimiter = '-';

export const ParserConstants = {
    Solana: {
        MagicEden: {
            v1: {

            },
            v2: {
                Ask: {
                    AccountKeyIndex: {
                        Wallet: 0,
                        Mint: 4,
                        PDA: 8,
                    },
                    InstructionDataOffsets: {
                        Price: 10
                    },
                },
                Bid: {
                    AccountKeyIndex: {
                        Wallet: 0,
                        Mint: 2,
                        Escrow: 4, // unused
                        AuctionHouseAuthority: 5, // unused
                        AuctionHouseAddress: 6, // unused
                        PDA: 7,
                        BuyerReferralAddress: 8, // unused
                    },
                    InstructionDataOffsets: {
                        Price: 10
                    },
                },
                CancelAsk: {
                    AccountKeyIndex: {
                        Wallet: 0,
                        Mint: 3,
                        AuctionHouseAuthority: 4, // unused
                        AuctionHouseAddress: 5, // unused
                        PDA: 6,
                        BuyerReferralAddress: 7, // unused
                    },
                    InstructionDataOffsets: {
                    },
                },
                CancelBid: {
                    AccountKeyIndex: {
                        Wallet: 0,
                        Mint: 2,
                        AuctionHouseAuthority: 3, // unused
                        AuctionHouseAddress: 4, // unused
                        PDA: 5,
                        BuyerReferralAddress: 6, // unused
                    },
                    InstructionDataOffsets: {
                        Price: 8
                    },
                },
                ExecuteSale: {
                    AccountKeyIndex: {
                        BuyerWallet: 0,
                        SellerWallet: 1,
                        Mint: 4,
                        AuctionHouseAuthority: 3, // unused
                        AuctionHouseAddress: 4, // unused
                        BuyerPDA: 11,
                        BuyerReferralAddress: 12, // unused
                        SellerPDA: 13,
                        SellerReferralAddress: 14, // unused
                    },
                    InstructionDataOffsets: {
                        Price: 10
                    },
                },
            }
        }
    }
}

export const MagicEdenInstructionDiscriminatorsMap = new Map([
    ["16927863322537953000", MarketplaceInstructionType.Bid],
    ["12502976635542563000", MarketplaceInstructionType.Ask],
    ["16852664989774008000", MarketplaceInstructionType.CancelBid],
    ["5453682830867614000", MarketplaceInstructionType.CancelAsk],
    ["442251406432881200", MarketplaceInstructionType.ExecuteSale],
]);

export const MarketplaceInstructionDiscriminators = new Map(
    [
        [Marketplace.MagicEdenV2, MagicEdenInstructionDiscriminatorsMap ],
    ]
);

export const IndexNames = {
    EntityDb: {
        typeIndex: 'TypeIndex',
        typePrimaryEntityIndex: 'TypePrimaryEntityIndex',
        primaryEntityIndex: 'PrimaryEntityIndex',
    }
};

export const OneDayInMilliseconds = 86400000;
