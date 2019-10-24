import React, {Component, Fragment} from 'react';

//api import
import {fetchCapData} from '../services/marketService';

//material ui imports
import MaterialTable from 'material-table';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

//config import
import {IMAGE_URL} from '../config';

const headerStyle = {
    fontWeight: 'bold'
}

class DataTable extends Component {

    constructor(props){
        super(props);
        this.theme = createMuiTheme({
            typography: {
                fontFamily: 'Barlow'
              }
        });
        this.state = {
            coinsTable : {
                columns: [
                    { title: '', field: 'imageUrl', headerStyle,
                render: rowData => <img src={rowData.imageUrl} style={{width: 40, borderRadius: '50%'}}/> },
                    { title: 'Name', field: 'name', headerStyle },
                    { title: 'Symbol', field: 'symbol', headerStyle},
                    { title: 'Price (in INR)', field: 'price', type: 'numeric',headerStyle},
                    {
                        title: 'Rank',
                        field: 'rank',headerStyle
                    },
                    {
                        title: 'Circulating Supply',
                        field: 'supply', headerStyle
                    }
                ],
                data: []
            }
        }
    }

    componentDidMount(){
        this.fetchCoinMarketCap()
    }

   fetchCoinMarketCap = async() => {
    let response = await fetchCapData()
    let data = response.map((coin) => {
        return {
            name: coin.name,
            symbol: coin.symbol,
            price: coin.quote['USD'].price,
            rank: coin.cmc_rank,
            supply: coin.circulating_supply,
            imageUrl: `${IMAGE_URL}${coin.slug.toLowerCase()}.png` 
        }
    })
    this.setState({
        coinsTable: {
            ...this.state.coinsTable,
            data
        }
    })
  }

  render(){
    const {coinsTable} = this.state;
    return (
        <Fragment>                
            <MuiThemeProvider theme={this.theme}>
                <MaterialTable
                    title="Top 100 Cryptocurrencies by Market Capitalization"
                    columns={coinsTable.columns}
                    data={coinsTable.data}
                    options={{
                        search: true,
                        exportButton: true,
                        pageSize:10
                    }}
                />
            </MuiThemeProvider>
        </Fragment>
    );
  }
}

export default DataTable;