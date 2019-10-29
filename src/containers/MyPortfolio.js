import React, { Component, Fragment } from 'react'
import currencyFormatter from 'currency-formatter'

//ui components
import Layout from '../components/UI/Layout';
import PortfolioTable from './../components/PortfolioTable';
import PieChartContainer from './../components/PieChartContainer';
import NoDataFound from './../components/NoDataFound';

const colors = ['#F66D44','#FEAE65','#E6F69D','#AADEA7','#64C2A6','#2D87BB', '#007CC3', '#7AC142', '#377B2B', '#FDBB2F'];

const headerStyle = {
    fontWeight: 'bold'
}


class MyPortfolio extends Component {

    constructor(props){
        super(props);
        this.state = {
            portfolio: JSON.parse(localStorage.getItem('myPortfolio')) ? JSON.parse(localStorage.getItem('myPortfolio')) : [],
            columns: [
                { label: '', id: 'imageUrl', headerStyle },
                { label: 'Name', id: 'name', headerStyle },
                {
                    label: 'Amount',
                    id: 'amount',
                    headerStyle
                },
                { label: 'Buying Price (USD)', id: 'priceusd', type: 'numeric', headerStyle},
                { label: 'Buying Price (INR)', id: 'priceinr', type: 'numeric', headerStyle},
                { label: 'Date', id: 'selectedDate', type: 'numeric', headerStyle},
                { label: 'Remove', id: 'remove', headerStyle}
            ] 
        }
    }

    //remove coin from portfolio
    removeCoin = (index) => {
        let updatedPortfolio = this.state.portfolio.filter((el,i) => index !== i);
        this.setState({
            portfolio: updatedPortfolio
        })
        localStorage.setItem('myPortfolio', JSON.stringify(updatedPortfolio))
    }

    render() {
        const {portfolio} = this.state;
        let total, data;
        if(portfolio.length){
            total = portfolio.reduce((acc,x) => Number(acc) + Number(x.buyingPriceINR), 0);
            data = {
                labels: portfolio.map((label) => label.coin.name),
                datasets: [{
                    data: portfolio.map((label) => label.buyingPriceINR),
                    backgroundColor: colors
                }]}
        }
        return (
            <Layout>
                {
                    portfolio.length ? 
                    <Fragment>
                        <div className="row mb-5">
                            <div className="col-5">
                                <div className="stats-container">
                                    <h1 className="mb-0">{currencyFormatter.format(total, {code: 'INR'})}</h1>
                                    <p>Total Portfolio Value</p>
                                    <div className="row mt-5 text-initial">
                                            {
                                                data.labels.map((el,index)=> {
                                                    return <div className="col-6 mb-3" key={el}>
                                                                <span className="coin-color" style={{
                                                                    background: `${data.datasets[0].backgroundColor[index]}`,
                                                                }}></span><span>{el}</span>
                                                            </div>
                                                })
                                            }
                                    </div>
                                </div>
                            </div>

                            {/* Pie Chart Container */}
                            <div className="col-7">
                                <PieChartContainer data={data}/>
                            </div>
                        </div>

                        {/* portfolio table */}
                        <PortfolioTable 
                            columns={this.state.columns}
                            rows={this.state.portfolio}
                            removeCoin={this.removeCoin}
                        />
                    </Fragment> : <NoDataFound/>
                }
            </Layout>
        )
    }
}

export default MyPortfolio;
