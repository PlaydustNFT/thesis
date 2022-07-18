import { BidTransactionEntity } from './BidTransactionEntity'
import { AskTransactionEntity } from './AskTransactionEntity'
import { CancelBidTransactionEntity } from './CancelBidTransactionEntity'
import { CancelAskTransactionEntity } from './CancelAskTransactionEntity'
import { ExecuteSaleTransactionEntity } from './ExecuteSaleTransactionEntity'
export type MarketplaceTransactionEntity = BidTransactionEntity | AskTransactionEntity | CancelBidTransactionEntity | CancelAskTransactionEntity | ExecuteSaleTransactionEntity;