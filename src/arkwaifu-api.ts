enum Server {
  CN = 'CN',
  EN = 'EN',
  JP = 'JP',
  KR = 'KR',
  // Taiwan server hasn't been implemented yet.
  // TW = 'TW'
}

class Art {
  id!: string
  category!: Category
  variants!: Variant[]

  variant(variation: Variation): Variant {
    return this.variants.find((el) => el.variation === variation)!
  }
}

enum Category {
  Image = 'image',
  Background = 'background',
  Item = 'item',
  Character = 'character',
}

class Variant {
  artID!: string
  variation!: Variation

  contentPresent!: boolean
  contentWidth!: number
  contentHeight!: number
}

enum Variation {
  Origin = 'origin',
  RealEsrganX4Plus = 'real-esrgan(realesrgan-x4plus)',
  RealEsrganX4PlusAnime = 'real-esrgan(realesrgan-x4plus-anime)',
  Thumbnail = 'thumbnail',
}

class StoryGroup {
  server!: Server
  id!: string
  name!: string
  type!: StoryGroupType
  stories!: Story[]
}

enum StoryGroupType {
  MainStory = 'main-story',
  MajorEvent = 'major-event',
  MinorEvent = 'minor-event',
  Other = 'other',
}

class Story {
  server!: Server
  id!: string

  tag!: StoryTag
  tagText!: string
  code!: string
  name!: string
  info!: string

  groupID!: string

  pictureArts!: PictureArt[]
  characterArts!: CharacterArt[]
}

enum StoryTag {
  Before = 'before',
  After = 'after',
  Interlude = 'interlude',
}

class PictureArt {
  server!: Server
  id!: string
  category!: Category
  storyID!: string

  title!: string
  subtitle!: string
}

class CharacterArt {
  server!: Server
  id!: string
  category!: Category
  storyID!: string

  names!: string[]
}

class AggregatedPictureArt {
  server!: Server
  id!: string
  category!: Category

  title!: string
  subtitle!: string
}

class AggregatedCharacterArt {
  server!: Server
  id!: string
  category!: Category

  names!: string[]
}

class Gallery {
  id!: string
  name!: string
  description!: string
  arts!: GalleryArt[]
}

class GalleryArt {
  id!: string
  name!: string
  description!: string
  artID!: string
}

export {
  Category,
  Server,
  Art,
  Variant,
  Variation,
  StoryGroup,
  StoryGroupType,
  Story,
  StoryTag,
  PictureArt,
  CharacterArt,
  AggregatedPictureArt,
  AggregatedCharacterArt,
  Gallery,
  GalleryArt,
}
