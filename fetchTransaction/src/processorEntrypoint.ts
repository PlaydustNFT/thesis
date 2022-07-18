import { EntityType } from '../../shared/src/types';
import { ddbmapper } from '../../shared/src/service/dynamodb';
import { IndexNames } from '../../shared/src/consts'
import { ExecuteSaleTransactionEntity } from '../../shared/src/entity/transaction/ExecuteSaleTransactionEntity';
import * as fs from 'fs';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/** Comment to trigger build from changed shared code */


const readFromDB = async () => {
    let itemArray = [];
    let promises = [];
    let counter = 0;

    const csvWriter = createCsvWriter({
        path: './transactions.csv',
        header: [
            {id: 'created', title: 'Timestamp'},
            {id: 'price', title: 'Price'},
            {id: 'tokenMintAccount', title: 'TokenMintAccount'}
        ]
    });

    for await (const item of ddbmapper.query( ExecuteSaleTransactionEntity, { type: EntityType.ExecuteSaleTransaction}, { indexName: IndexNames.EntityDb.typeIndex} )) {
        //if this item exists it means the NFT is a CollectionNFT
        itemArray.push(item.data);
        counter++;
        if(itemArray.length > 49999){
            console.log(counter);
            await csvWriter.writeRecords(itemArray);
            itemArray = [];
        }
        
    }
    if(itemArray.length > 0){
        console.log(counter);
        await csvWriter.writeRecords(itemArray);
        itemArray = [];
    }

};


const run = async () => {

    console.log('start fetching!');
    await readFromDB();
    console.log('finished!');
};



run();