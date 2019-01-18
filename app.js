const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')

fs.writeFile('./output.txt', '', err => {
  if (err) throw err
})

fetch('https://challenges.robotevents.com/challenge/95/entry')
  .then(res => {
    if (res.ok) {
      return res.text()
    }
  })
  .then(html => {
    const $ = cheerio.load(html)
    const pages = $('.pagination > li > a')
    const pageLinks = []

    pages.each((i, tag) => {
      pageLinks[i] = tag.attribs.href
    })

    pageLinks.pop()
    pageLinks.unshift('https://challenges.robotevents.com/challenge/95/entry')
    
    pageLinks.forEach(page => {
      fetch(page)
        .then(res => {
          if (res.ok) {
            return res.text()
          }
        })
        .then(html => {
          const $ = cheerio.load(html)
          const entries = $('h4 a')
          const links = []

          entries.each((i, tag) => {
            links[i] = tag.attribs.href
          })

          links.forEach(link => {
            fetch(link)
              .then(res => {
                if (res.ok) {
                  return res.text()
                }
              })
              .then(html => {
                const $ = cheerio.load(html)
                const entry = ($('.panel-heading > h3').text().trim())
                const score = ($('.score-box').text().trim())

                fs.appendFile('./output.txt', `${score} votes | ${entry}\n`, err => {
                  if (err) throw err
                })
              })
          })
        })
    })
  })