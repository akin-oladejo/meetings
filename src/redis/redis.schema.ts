import { Schema, Entity} from 'redis-om';

// class Space extends Entity{}
// class Comment extends Entity{}

export const spaceSchema = new Schema('space', {
  host: { type: 'string' },
  title: { type: 'string'},
  party: { type: 'number' },
  startTime: { type: 'date' },
  endTime: { type: 'date' },
  isPrivate: { type: 'boolean' },
  members: { type: 'string[]' },
  nExited: { type: 'number' },
  maxAttended: { type: 'number' },
});


export const commentSchema = new Schema('comment', {
  spaceId: { type: 'number' },
  content: { type: 'text'},
  replyTo: { type: 'number'},
  author: { type: 'string'},
});


export const ratingSchema = new Schema('rating', {
    spaceId: { type: 'number' },
    verySad: { type: 'number' },
    sad: { type: 'number' },
    veryHappy: { type: 'number' },
    happy: { type: 'number' }
  });
