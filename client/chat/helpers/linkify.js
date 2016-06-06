import React from 'react'
import linkify from 'linkify-it'

export default function(text) {
  const matches = linkify().match(text)

  if(!matches || !matches.length) {
    return (
      <span>{text}</span>
    )
  }

  let cursor = 0
  const elements = []

  elements.push(text.substr(0, matches[0].index))

  matches.forEach((match, i) => {
    elements.push(
      <a key={i} href={match.url} target="blank">
        {match.text}
      </a>
    )

    const nextMatch = matches[i + 1]
    const nextMatchIndex = nextMatch ? nextMatch.index : text.length
    elements.push(text.substr(match.lastIndex, nextMatchIndex - match.lastIndex))
  })

  return <span>{elements}</span>
}
