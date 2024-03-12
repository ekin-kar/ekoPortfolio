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

const getOpenOrders = async (symbol) => {
  try {
    const openOrders = await client.getOpenOrders({ symbol: symbol });
    return openOrders;
  } catch (error) {
    console.error("Error fetching open orders:", error);
    throw error;
  }
};

const getPriceChange = async (symbol) => {
  try {
    const priceChange = await client.get24hrChangeStatististics({
      symbol: symbol,
    });
    return priceChange.priceChangePercent.toFixed(2);
  } catch (error) {
    throw error;
  }
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
const getAssets = async () => {
  try {
    const accountInfo = await client.getAccountInformation();
    const assetsWithBalance = accountInfo.balances.filter(
      (asset) => asset.free > 0
    );

    const assets = await Promise.all(
      assetsWithBalance.map(async (asset) => {
        const symbol = `${asset.asset}USDT`;
        try {
          const price = await getSymbolPriceTicker(symbol);
          const priceChange = await getPriceChange(symbol);
          const { currentAverage } = await getCoinStats(symbol);
          const totalWorth = (currentAverage * asset.free).toFixed(2);
          return {
            id: asset.asset,
            asset: asset.asset,
            free: asset.free,
            price: price || "0",
            priceChange: priceChange || "0",
            currentAverage: currentAverage || "0",
            totalWorth: totalWorth || "0",
            icon: `/${asset.asset.toLowerCase()}.png`,
          };
        } catch (error) {
          if (asset.asset === "USDT") {
            return {
              id: asset.asset,
              asset: asset.asset,
              free: asset.free.toFixed(2),
              price: "1",
              priceChange: "0",
              currentAverage: "1",
              totalWorth: asset.free.toFixed(2),
              icon: `/${asset.asset.toLowerCase()}.png`,
            };
          }
          return {
            id: asset.asset,
            asset: asset.asset,
            free: asset.free,
            price: "0",
            priceChange: "0",
            currentAverage: "0",
            totalWorth: "0",
            icon: `/${asset.asset.toLowerCase()}.png`,
          };
        }
      })
    );

    return assets;
  } catch (error) {
    console.error("Error fetching account information:", error);
    throw error;
  }
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
    let profit = 0;

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
        profit -= amount;
        currentAverage = (currentInvesment / totalBuys).toFixed(4);
      } else {
        realisedProfit += (price - currentAverage) * qty;
        totalBuys = totalBuys - qty;
        profit += amount;
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
      currentInvestment: assetBalance === 0 ? 0 : currentInvesment.toFixed(2),
      totalUsdtFee: totalUsdtFee.toFixed(2),
      totalBnbFees: totalBnbFees.toFixed(4),
      totalSymbolFee: totalSymbolFee.toFixed(tickSize),
      currentAverage: assetBalance === 0 ? 0 : currentAverage,
      realisedProfit:
        assetBalance === 0 ? profit.toFixed(2) : realisedProfit.toFixed(2),
    };
  } catch (error) {
    console.error("Error fetching coin stats:", error);
    throw error;
  }
};
const fetchAndLogSymbolPrice = async (symbol) => {
  try {
    const price = await getSymbolPriceTicker(symbol);
    const lotSize = await getLotSize(symbol);
    const orders = await getOpenOrders(symbol);
    const priceChange = await getPriceChange(symbol);

    const {
      transactions,
      assetName,
      assetBalance,
      totalSpent,
      currentInvestment,
      totalUsdtFee,
      totalBnbFees,
      totalSymbolFee,
      currentAverage,
      realisedProfit,
    } = await getCoinStats(symbol);
    const tickSize = await getTickSize(symbol);

    return {
      symbol,
      price,
      lotSize,
      tickSize,
      transactions,
      assetName,
      assetBalance,
      totalSpent,
      currentInvestment,
      totalUsdtFee,
      totalBnbFees,
      totalSymbolFee,
      currentAverage,
      realisedProfit,
      orders,
      priceChange,
    };
  } catch (error) {
    console.error("Error fetching symbol price:", error);
  }
};

module.exports = {
  fetchAndLogSymbolPrice,
  getAssets,
};
