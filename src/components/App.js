import React from 'react'
// import HeroPage from './HeroPage'
import HeroList from './HeroList'
import heroes from './heroes.json'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHero: "",
            heroLine: ""
        };
        this.mysteryHero = this.mysteryHero.bind(this);
    }

    mysteryHero = () => {
        const randomHero = Math.floor(Math.random() * heroes.roster.length);
        const chosenHero = heroes.roster[randomHero]
        const randomHeroLine = chosenHero.line[Math.floor(Math.random() * chosenHero.line.length)]
        this.setState({
            selectedHero: chosenHero,
            heroLine: randomHeroLine
        })
    }

    render() {
        return (
            <div>
                <span onClick={this.mysteryHero}>Mystery Hero</span>
                <span>{this.state.selectedHero.name}</span>
                <br/>
                   <span>{this.state.heroLine}</span>   
            </div>
            // <HeroPage selectedHero = {this.mysteryHero}/>
        )
    }
}

class HeroPage extends React.Component {
    render() {
        return (
            <div>
                <span onClick={this.mysteryHero}>Mystery Hero</span>
                <span>{this.props.selectedHero}</span>
            </div>
        )
    }
}

export default App