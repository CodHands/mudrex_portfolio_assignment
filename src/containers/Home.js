import React, { Component } from 'react'
//material ui imports
import Snackbar from '../components/UI/Snackbar';
import ProgressBar from '../components/UI/ProgressBar';

//components
import AddCoin from '../components/AddCoin';
import Layout from '../components/UI/Layout';
import DataTable from '../components/DataTable';

//api import
import {fetchCapData, fetchExchangeRates} from '../services/marketService';

//config import
import {IMAGE_URL} from '../config';

const headerStyle = {
    fontWeight: 'bold'
}

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            portfolioData: [],
            rows: [],
            coin: '',
            amount: '',
            exchangeRates: {},
            price: '',
            snackBar: false,
            loading: true,
            selectedDate: new Date(),
            tooltip: false,
            columns: [
                { label: '', id: 'imageUrl', headerStyle },
                {
                    label: 'Rank',
                    id: 'rank',
                    headerStyle
                },
                { label: 'Name', id: 'name', headerStyle },
                { label: 'Price (USD)', id: 'priceusd', type: 'numeric', headerStyle},
                { label: 'Price (INR)', id: 'priceinr', type: 'numeric', headerStyle},
                {
                    label: 'Circulating Supply',
                    id: 'supply',
                    headerStyle
                }
            ] 
        }
    }

    componentDidMount(){
        let portfolio = localStorage.getItem('myPortfolio');
        if(portfolio){
            this.setState({
                portfolioData: JSON.parse(portfolio)
            })
        }
        this.fetchCoinMarketCap()
    };

    //handle date change
    handleDateChange = date => {
        this.setState({
            selectedDate: date
        });
    };

    //fetch top 100 coins and exchange rates for USD
    fetchCoinMarketCap = async() => {
        let response = await fetchCapData()
        let exchangeRates = await fetchExchangeRates();
        if(response){
            let rows = response.map((coin,index) => {
                return {
                    imageUrl: `${IMAGE_URL}${coin.slug.toLowerCase()}.png`, 
                    name: coin.name,
                    symbol: coin.symbol,
                    priceusd: coin.quote['USD'].price,
                    priceinr: exchangeRates.rates['INR']*coin.quote['USD'].price,
                    rank: coin.cmc_rank,
                    supply: coin.circulating_supply,
                    id: index
                }
            })
            this.checkExistingPortfolio(rows);
            this.setState({loading: false, tooltip: true, exchangeRates})
        }
    }

    checkExistingPortfolio = (rows) => {
        if(this.state.portfolioData.length && rows.length){
            rows.map((rw) => {
                this.state.portfolioData.map((port) => {
                    if(rw.name === port.coin.name){
                        rw['added'] = true;
                    }
                })
            })
        }
        this.setState({rows})

    }

    //open add coin modal
    handleClickOpen = (coin) => {
        this.setState({
            open: true,
            snackBar: false,
            tooltip: false,
            coin
        })
    };

    handleSubmit = async() => {
        //check if portfolio exists in locastorage
        let portfolio = JSON.parse(localStorage.getItem('myPortfolio'));

        const {amount,price, coin, selectedDate} = this.state;
        let body = {
            amount,
            selectedDate,
            buyingPriceUSD: Number(price),
            buyingPriceINR: Number(this.state.exchangeRates.rates['INR']*price), 
            coin
        }

        //if portfolio exists, add or replace the coin details else add portfolio to localstorage
        if(portfolio){
            let match = false;
            portfolio.map((fl,index) => {
                if(fl.coin.name === body.coin.name){
                    portfolio.splice(index,1)
                    portfolio.push(body);
                    this.setState({portfolioData: portfolio})
                    localStorage.setItem('myPortfolio', JSON.stringify(portfolio));
                    match = true;
                }
            })
            if(!match){
                portfolio.push(body);
                this.setState({portfolioData: portfolio})
                localStorage.setItem('myPortfolio', JSON.stringify(portfolio));
            }
        } else {
            localStorage.setItem('myPortfolio', JSON.stringify([body]));
            this.setState({portfolioData: [body]})
        }        

        this.setState({
            loading: true,
            open: false,
            amount: '',
            price: '',
        })

        //async function to show delay 
        setTimeout(() => {
            this.checkExistingPortfolio(this.state.rows);
            this.setState({
                snackBar: true,
                loading: false,
                selectedDate: new Date()
            })
        }, 1200);
    };

    //close modal
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    //handle price and amount change
    handleChange = (event) => this.setState({[event.target.name] : event.target.value});

    //hide tooltip
    hideTooltip = () => {
        this.setState({
            tooltip: false
        })
    }

    render() {        
        return (
            <Layout>
                {/* progress bar component */}
                <div className="progressBar-container" hidden={!this.state.loading}>
                   <ProgressBar/> 
                </div>

                {this.state.tooltip ? (
                    <div className="object">
                        <span>Please click here to add coin to Portfolio.</span>
                        <p className="cross" onClick={this.hideTooltip}>&#10006;</p>
                    </div>
                ) : null}                 
                

                {/* Add Coin Modal */}
                    <AddCoin 
                        isOpen={this.state.open} 
                        handleSubmit={this.handleSubmit}
                        handleClose={this.handleClose}
                        handleChange={this.handleChange}
                        coinDetails={this.state.coin}
                        price={this.state.price}
                        amount={this.state.amount}
                        selectedDate={this.state.selectedDate}
                        handleDateChange={this.handleDateChange}
                    />
                
                {/* Coins Table */}
                    <DataTable 
                        columns={this.state.columns} 
                        rows={this.state.rows}
                        isOpen={(data) => this.handleClickOpen(data)} 
                        handleClose={this.handleClose} />

                {this.state.snackBar ? <Snackbar /> : null}
            </Layout>
        )
    }
}

export default Home;
