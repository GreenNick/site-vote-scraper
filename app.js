const fetch = require('node-fetch')
const cheerio = require('cheerio')
const URL = 'https://challenges.robotevents.com/challenge/95/entry'

fetch(URL)
  .then(res => res.text())
  .then(html => {
    const $ = cheerio.load(html)
    const pages = $('.pagination > li > a')
    const links = []

    pages.each((i, tag) => {
      links.push(tag.attribs.href)
    })

    links.pop()
    links.unshift(URL)
    return links
  })
  .then(res =>
    Promise.all(res.map(url =>
      fetch(url))
    )
  )
  .then(res =>
    Promise.all(res.map(url =>
      url.text())
    )
  )
  .then(html =>
    html
      .map(page => {
        const $ = cheerio.load(page)
        const entries = $('h4 a')
        const links = []

        entries.each((i, tag) => {
          links.push(tag.attribs.href)
        })

        return links
      })
  )
  .then(res =>
    res.join().split(',')
  )
  .then(res =>
    Promise.all(res.map(url =>
      fetch(url))
    )
  )
  .then(res =>
    Promise.all(res.map(url =>
      url.text())
    )
  )
  .then(html =>
    html
      .map(page => {
        const $ = cheerio.load(page)
        const name = $('.panel-heading > h3').text().trim()
        const score = $('.score-box').text().trim()

        return { score, name }
      })
      .sort((a, b) => b.score - a.score)
  )
  .then(res =>
    res.forEach(entry =>
      console.log(`${entry.score} | ${entry.name}`)
    )
  )