import React from 'react'
import HeroPage from './HeroPage'
import HeroList from './HeroList'
import heroes from './heroes.json'

class App extends React.Component {
    render() {
        return (
            <HeroPage/>
        )
    }
}

export default App