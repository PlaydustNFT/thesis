import { CollectionType, EntityType } from '../../shared/src/types';
import { ddbmapper } from '../../shared/src/service/dynamodb';
import { IndexNames } from '../../shared/src/consts'
import { ExecuteSaleTransactionEntity } from '../../shared/src/entity/transaction/ExecuteSaleTransactionEntity';
import { Collection4NFTEntity } from '../../shared/src/entity/Collection4NFTEntity';
import { PlaydustCollectionEntity } from '../../shared/src/entity/PlaydustCollectionEntity';
import { MetaplexOffChainMetadataEntity } from '../../shared/src/entity/MetaplexOffChainMetadataEntity'
import path from 'path';
import * as fs from 'fs';
import csv from 'csv-parser';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;



const csvWriter = createCsvWriter({
    path: './txColl.csv',
    header: [
        { id: 'Timestamp', title: 'Timestamp' },
        { id: 'Price', title: 'Price' },
        { id: 'TokenMintAccount', title: 'TokenMintAccount' },
        { id: 'Collection', title: 'Collection' },
        { id: 'Attributes', title: 'Attributes' }
    ]
});



const run = async (file) => {

    const start = Date.now();
    //At this stage everything can fit into an array in memory -> probably it will need to be split if the dataset grows
    let itemArray = [];
    let promises = [];

    const fd = fs.createReadStream('./files/' + file)
    .pipe(csv());
    for await( const data of fd){
        //console.log(data);
        itemArray.push(data);
    }
    console.log(itemArray.length);
    
    for(const item of itemArray){
        const collectionIds = [];
        const collectionData = [];
        //console.log(item);
        for await (const entity of ddbmapper.query( Collection4NFTEntity, { type: EntityType.Collection4NFT, primaryEntity: item.TokenMintAccount}, { indexName: IndexNames.EntityDb.typePrimaryEntityIndex} )) {
            collectionIds.push(entity.data); 
        }

        for(const coll of collectionIds){
            let entity: PlaydustCollectionEntity = new PlaydustCollectionEntity();
            entity.globalId = EntityType.PlaydustCollection + '-' + coll;
            await ddbmapper.get(entity)
            .then(collItem => {
                collectionData.push(collItem.data);
            })
            .catch(err => {
                //console.log('Failed to fetch collection data!: ' + coll);
            });
        }
        const tempCollections = []
        for(const coll of collectionData){
            if(coll.type == CollectionType.MagicEden){
                tempCollections.push(coll.id);
            }
        }
        for(const coll of collectionData){
            if(coll.type == CollectionType.Metaplex){
                tempCollections.push(coll.id);
            }
        }
        for(const coll of collectionData){
            if(coll.type == CollectionType.Derived){
                tempCollections.push(coll.id);
            }
        }
        item['Collection'] = tempCollections[0];
        
        for await (const entity of ddbmapper.query( MetaplexOffChainMetadataEntity, { type: EntityType.MetaplexOffchainMetadata, primaryEntity: item.TokenMintAccount}, { indexName: IndexNames.EntityDb.typePrimaryEntityIndex} )) {
            if(entity.data.attributes){
                let names = entity.data.attributes.map(function(item) {
                    return item['trait_type']+':'+item['value'];
                });
                item['Attributes'] = names;
            }else{
                item['Attributes'] = null;
            }
        }
    }
 

    await csvWriter.writeRecords(itemArray);
    console.log('\n');
    console.log('Done!' + ' ' + file);
    console.log('Execution time: ' + ((Date.now() - start)/1000) + 's');
    console.log('\n');
};

const main = async () => {
    const directoryPath = path.join(__dirname, './files');
    const promises = [];
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, async function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        for(let file of files){
            console.log('Starting..' + ' ' + file);
            promises.push(run(file));
        };
    });

    await Promise.all(promises);
}

main();