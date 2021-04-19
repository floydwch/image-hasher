import { useState, useCallback } from 'react'

export default function useList(defaultItems = []) {
  const [items, setItems] = useState([...defaultItems])
  const [activeIndex, setActiveIndex] = useState()

  const append = useCallback((item) => {
    setItems((items) => [...items, item])
  }, [])

  const concat = useCallback((newItems) => {
    setItems((items) => [...items, ...newItems])
  }, [])

  return {
    items,
    append,
    concat,
    activeIndex,
    setActiveIndex,
  }
}
