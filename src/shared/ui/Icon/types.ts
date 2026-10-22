import { type SpritesMeta } from "./sprite.gen";

/** Represents all possible icon names as the `<sprite name>:<symbol name>` string */
export type IconName = {
  [Key in keyof SpritesMeta]: SpritesMeta[Key];
}[keyof SpritesMeta];
