/** @jsxImportSource @emotion/react */

import { memo, useCallback } from 'react'
import { css } from '@emotion/react'

const listStyle = ({ reversed }) => css`
  display: flex;
  flex-direction: ${reversed ? 'column-reverse' : 'column'};
  margin: 0;
  padding: 0;
`

const listItemStyle = ({ active }) => css`
  list-style: none;
  border: 1px solid #cecece;
  background: ${active ? '#DDDFEF' : 'white'};
  cursor: pointer;

  figure {
    display: flex;
    margin: 0;
    padding: 10px;
    gap: 10px;
  }

  img {
    width: 140px;
    height: 140px;
  }

  figcaption {
    word-break: break-all;
    font-size: 1.4rem;
  }
`

const Card = memo(({ index, active, url, time, onSelect }) => {
  const handleSelect = useCallback(() => {
    onSelect(index)
  }, [index, onSelect])

  return (
    <li onClick={handleSelect} css={listItemStyle({ active })}>
      <figure>
        <img src={url} alt={url} />
        <figcaption>
          <time>{time}</time>
          <p>{url}</p>
        </figcaption>
      </figure>
    </li>
  )
})

export default function CardList({
  className,
  style,
  items = [],
  activeIndex = null,
  reversed = false,
  onSelect: handleSelect = () => {},
}) {
  return (
    <ul className={className} style={style} css={listStyle({ reversed })}>
      {items.map(({ url, time }, index) => (
        <Card
          key={index}
          index={index}
          url={url}
          time={time}
          active={index === activeIndex}
          onSelect={handleSelect}
        />
      ))}
    </ul>
  )
}
