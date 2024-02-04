import axios from 'axios'
const headers = {
  'x-chipper-user-id': process.env.CHIPPER_USER_ID,
  'x-chipper-api-key': process.env.CHIPPER_API_KEY
}

export async function getMe () {
  try {
    const url = 'https://api.chipper.network/v1/users/me'
    const { data } = await axios.get(url, { headers })
    console.log("Response: ", data)
  } catch (error) {
    console.error(error.response)
  }
}


export async function getBTCNGNRates(){
  const { sellPrice } = await getCryptoPricing('BTC')
  const response = await getExchangeRate('USD', 'NGN')
  const exchangeRate = response.data.exchangeRate
  console.log("Response: ", response.data.exchangeRate)

  const amount = sellPrice * exchangeRate * 0.95
  console.log(`Amount: ${amount}`)
  return amount
}

export async function getExchangeRate (from: string, to: string) {
  try {
    const url = 'https://api.chipper.network/v1/currencies?from=USD&to=NGN&marketRate=true'
    const { data } = await axios.get(url, { headers })
    console.log("Response: ", data)
    return data
  } catch (error) {
    console.error(error.response)
  }
}

export async function getPayout (reference: string) {
  const url = `https://api.chipper.network/v1/payouts/by-reference/${reference}`

  try {
    const { data } = await axios.get(url, { headers })
    console.log("Response: ", data)
    return data.payment
  } catch (error) {
    console.error(error.response)
  }
}

export async function sendPayout(tag: string, amount: number, currency: string, reference: string) {
  const url = 'https://api.chipper.network/v1/payouts'

    const body = {
      user: {
        type: "tag",
        tag: tag
      },
      reference: reference,
      note: "Chipper TBD POC",
      destinationAmount: {
        amount: amount,
        currency: currency
      }
    }
    console.log("Payout Body: ", body)

    try {
      const { data } = await axios.post(url, body, { headers })
      console.log("Payout Response: ", data)
    } catch (error) {
      console.error(error.response)

    }
}

// Mimicking getting crypto rates
async function getCryptoPricing(asset) {
    try {
        // Replace 'BTC-USD' with your desired pair if needed
        const pair  = `${asset}-USD`;
        const response = await axios.get(`https://api.pro.coinbase.com/products/${pair}/book?level=1`);

        // Level 1 is the highest bid and lowest ask; adjust if you need more depth
        const { bids, asks } = response.data;

        // Assuming the first element in bids and asks arrays are the best prices
        const buyPrice = asks[0][0]; // Best ask
        const sellPrice = bids[0][0]; // Best bid

        console.log(`Buy Price (Best Ask): ${buyPrice}`);
        console.log(`Sell Price (Best Bid): ${sellPrice}`);

        return { buyPrice, sellPrice };
    } catch (error) {
        console.error("Error fetching order book from Coinbase Pro: ", error);
        return { buyPrice: null, sellPrice: null, fee: null }
    }
}
