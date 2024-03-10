const { MainClient } = require("binance");
require("dotenv").config();

const client = new MainClient({
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_API_SECRET,
  beautifyResponses: true,
});

const getSymbolPriceTicker = async (symbol) => {
  try {
    const price = await client.getSymbolPriceTicker({ symbol: symbol });
    return price.price;
  } catch (error) {
    console.error("Error fetching the price:", error);
    throw error;
  }
};

// Minimum quantity/size of the order
const getLotSize = async (symbol) => {
  const symbolInfo = await client.getExchangeInfo();
  const lotSizeRaw = symbolInfo.symbols.find(
    (s) => s.symbol === symbol
  ).filters;
  const lotSize = lotSizeRaw.find(
    (filter) => filter.filterType === "LOT_SIZE"
  ).stepSize;
  return lotSize;
};

// Digits after the decimal point
const getTickSize = async (symbol) => {
  const symbolInfo = await client.getExchangeInfo();
  const tickSizeUnformatted = parseFloat(
    symbolInfo.symbols.find((s) => s.symbol === symbol).filters[0].tickSize
  );
  const tickSize =
    Math.abs(tickSizeUnformatted.toExponential().split("e")[1]) ||
    tickSizeUnformatted.toString().split(".")[1]?.length ||
    0;
  return tickSize;
};

const getCoinStats = async (symbol) => {
  try {
    let currentInvesment = 0;
    let totalUsdtFee = 0;
    let totalBnbFees = 0;
    let totalSymbolFee = 0;
    let totalBuys = 0;
    let totalSpent = 0;
    let currentAverage = 0;
    let realisedProfit = 0;

    const transactions = await client.getAccountTradeList({ symbol: symbol });
    const assetName = symbol.replace("USDT", "");
    const assetBalance = (await client.getAccountInformation()).balances.find(
      (asset) => asset.asset === assetName
    ).free;
    const tickSize = await getTickSize(symbol);
    for (const transaction of transactions) {
      const amount = parseFloat(transaction.quoteQty);
      const commission = parseFloat(transaction.commission);
      const qty = parseFloat(transaction.qty);
      const price = parseFloat(transaction.price);
      if (transaction.commissionAsset === "BNB") {
        totalBnbFees += commission;
      } else if (transaction.commissionAsset === symbol.slice(0, -4)) {
        totalSymbolFee += commission;
      } else if (transaction.commissionAsset === "USDT") {
        totalUsdtFee += commission;
      }
      if (transaction.isBuyer) {
        totalSpent += amount;
        totalBuys += qty;
        currentInvesment += amount;
        currentAverage = (currentInvesment / totalBuys).toFixed(4);
      } else {
        realisedProfit += (price - currentAverage) * qty;
        totalBuys = totalBuys - qty;
        if (totalBuys === 0) {
          currentAverage = 0;
          currentInvesment = 0;
        } else {
          currentInvesment = currentAverage * totalBuys;
        }
      }
    }

    return {
      transactions,
      assetName,
      assetBalance: assetBalance.toFixed(tickSize),
      totalSpent: totalSpent.toFixed(2),
      currentInvestment: currentInvesment.toFixed(2),
      totalUsdtFee: totalUsdtFee.toFixed(2),
      totalBnbFees: totalBnbFees.toFixed(4),
      totalSymbolFee,
      currentAverage,
      realisedProfit: realisedProfit.toFixed(2),
    };
  } catch (error) {
    console.error("Error fetching coin stats:", error);
    throw error;
  }
};

const fetchAndLogSymbolPrice = async () => {
  try {
    const symbol = "EDUUSDT";
    const tickSize = await getTickSize(symbol);
    const price = await getSymbolPriceTicker(symbol);
    const lotSize = await getLotSize(symbol);
    const coinStats = await getCoinStats(symbol);
    return {
      symbol,
      price: price.toFixed(tickSize),
      lotSize,
      coinStats,
    };
  } catch (error) {
    console.error("Error fetching symbol price:", error);
  }
};

module.exports = fetchAndLogSymbolPrice;
