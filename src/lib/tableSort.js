export const sortData = (column, sortOrder, data) => {
  return [...data].sort((a, b) => {
    let valueA, valueB;

    switch (column) {
      case "name":
        valueA = a.asset.toLowerCase();
        valueB = b.asset.toLowerCase();
        break;
      case "amount":
        valueA = parseFloat(a.free);
        valueB = parseFloat(b.free);
        break;
      case "price":
        valueA = parseFloat(a.price);
        valueB = parseFloat(b.price);
        break;
      case "change":
        valueA = parseFloat(a.priceChange);
        valueB = parseFloat(b.priceChange);
        break;
      case "avgPrice":
        valueA = parseFloat(a.currentAverage);
        valueB = parseFloat(b.currentAverage);
        break;
      case "total":
        valueA = parseFloat(a.totalWorth);
        valueB = parseFloat(b.totalWorth);
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
