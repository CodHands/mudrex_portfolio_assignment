import React, { Component, Fragment } from 'react'
import currencyFormatter from 'currency-formatter'

//material ui imports
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Snackbar from './../components/Snackbar';

//components
import MyPortfolio from './AddCoin';
import Layout from './../components/Layout';
import DataTable from '../components/DataTable';

//api import
import {fetchCapData, fetchExchangeRates, fetchCurrencies} from '../services/marketService';

//config import
import {IMAGE_URL} from '../config';

const headerStyle = {
    fontWeight: 'bold'
}

class home extends Component {

    constructor(props){
        super(props);
        this.theme = createMuiTheme({
            typography: {
                fontFamily: 'Barlow'
              }
        });
        this.state = {
            open: false,
            portfolioData: localStorage.getItem('portfolio') ? localStorage.getItem('portfolio') : [],
            rows: [],
            currencies: [],
            coin: '',
            amount: '',
            exchangeRates: {},
            price: '',
            snackBar: false,
            loading: true,
            selectedDate: new Date(),
            currency: '',
            columns: [
                { label: '', id: 'imageUrl', headerStyle },
                { label: 'Name', id: 'name', headerStyle },
                { label: 'Price (in INR)', id: 'price', type: 'numeric', headerStyle},
                {
                    label: 'Rank',
                    id: 'rank',
                    headerStyle
                },
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
    
    handleCurrency = async(event) => {
        await fetchExchangeRates(event.target.value);

        this.setState({
            currency: event.target.value
        })
    };

    fetchCoinMarketCap = async() => {
        let response = await fetchCapData()
        let exchangeRates = await fetchExchangeRates();
        let currencies = await fetchCurrencies();
        if(currencies && currencies.length){
            this.setState({currencies})
        }
        if(response){
            let rows = response.map((coin,index) => {
                return {
                    imageUrl: `${IMAGE_URL}${coin.slug.toLowerCase()}.png`, 
                    name: coin.name,
                    symbol: coin.symbol,
                    price: currencyFormatter.format(exchangeRates.rates['INR']*coin.quote['USD'].price, {code: 'INR'}),
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
        const {amount,price, coin} = this.state;
        let body = {
            amount,
            price: this.state.exchangeRates.rates['INR']*price, 
            coin
        }
        if(portfolio){
            portfolio.push(body);
            localStorage.setItem('myPortfolio', JSON.stringify(portfolio));
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
                loading: false
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
        console.log(this.state.currency)
        return (
            <Layout>
                <div className="progressBar-container" hidden={!this.state.loading}>
                    <CircularProgress className="progressBar"/>
                </div>
                    <MuiThemeProvider theme={this.theme}>
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
                        currency={this.state.currency}
                        handleDateChange={this.handleDateChange}
                        handleCurrency={this.handleCurrency}
                        currencies={this.state.currencies}
                    />
                        <DataTable 
                            columns={this.state.columns} 
                            rows={this.state.rows}
                            isOpen={(data) => this.handleClickOpen(data)} 
                            handleClose={this.handleClose} />
                    </MuiThemeProvider>
                {this.state.snackBar ? <Snackbar /> : null}
            </Layout>
        )
    }
}

export default home;
