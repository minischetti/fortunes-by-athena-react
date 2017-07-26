import React from 'react'
import heroes from './heroes.json'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedHero: "", heroLine: "", searchedHero: ""};
        this.updateHeroState = this.updateHeroState.bind(this);
        this.updateSearchedHero = this.updateSearchedHero.bind(this);
    }

    updateHeroState(selectedHero, heroLine) {
        this.setState({selectedHero, heroLine});
    }

    updateSearchedHero(searchedHero) {
        this.setState({searchedHero});
    }

    selectRandom(element) {
        return element[Math.floor(Math.random() * element.length)];
    }

    render() {
        var selectedHero = this.state.selectedHero;
        var heroLine = this.state.heroLine;
        var searchedHero = this.state.searchedHero;
        return (
            <div>
                <HeroPage selectRandom={this.selectRandom} mysteryHero={this.updateHeroState} selectedHero={selectedHero} heroLine={heroLine}/>
                <HeroList selectRandom={this.selectRandom} setHero={this.updateHeroState} mysteryHero={this.updateHeroState} searchList={this.updateSearchedHero} selectedHero={selectedHero} heroLine={heroLine} searchedHero={searchedHero}/>
            </div>
        )
    }
}

class HeroPage extends React.Component {
    constructor(props) {
        super(props);
        this.mysteryHero = this.mysteryHero.bind(this);
    }

    mysteryHero() {
        var selectedHero = this.props.selectRandom(heroes.roster);
        var heroLine = this.props.selectRandom(selectedHero.line);
        this.props.mysteryHero(selectedHero, heroLine);
        console.log(selectedHero);
    }

    componentWillUpdate(nextProps, nextState) {
        // alert("Component will update after this alert...");
    }

    componentDidUpdate(prevProps, prevState) {
        // alert("Component just updated...");
    }

    render() {
        return (
            <div>
                <span className="mysteryHeroButton" onClick={this.mysteryHero}>Mystery<span className="mysteryKey">M</span></span> 
                <span>{this.props.selectedHero.name}</span>
                <br/>
                <span>{this.props.heroLine}</span>
                <div className="backgroundTint" style={{backgroundColor: this.props.selectedHero.color}}></div>
                <img className="heroImage" src={this.props.selectedHero.image}/>
            </div>
        )
    }
}

class HeroList extends React.Component {
    searchList(query) {
        const heroes = [...document.getElementsByClassName("hero")];
        const heroSearchField = document.getElementById("heroSearchField");
        var searchedHero;
        var pattern = new RegExp(query.toLowerCase());
        heroes.forEach(function(element) {
            var hero = element.innerHTML.toLowerCase();
            if (query && pattern.test(hero)) {
                searchedHero = element.dataset.hero;
                element.style.backgroundColor = "red";
            } else {
                element.style.backgroundColor = "initial";
            }
        });
        this.props.searchList(searchedHero);
    }

    checkKey(key) {
        if(key === 13) {
            this.setHero(this.props.searchedHero);
        }
    }

    setHero(hero) {
        var selectedHero = heroes.roster[hero]; 
        var heroLine = this.props.selectRandom(selectedHero.line);
        this.props.setHero(selectedHero, heroLine);
        console.log(selectedHero);
    }

    render() {
        const heroList = heroes.roster.map((hero) =>
            <li className="hero" onClick={() => this.setHero(hero.id)} key={hero.id} data-hero={hero.id}>{hero.name}</li>
        );
        return (
            <div>
                <input type="text" id="heroSearchField" onKeyDown={event => this.checkKey(event.keyCode)} onChange={event => this.searchList(event.target.value)}></input>
                <ul>{heroList}</ul>
            </div>
        )
    }
}

export default App