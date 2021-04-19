/** @jsxImportSource @emotion/react */

import { useCallback } from 'react'
import { css } from '@emotion/react'

const formStyle = css`
  display: flex;
  max-width: 632px;
  background: white;
`

const inputStyle = css`
  flex: 1;
  padding: 8px 10px;
  border: 0;
  border-right: 1px solid black;
  box-sizing: border-box;
  outline: 0;
`

const buttonStyle = css`
  width: 72px;
  padding: 8px 10px;
  border: 0;
  background: inherit;
  outline: 0;
  cursor: pointer;
`

export default function SearchForm({
  className,
  style,
  placeholder,
  submitText,
  onSubmit = () => {},
}) {
  const submitHandler = useCallback(
    (e) => {
      onSubmit(e.target.elements.input.value)
      e.target.elements.input.value = ''
      e.preventDefault()
    },
    [onSubmit]
  )

  return (
    <form
      className={className}
      style={style}
      css={formStyle}
      onSubmit={submitHandler}
    >
      <input placeholder={placeholder} name="input" css={inputStyle} />
      <button css={buttonStyle}>{submitText}</button>
    </form>
  )
}
