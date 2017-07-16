import React from 'react'
import Hero from './Hero'
import heroes from './heroes.json'

class HeroPage extends React.Component {
    mysteryHero() {
        const selectedHero = heroes.roster[Math.floor(Math.random() * heroes.roster.length)]
        const heroName = selectedHero.name
        const heroLine = selectedHero.line[Math.floor(Math.random() * selectedHero.line.length)]
        return (
            <div>
                <span>{heroName}</span>
                <br/>
                <span>{heroLine}</span>
            </div>
        )
    }
    render() {
        return (
            <span>{this.mysteryHero()}</span>
        )
    }
}

export default HeroPage