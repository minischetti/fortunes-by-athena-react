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
    mysteryHero() {
        var selectedHero = this.props.selectRandom(heroes.roster);
        var heroLine = this.props.selectRandom(selectedHero.line);
        this.props.mysteryHero(selectedHero, heroLine);
    }

    // componentWillUpdate(nextProps, nextState) {
    //     var heroLine = document.getElementById("heroLine");
    //     heroLine.classList.remove("fadeIn");
    //     heroLine.classList.remove("fadeOut");
    //     heroLine.classList.add("fadeOut");
    //     // alert("Component will update after this alert...");
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     var heroLine = document.getElementById("heroLine");
    //     heroLine.classList.remove("fadeOut");
    //     heroLine.classList.remove("fadeIn");
    //     heroLine.classList.add("fadeIn");
    //     // alert("Component just updated...");
    // }

    render() {
        return (
            <div>
                <span className="mysteryHeroButton" onClick={() => this.mysteryHero()}>Mystery<span className="mysteryKey">M</span></span> 
                <span className="heroName">{this.props.selectedHero.name}</span>
                <span id="heroLine" className="heroLine">{this.props.heroLine}</span>
                <div>
                    <div className="backgroundTint" style={{backgroundColor: this.props.selectedHero.color}}></div>
                    <img className="heroImage" src={this.props.selectedHero.background}/>
                </div>
            </div>
        )
    }
}

class HeroList extends React.Component {
    searchList(query) {
        const heroes = [...document.getElementsByClassName("hero")];
        var searchedHero;
        var pattern = new RegExp(query.toLowerCase());
        heroes.forEach(function(element) {
            var hero = element.dataset.hero.toLowerCase();
            console.log(hero);
            if (query && pattern.test(hero)) {
                searchedHero = element.dataset.id;
                 element.style.opacity = "1";
                // element.style.backgroundColor = "red";
            } else {
                element.style.opacity = ".25";
                // element.style.backgroundColor = "initial";
            }
            if (!query) element.style.opacity = "1";
        });
        this.props.searchList(searchedHero);
    }

    checkKey(key) {
        const heroSearchField = document.getElementById("heroSearchField");
        if(key === 13) {
            this.setHero(this.props.searchedHero);
        }
        if (key === 27) {
            heroSearchField.value = "";
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
            <img className="hero" src={hero.portrait} style={{backgroundColor: hero.color}} onClick={() => this.setHero(hero.id)} key={hero.id} data-id={hero.id} data-hero={hero.name}/>
            // <li className="hero" onClick={() => this.setHero(hero.id)} key={hero.id} data-hero={hero.id}>{hero.name}</li>
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