import React, { Component, Fragment } from 'react'
import currencyFormatter from 'currency-formatter'

//material ui imports
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from './../components/Snackbar';

//components
import MyPortfolio from './AddCoin';
import Layout from './../components/Layout';
import DataTable from '../components/DataTable';

//api import
import {fetchCapData, fetchExchangeRates} from '../services/marketService';

//config import
import {IMAGE_URL} from '../config';

const headerStyle = {
    fontWeight: 'bold'
}

class home extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            portfolioData: localStorage.getItem('portfolio') ? localStorage.getItem('portfolio') : [],
            rows: [],
            coin: '',
            amount: '',
            exchangeRates: {},
            price: '',
            snackBar: false,
            loading: true,
            selectedDate: new Date(),
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
        this.fetchCoinMarketCap()
    };

    handleDateChange = date => {
        this.setState({
            selectedDate: date
        });
    };

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
                    priceinr: currencyFormatter.format(exchangeRates.rates['INR']*coin.quote['USD'].price, {code: 'INR'}),
                    rank: coin.cmc_rank,
                    supply: coin.circulating_supply,
                    id: index
                }
            })
            this.setState({rows, loading: false, exchangeRates})
        }
    }

    handleClickOpen = (coin) => {
        this.setState({
            open: true,
            snackBar: false,
            coin
        })
    };

    handleSubmit = async() => {
        let portfolio = JSON.parse(localStorage.getItem('myPortfolio'));
        const {amount,price, coin, selectedDate} = this.state;
        let body = {
            amount,
            selectedDate,
            buyingPriceUSD: Number(price),
            buyingPriceINR: Number(this.state.exchangeRates.rates['INR']*price), 
            coin
        }
        if(portfolio){
            let match = false;
            portfolio.map((fl,index) => {
                if(fl.coin.name == body.coin.name){
                    portfolio.splice(index,1)
                    portfolio.push(body);
                    localStorage.setItem('myPortfolio', JSON.stringify(portfolio));
                    match = true;
                }
            })
            if(!match){
                portfolio.push(body);
                localStorage.setItem('myPortfolio', JSON.stringify(portfolio));
            }
        } else {
            localStorage.setItem('myPortfolio', JSON.stringify([body]));
        }
        this.setState({
            loading: true,
            open: false,
            amount: '',
            price: '',
        })
        setTimeout(() => {
            this.setState({
                snackBar: true,
                loading: false,
                selectedDate: new Date()
            })
        }, 2000);
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    navigateToPortfolio = () => {
        this.props.history.push('/portfolio')
    }

    handleChange = (event) => this.setState({[event.target.name] : event.target.value});

    render() {
        return (
            <Layout>
                <div className="progressBar-container" hidden={!this.state.loading}>
                    <CircularProgress className="progressBar"/>
                </div>
                    <MyPortfolio 
                        isOpen={this.state.open} 
                        handleSubmit={this.handleSubmit}
                        handleClose={this.handleClose}
                        portfolioData={this.state.portfolioData}
                        handleChange={this.handleChange}
                        coinDetails={this.state.coin}
                        price={this.state.price}
                        amount={this.state.amount}
                        selectedDate={this.state.selectedDate}
                        handleDateChange={this.handleDateChange}
                    />
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

export default home;
