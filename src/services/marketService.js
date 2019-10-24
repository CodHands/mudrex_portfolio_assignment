import { BASE_URL } from '../config';

export async function fetchCapData(){
    // var response = await fetch('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/tools/price-conversion?id=1&amount=50&convert=GPB,LTC,USD&CMC_PRO_API_KEY=8f002ce6-3925-42fd-9a35-6e973727e08e')
    var response = await fetch('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=8f002ce6-3925-42fd-9a35-6e973727e08e')
    var body = await response.json();
    if(body) return body.data
}