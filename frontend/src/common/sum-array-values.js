exports.AddArrayValues = async (array) => {
  let sum = array.reduce(
    (previousValue, currentValue) =>
      parseInt(previousValue) + parseInt(currentValue),
    0
  );
  return sum;
};
