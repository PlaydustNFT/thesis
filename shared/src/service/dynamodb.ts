import { DataMapper } from "@aws/dynamodb-data-mapper";
import { config, DynamoDB } from "aws-sdk";

config.loadFromPath('./config.json');

const dynamoDBOptions: DynamoDB.ClientConfiguration = {
};


if (process.env.DYNAMODB_ENDPOINT) {
  dynamoDBOptions.endpoint = process.env.DYNAMODB_ENDPOINT;
}

class WrappedDataMapper extends DataMapper {
  hasTable = async (tableName: string) : Promise<boolean> => {
    const response = await ddbclient.listTables().promise();
    if (!response.TableNames.includes(tableName)) {
        return false;
    }
    return true;
  };
}

export const ddbclient = new DynamoDB(dynamoDBOptions);
export const ddbmapper = new WrappedDataMapper({ client: ddbclient });