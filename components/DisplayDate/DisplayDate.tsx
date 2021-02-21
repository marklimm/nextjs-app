import { parseISO, format } from 'date-fns'

const DisplayDate = ({ dateString }) => {
  const date = parseISO(dateString)
  const formattedDate = format(date, 'LLLL d, yyyy')

  return <time dateTime={dateString}>{formattedDate}</time>
}

export default DisplayDate
