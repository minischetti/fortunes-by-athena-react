import React from 'react'
import Hero from './Hero'
import heroes from './heroes.json'

class HeroList extends React.Component {
    render() {
        const heroList = heroes.roster.map((hero) =>
            <Hero key={hero.name} heroName={hero.name} heroLine={hero.line[0]}/>
        );
        return (
            <div>{heroList}</div>
        )
    }
}

export default HeroList