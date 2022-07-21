import { EntityType } from '../../shared/src/types';
import { ddbmapper } from '../../shared/src/service/dynamodb';
import { CollectionMetaDataEntity } from '../../shared/src/entity/CollectionMetaDataEntity';
import path from 'path';
import * as fs from 'fs';
import csv from 'csv-parser';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;



const csvWriter = createCsvWriter({
    path: './collMetadata.csv',
    header: [
        { id: 'Collection', title: 'Collection' },
        { id: 'Name', title: 'Name' },
        { id: 'Symbol', title: 'Symbol' }
    ]
});



const run = async (file: string) => {

    const start = Date.now();
    //At this stage everything can fit into an array in memory -> probably it will need to be split if the dataset grows
    let itemArray: any[] = [];
    let resultArray: any[] = [];
    console.log(file);
    const fd = fs.createReadStream(file)
    .pipe(csv());
    for await(const data of fd){
        //console.log(data);
        //console.log(data._0);
        itemArray.push({Collection: data._0})
    }
    console.log(itemArray.length);
    console.log(itemArray[0]);
    console.log(itemArray[itemArray.length-1]);

    
    for(const coll of itemArray){
        let item = {
            Collection: coll.Collection
        }

        let entity: CollectionMetaDataEntity = new CollectionMetaDataEntity();
        entity.globalId = EntityType.CollectionMetaData + '-' + coll.Collection;
        //console.log(entity);
        await ddbmapper.get(entity)
        .then(collItem => {
            //console.log(collItem.data.name);
            //console.log(collItem.data.symbol);
            item['Name'] = collItem.data.name;
            item['Symbol'] = collItem.data.symbol;
        })
        .catch(err => {
            //console.log('Failed to fetch collection data!: ' + coll);
        });
        resultArray.push(item);
    }

    
    console.log(resultArray.length);
    console.log(resultArray[0]);

    await csvWriter.writeRecords(resultArray);
    console.log('\n');
    console.log('Done!' + ' ' + file);
    console.log('Execution time: ' + ((Date.now() - start)/1000) + 's');
    console.log('\n');
    
};

const main = async () => {
    const directoryPath = path.join(__dirname, './files');
    //passsing directoryPath and callback function
    const dir = fs.readdirSync(directoryPath);
    for await (const file of dir){ 
        await run('./files/' + file);
    }
    
    
}

main();