import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Member extends Document {
  @Prop()
  readonly spaceId: string;

  @Prop()
  readonly name: string;

  // @Prop({default: false})
  // readonly isHost: boolean

  @Prop({default:false})
  readonly hasVoted: boolean
}

export const memberSchema = SchemaFactory.createForClass(Member);