import Remarkable from 'remarkable'

export default function(html) {
  const md = new Remarkable({
    linkify: true,
    breaks: true
  });

  return md.render(html)
}
