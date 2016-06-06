import Remarkable from 'remarkable'

export default function(html) {
  const md = new Remarkable();
  return md.render(html)
}
