import { render, fireEvent } from '@testing-library/react'

import SearchForm from './SearchForm'

describe('<SearchForm />', () => {
  it('trigger onSubmit with input value when form submitted and clear input', () => {
    const handleSubmit = jest.fn((input) => input)
    const { container } = render(<SearchForm onSubmit={handleSubmit} />)
    const input =
      'https://images.pexels.com/photos/2604929/pexels-photo-2604929.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'

    fireEvent.change(container.querySelector('input'), {
      target: {
        value: input,
      },
    })

    fireEvent.submit(container.querySelector('form'))
    expect(handleSubmit.mock.results[0].value).toBe(input)
    expect(container.querySelector('input').value).toBe('')
  })
})
