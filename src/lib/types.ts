export type Word = {
  german: string
  english: string
  all_translations: string
  gender: string        // "der", "die", "das", or ""
  pos: string           // "noun", "verb", "adjective" etc
  frequency_rank: number
  example_de: string
  example_en: string
}

export type VocabResponse = {
  level: string
  total: number
  returned: number
  offset: number
  data: Word[]
}