import { Post } from './Post'

export enum EmotionTag {
  EXCITED = 'excited',
  HOPEFUL = 'hopeful',
  INDIFFERENT = 'indifferent',
  INSPIRED = 'inspired',
  MAD = 'mad',
  NOSTALGIC = 'nostalgic',
  SAD = 'sad',
  SKEPTICAL = 'skeptical'
}

export interface Event extends Post {
  emotionTags: EmotionTag[]
}
