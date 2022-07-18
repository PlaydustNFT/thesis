import { ddbmapper } from "../service/dynamodb";
import { Entity, RelatedEntityData } from "../types";

const MAX_BATCH_GET_SIZE = Number(100);

export var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const getBatchOfEntityObjects = async <EntityT extends Entity> (T: { new (): EntityT; }, relatedEntityData: RelatedEntityData[]) => { 
  if (!relatedEntityData) {
    return [];
  }

  relatedEntityData = [...new Map(relatedEntityData.map(item => [item.globalId, item])).values()];
  /** Do the stuff */
  let batch = [];
  let results = [];
  for (const relation of relatedEntityData) {
    if (batch.length >= MAX_BATCH_GET_SIZE) {
      for await (const item of ddbmapper.batchGet(batch)) {
        results.push(item);
      }
      batch = [];
    }
    const entity = new T();
    entity.globalId = relation.globalId;
    batch.push(entity);
    relation.globalId
  }

  if (batch.length > 0) {
    for await (const item of ddbmapper.batchGet(batch)) {
      results.push(item);
    }
  }
  return results;
}