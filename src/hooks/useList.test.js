import { renderHook, act } from '@testing-library/react-hooks'

import useList from './useList'

describe('useList', () => {
  const defaultItems = ['a', 'b', 'c']

  it('has default items', () => {
    const { result } = renderHook(() => useList(defaultItems))
    expect(result.current.items).toStrictEqual(defaultItems)
  })

  it('can set active index', () => {
    const { result } = renderHook(() => useList(defaultItems))
    act(() => {
      result.current.setActiveIndex(1)
    })
    expect(result.current.activeIndex).toBe(1)
  })

  it('can append new item', () => {
    const { result } = renderHook(() => useList(defaultItems))
    act(() => {
      result.current.append('d')
    })
    expect(result.current.items[3]).toBe('d')
  })

  it('can concat items', () => {
    const { result } = renderHook(() => useList(defaultItems))
    const newItems = ['d', 'e', 'f']
    act(() => {
      result.current.concat(newItems)
    })
    expect(result.current.items).toStrictEqual([...defaultItems, ...newItems])
  })
})
