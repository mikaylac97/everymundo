import React from 'react'
import ReactDOM from 'react-dom'
import PopularRoutes from '../components/PopularRoutes'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<PopularRoutes />, div)
})

it("renders popular routes", () => {
     const { getByTestId } = render(<PopularRoutes />)
     expect(getByTestId('popular-routes')).toBeVisible()
})

