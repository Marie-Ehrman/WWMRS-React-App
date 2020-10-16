import React, { Component } from 'react';
import '../css/Search.css';
import axios from 'axios';
import apiKey from '../config';


export default class Search extends Component {

    state = {
        query: '',
        results: {},
        loading: false,
        searchSyn: 'Search',
        wordSyn: 'Words',
        chosenWord: ''

    }



    componentDidMount() {
        //fetch words for "Search" to display as placeholder
         // this.fetchData('search').then(result => this.setState({searchSyn: }));
        //fetch words for "Words" to display as placeholder

         this.fetchData('Laugh');
    }

     fetchData(query) {
        axios.get(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${query}?key=${apiKey}`)
        .then(data => {
            data.data.forEach( results => {
                if(results.meta.id === query.toLowerCase()){
                // console.log(result.meta)
                    this.setState({
                        results
                    })
                } else {
                    this.setState({results: {}})
                }
            });
        }).then(
            this.getRandomWord()
        )
        .catch (error => {
            this.setState({results: {}})
            console.log(error);
        })
    }

    getRandomWord() {
        const { results } = this.state;
        const randomWord = results[Math.ceil(Math.random()* results.length)];
        let filteredResults;
        
        Object.values(results).forEach(item => {
                    if(item.id){
                       console.log( item.syns );
                    }
                })

                // console.log( filteredResults);
    }
    //if data 

    render() {

        const { searchSyn,
                wordSyn,
                results,
                chosenWord } = this.state;

        return (

            <div>
                <input 
                    className="search-input"
                    type="text"
                    // value=""
                    id="search-input"
                    placeholder={`${ searchSyn } for ${ wordSyn }`
                    
                    }
                ></input>

                {
                    results.length > 0 ? 
                    <div className="results">
                    {chosenWord}
                    </div>
                    :
                    <div className="no-results">
                    My sympathies, there seems to be an issue obtaining viable verbiage
                    </div>
                }
            </div>
        )
    }
}
