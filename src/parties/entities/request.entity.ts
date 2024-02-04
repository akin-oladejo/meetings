import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose' 
import { Document } from 'mongoose'

@Schema()
export class Request extends Document {
    @Prop()
    readonly userId: string
    
    @Prop()
    readonly partyId: string
    
    @Prop({default: new Date()})
    readonly requestTime: Date
}

export const requestSchema = SchemaFactory.createForClass(Request)