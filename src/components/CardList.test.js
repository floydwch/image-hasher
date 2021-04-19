import { render, fireEvent } from '@testing-library/react'

import CardList from './CardList'

describe('<CardList />', () => {
  const items = [
    {
      url:
        'https://images.pexels.com/photos/4817087/pexels-photo-4817087.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      time: '19/3/2021 - 21:39',
    },
    {
      url:
        'https://images.pexels.com/photos/4407858/pexels-photo-4407858.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      time: '19/3/2021 - 21:38',
    },
    {
      url:
        'https://images.pexels.com/photos/2604929/pexels-photo-2604929.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      time: '19/3/2021 - 21:37',
    },
  ]

  it('render a list of items', () => {
    const { container } = render(<CardList items={items} />)
    expect(container.querySelectorAll('ul > li').length).toBe(3)
  })

  it('trigger onSelect with index when item clicked', () => {
    const handleSelect = jest.fn((index) => index)
    const { container } = render(
      <CardList items={items} onSelect={handleSelect} />
    )

    fireEvent.click(container.querySelector('li'))
    expect(handleSelect.mock.results[0].value).toBe(0)
  })
})
