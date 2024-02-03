import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Party extends Document {
  @Prop()
  readonly creatorId: string;

  @Prop()
  readonly name: string;

  @Prop()
  readonly isPrivate: boolean

  @Prop()
  readonly members: string[];
}

export const partySchema = SchemaFactory.createForClass(Party);
