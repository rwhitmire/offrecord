import React from 'react'
import linkify from 'linkify-it'

export default function(text) {
  const matches = linkify().match(text)

  if(!matches || !matches.length) return text

  // initialize with all text up to the first match
  const elements = [text.substr(0, matches[0].index)]

  matches.forEach((match, i) => {
    elements.push(`<a href="${match.url}" target="blank">${match.text}</a>`)
    const nextMatch = matches[i + 1]
    const nextMatchIndex = nextMatch ? nextMatch.index : text.length
    elements.push(text.substr(match.lastIndex, nextMatchIndex - match.lastIndex))
  })

  return elements.join('')
}
