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

    render() {
        var selectedHero = this.state.selectedHero;
        var heroLine = this.state.heroLine;
        var searchedHero = this.state.searchedHero;
        return (
            <div>
                <HeroPage mysteryHero={this.updateHeroState} setHero={this.updateHeroState} searchList={this.updateSearchedHero} selectedHero={selectedHero} heroLine={heroLine} searchedHero={searchedHero}/>
            </div>
        )
    }
}

class HeroPage extends React.Component {
    constructor(props) {
        super(props);
        this.setHero = this.setHero.bind(this);
        this.state = { showHeroList: false, favoriteHeroes: [] };
    }

    selectRandom(element) {
        return element[Math.floor(Math.random() * element.length)];
    }

    mysteryHero() {
        var selectedHero = this.selectRandom(heroes.roster);
        var heroLine = this.selectRandom(selectedHero.line);
        this.props.mysteryHero(selectedHero, heroLine);
    }

    setHero(hero) {
        var selectedHero = heroes.roster[hero];
        var heroLine = this.selectRandom(selectedHero.line);
        this.props.setHero(selectedHero, heroLine);
    }

    updateFavoriteHeroes(hero) {
        this.setState({favoriteHeroes: hero});
        console.log(this.state.favoriteHeroes);
    }

    showHeroList() {
        this.setState({showHeroList: !this.state.showHeroList });
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
        const showHeroList = this.state.showHeroList;
        return (
            <div>
                <span className="mysteryHeroButton" onClick={() => this.mysteryHero()}>Mystery<span className="mysteryKey">M</span></span> 
                <span className="heroName">{this.props.selectedHero.name}</span>
                <span id="heroLine" className="heroLine">{this.props.heroLine}</span>
                <div>
                    <div className="backgroundTint" style={{backgroundColor: this.props.selectedHero.color}}></div>
                    <img className="heroImage" src={this.props.selectedHero.background}/>
                </div>
                <span onClick={() => this.showHeroList()}>Show Hero List</span>
                {showHeroList && <HeroList setHero={this.setHero} searchList={this.props.searchList} searchedHero={this.props.searchedHero}/>}
            </div>
        )
    }
}

class ContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.positionMenu = this.positionMenu.bind(this);
    }
    positionMenu(event) {
        var contextMenu = document.getElementById("contextMenu");
        // Position menu at cursor
        var xPos = event.clientX;
        var yPos = event.clientY;

        event.preventDefault();

        // Position the menu via CSS
        contextMenu.style.left = xPos + "px";
        contextMenu.style.top = yPos + "px";
    }
    componentDidMount() {
        this.positionMenu(event);
    }
    componentDidUpdate() {
        this.positionMenu(event);

    }
    render() {
        return (
            <div id="contextMenu">
                <span onClick={(hero) => this.props.updateFavoriteHeroes(hero)}>Add to Favorites</span>
            </div>
        )
    }
}

class HeroList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showContextMenu: false };
        this.showContextMenu = this.showContextMenu.bind(this);
    }

    searchList(query) {
        const heroes = [...document.getElementsByClassName("hero")];
        var searchedHero;
        var pattern = new RegExp(query.toLowerCase());
        heroes.forEach(function(element) {
            var hero = element.dataset.hero.toLowerCase();
            if (query && pattern.test(hero)) {
                searchedHero = element.dataset.id;
                element.style.opacity = "1";
            } else {
                element.style.opacity = ".25";
            }
            if (!query) element.style.opacity = "1";
        });
        this.props.searchList(searchedHero);
    }

    checkKey(key) {
        const heroSearchField = document.getElementById("heroSearchField");
        if(key === 13) {
            this.props.setHero(this.props.searchedHero);
        }
        // Disabled due to opacity not restoring after field is cleared
        // if (key === 27) {
        //     heroSearchField.value = "";
        // }
        if (key === 72) {
            heroSearchField.value = "";
        }
    }

    showContextMenu(event) {
        this.setState({ showContextMenu: true });
    }

    render() {
        //  showContextMenu={this.props.showContextMenu} onContextMenu={(event) => this.props.showContextMenu(event, hero)}
        const heroList = heroes.roster.map((hero) =>
            <Hero key={hero.id} hero={hero} setHero={this.props.setHero} showContextMenu={this.showContextMenu}/>
        );
        const showContextMenu = this.state.showContextMenu;
        return (
            <div>
                {showContextMenu && <ContextMenu/>}
                <input type="text" id="heroSearchField" onKeyDown={event => this.checkKey(event.keyCode)} onChange={event => this.searchList(event.target.value)}></input>
                <ul>{heroList}</ul>
            </div>
        )
    }
}

class Hero extends React.Component {
    render() {
        const hero = this.props.hero;
            // console.log(this.props.hero.id);
        return (
            <div>
                <img className="hero" src={hero.portrait} style={{backgroundColor: hero.color}} onClick={() => this.props.setHero(hero.id)} onContextMenu={(event) => this.props.showContextMenu(event)} data-id={hero.id} data-hero={hero.name}/>
            </div>
        )
    }
}

export default App