const fetch = require('node-fetch')
const cheerio = require('cheerio')
const URL = 'https://challenges.robotevents.com/challenge/95/entry'

const fetchPages = async () => {
  const url = await fetch(URL)
  const html = await url.text()
  const $ = cheerio.load(html)
  const pages = $('.pagination > li > a')
  const links = []

  pages.each((i, tag) => {
    links.push(tag.attribs.href)
  })

  links.pop()
  links.unshift(URL)
  return links
}

const fetchEntries = async links => {
  const urls = await Promise.all(links.map(url => fetch(url)))
  const html = await Promise.all(urls.map(url => url.text()))

  return html
    .map(page => {
      const $ = cheerio.load(page)
      const entries = $('h4 a')
      const links = []

      entries.each((i, tag) => {
        links.push(tag.attribs.href)
      })

      return links
    })
}

const fetchVotes = async links => {
  const linksArray = await links.join().split(',')
  const urls = await Promise.all(linksArray.map(url => fetch(url)))
  const html = await Promise.all(urls.map(url => url.text()))

  return html
    .map(page => {
      const $ = cheerio.load(page)
      const name = $('.panel-heading > h3').text().trim()
      const score = $('.score-box').text().trim()

      return { score, name }
    })
    .sort((a, b) => b.score - a.score)
}

const main = async () => {
  console.log(`This script was created by Nicholas Bowers from team 1320D. Vote for our entry for the Dell Website challenge here:\nhttps://challenges.robotevents.com/challenge/95/entry/6629\n`)

  const pages = await fetchPages()
  const entries = await fetchEntries(pages)
  const votes = await fetchVotes(entries)

  votes.forEach(entry => {
    console.log(`${entry.score} | ${entry.name}`)
  })
}

main()
