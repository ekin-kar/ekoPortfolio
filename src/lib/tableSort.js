export const sortData = (column, sortOrder, data) => {
  return [...data].sort((a, b) => {
    let valueA, valueB;

    switch (column) {
      case "name":
        valueA = a.asset.toLowerCase();
        valueB = b.asset.toLowerCase();
        break;
      case "amount":
        valueA = a.free;
        valueB = b.free;
        break;
      case "price":
        valueA = a.price;
        valueB = b.price;
        break;
      case "change":
        valueA = a.priceChange;
        valueB = b.priceChange;
        break;
      case "avgPrice":
        valueA = a.currentAverage;
        valueB = b.currentAverage;
        break;
      case "total":
        valueA = a.totalWorth;
        valueB = b.totalWorth;
        break;
      default:
        return 0;
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
  });
};

export default sortData;
