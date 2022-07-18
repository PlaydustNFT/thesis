import { Entity, EntityType, TriggerSubtype } from '../types';
import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';
import { TableNames } from '../consts';
import { buildTriggerEntityGlobalId } from '../util';

/**
 * This class represents a generic trigger that is written to the
 * Entity DB.
 * Each trigger contains a data field which contains minimally a trigger
 * subtype that determines which processor is going to handle the trigger.
 */
@table(TableNames.Entity)
export class TriggerEntity<T> implements Entity {
    @hashKey()
    globalId: string;

    @attribute()
    id?: string;

    @attribute()
    type: EntityType.Trigger

    @attribute()
    createdAt: Date;

    @attribute()
    triggerSubtype: TriggerSubtype;

    @attribute()
    updatedAt: Date;
    
    @attribute()
    data: T;
    
    populate = (triggerSourceGlobalId: string, triggerSubtype: TriggerSubtype, data: T) => {
        this.id = triggerSourceGlobalId;
        this.type = EntityType.Trigger;
        this.triggerSubtype = triggerSubtype;
        this.globalId = buildTriggerEntityGlobalId(triggerSourceGlobalId, triggerSubtype);
        const now = new Date();
        this.createdAt = now;
        this.updatedAt = now;
        this.data = data;
    }
} 