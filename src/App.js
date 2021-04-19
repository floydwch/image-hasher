/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useRef } from 'react'
import { css } from '@emotion/react'

import SearchForm from './components/SearchForm'
import CardList from './components/CardList'
import useList from './hooks/useList'
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./cryptoWorker'

const pageStyle = css`
  display: grid;
  grid-template-columns: 33.33% auto;
  grid-auto-rows: minmax(min-content, max-content);
`

const headerStyle = css`
  position: relative;
  grid-column: 1 / span 2;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #284795;
  color: white;

  h1 {
    position: absolute;
    margin: 0;
    font-size: 2.4rem;
    font-weight: 400;
  }
`

const mainStyle = css`
  display: flex;
  justify-content: center;
  padding-top: 18vh;

  figure {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
  }

  img {
    width: 100%;
  }

  figcaption {
    width: 80%;
  }

  dl {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 20px 0 0 0;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin-left: 2px;
    word-break: break-all;
  }
`

const pairStyle = css`
  display: flex;
`

const searchFormStyle = css`
  width: 45%;
  margin: 0 auto;
`

function Figure({ url, size, md5, sha1, sha256, pbkdf2 }) {
  // avoid rendering null case
  if (!url) {
    return null
  }

  return (
    <figure>
      <img src={url} alt={url} />
      <figcaption>
        <dl>
          <div css={pairStyle}>
            <dt>URL</dt>:<dd>{url}</dd>
          </div>
          <div css={pairStyle}>
            <dt>SIZE</dt>:<dd>{size} bytes</dd>
          </div>
          <div css={pairStyle}>
            <dt>MD5</dt>:<dd>{md5}</dd>
          </div>
          <div css={pairStyle}>
            <dt>SHA1</dt>:<dd>{sha1}</dd>
          </div>
          <div css={pairStyle}>
            <dt>SHA256</dt>:<dd>{sha256}</dd>
          </div>
          <div css={pairStyle}>
            <dt>PBKDF2</dt>:<dd>{pbkdf2}</dd>
          </div>
        </dl>
      </figcaption>
    </figure>
  )
}

function App() {
  const list = useList()
  const workerRef = useRef(null)

  useEffect(() => {
    const worker = new Worker()
    workerRef.current = worker
    const items = JSON.parse(localStorage.getItem('imageInfos')) ?? []
    list.concat(items)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    workerRef.current.onmessage = ({ data: item }) => {
      localStorage.setItem('imageInfos', JSON.stringify([...list.items, item]))
      list.append(item)
    }
  }, [list])

  const handleSubmit = useCallback(async (url) => {
    if (/^(http|https):\/\/[^ "]+$/.test(url)) {
      const res = await fetch(url)
      workerRef.current.postMessage({
        blob: await res.blob(),
        url,
      })
    }
  }, [])

  const handleSelect = useCallback(
    (index) => {
      list.setActiveIndex(index)
    },
    [list.setActiveIndex] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const curItem = list.items[list.activeIndex] ?? null

  return (
    <div css={pageStyle}>
      <header css={headerStyle}>
        <h1>Image Hasher</h1>
        <SearchForm
          placeholder="Image URL..."
          submitText="Hash It!"
          onSubmit={handleSubmit}
          css={searchFormStyle}
        />
      </header>
      <nav>
        <CardList
          items={list.items}
          activeIndex={list.activeIndex}
          reversed
          onSelect={handleSelect}
        ></CardList>
      </nav>
      <main css={mainStyle}>
        <Figure {...curItem} />
      </main>
    </div>
  )
}

export default App
