import React from 'react'
import Hero from './Hero'

class HeroList extends React.Component {
    render() {
        const heroes = ['Widowmaker', 'McCree', 'Zarya'];
        const heroList = heroes.map((heroes) =>
            <Hero key={heroes} hero={heroes}/>
        );
        return (
            <div>{heroList}</div>
        )
    }
}

export default HeroList