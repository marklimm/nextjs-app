import { Post } from './Post'

/**
 * The enum of emotions that I can experience as a result of various Star Wars events
 */
export enum EmotionTag {
  EXCITED = 'excited',
  HOPEFUL = 'hopeful',
  INDIFFERENT = 'indifferent',
  INSPIRED = 'inspired',
  MAD = 'mad',
  NOSTALGIC = 'nostalgic',
  SAD = 'sad',
  SKEPTICAL = 'skeptical',
}

/**
 * Labels for the emotion tags
 */
export const EmotionTagLabels = Object.keys(EmotionTag)

/**
 * An event in Star Wars history
 */
export interface Event extends Post {
  emotionTags: EmotionTag[]
}
