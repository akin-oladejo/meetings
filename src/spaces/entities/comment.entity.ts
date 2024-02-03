import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose' 
import { Document } from 'mongoose'

@Schema()
export class Comment extends Document {
    @Prop({required:true})
    readonly spaceId: string

    @Prop()
    readonly author: string

    @Prop()
    readonly content: string
    
    @Prop()
    readonly replyTo: string

    @Prop({default: new Date()})
    readonly date: Date
}

export const commentSchema = SchemaFactory.createForClass(Comment)