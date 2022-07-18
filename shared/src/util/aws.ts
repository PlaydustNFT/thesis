import { SQS } from 'aws-sdk';
import { SendMessageBatchRequest, SendMessageBatchRequestEntry } from 'aws-sdk/clients/sqs';

const MESSAGES_PER_BATCH = 10;

export async function  sendToQueue<T>(sqs: SQS, queueUrl: string, objects: T[], messageGroupId: string = '') {
    const promises = [];
    const numberOfBatches = Math.ceil(objects.length / MESSAGES_PER_BATCH);
    for (let i = 0; i < numberOfBatches; i++) {
        promises.push(sendBatchToQueue(sqs, queueUrl, objects.slice(i * MESSAGES_PER_BATCH, (i + 1) * MESSAGES_PER_BATCH), messageGroupId));
    }
    await Promise.all(promises)
    .then((values) =>{
        console.log('Succesfully sent to the queue');
    }).catch((err) => {
        console.log(err);
    });
}

export async function sendBatchToQueue<T>(sqs: SQS, queueUrl: string, objects: T[], messageGroupId: string) {
    const request: SendMessageBatchRequest = {
        QueueUrl: queueUrl,
        Entries: objects.map((slot) => {
            const item = { Id: slot + '', MessageBody: slot + '' } as SendMessageBatchRequestEntry;
            if (messageGroupId && messageGroupId != '') {
                item.MessageGroupId = messageGroupId;
            }
            return item;
        }),
    };
    // send to sqs
    await sqs.sendMessageBatch(request).promise();
}
