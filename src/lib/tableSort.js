export const sortData = (column, sortOrder, data) => {
  return [...data].sort((a, b) => {
    let valueA, valueB;

    switch (column) {
      case "name":
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case "amount":
        valueA = a.amount;
        valueB = b.amount;
        break;
      case "price":
        valueA = a.price;
        valueB = b.price;
        break;
      case "change":
        valueA = a.change;
        valueB = b.change;
        break;
      case "avgPrice":
        valueA = a.price;
        valueB = b.price;
        break;
      case "total":
        valueA = a.price * a.amount;
        valueB = b.price * b.amount;
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
