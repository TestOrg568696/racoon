import { theme } from 'ui'

type Props = {
  color?: keyof typeof theme.colors
  size?: string
}

export const TickIcon = ({ color, size = '1rem' }: Props) => {
  const fillColor = color ? theme.colors[color] : 'currentColor'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5117 3.45171C15.8146 3.73433 15.8309 4.20893 15.5483 4.51174L7.67707 12.9452C6.58989 14.11 4.74345 14.11 3.65627 12.9452L0.451711 9.51174C0.169086 9.20893 0.185451 8.73433 0.488264 8.45171C0.791077 8.16908 1.26567 8.18545 1.54829 8.48826L4.75285 11.9217C5.24702 12.4512 6.08632 12.4512 6.58049 11.9217L14.4517 3.48826C14.7343 3.18545 15.2089 3.16908 15.5117 3.45171Z"
        fill={fillColor}
      />
    </svg>
  )
}
