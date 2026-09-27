import fs from 'fs'
import axios from 'axios'

const books = [
  "genesis", "exodus", "leviticus", "numbers", "deuteronomy",
  "joshua", "judges", "ruth", "1samuel", "2samuel",
  "1kings", "2kings", "1chronicles", "2chronicles",
  "ezra", "nehemiah", "esther", "job", "psalms",
  "proverbs", "ecclesiastes", "songofsolomon", "isaiah",
  "jeremiah", "lamentations", "ezekiel", "daniel",
  "hosea", "joel", "amos", "obadiah", "jonah",
  "micah", "nahum", "habakkuk", "zephaniah",
  "haggai", "zechariah", "malachi",
  "matthew", "mark", "luke", "john",
  "acts", "romans", "1corinthians", "2corinthians",
  "galatians", "ephesians", "philippians", "colossians",
  "1thessalonians", "2thessalonians",
  "1timothy", "2timothy", "titus", "philemon",
  "hebrews", "james", "1peter", "2peter",
  "1john", "2john", "3john", "jude",
  "revelation"
]

async function scrapeBible() {
  for (const book of books) {
    const chapters = []
    console.log(`📘 Scrapeando ${book}...`)

    for (let chapter = 1; ; chapter++) {
      const verses = []
      console.log(`  📖 Capítulo ${chapter}`)

      for (let verse = 1; ; verse++) {
        const url = `https://api.midvash.com/v1/rvr1960/${book}/${chapter}/${verse}`

        try {
          const res = await axios.get(url)

          const data = res.data?.data

          if (!data || !data.text) {
            console.log(`    ⛔ Fin del capítulo ${chapter} en versículo ${verse - 1}`)
            break
          }

          verses.push(data.text)
          console.log(`    ✔ Versículo ${verse}`)
        } catch {
          console.log(`    ⛔ Error en versículo ${verse}, cortando…`)
          break
        }
      }

      if (verses.length === 0) {
        console.log(`  ⛔ Fin del libro ${book}`)
        break
      }

      chapters.push({
        chapter,
        verses
      })
    }

    fs.writeFileSync(
      `./server/data/bible/${book}.json`,
      JSON.stringify(chapters, null, 2)
    )

    console.log(`✨ ${book}.json guardado (${chapters.length} capítulos)`)
  }

  console.log("🌟 Biblia completa guardada.")
}

scrapeBible()

