let ctx = document.getElementById("myChart").getContext("2d");
let chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "bar",

  // The data for our dataset
  data: {
    labels: [],
    datasets: [
      {
        label: "Calories",
        backgroundColor: "rgb(0, 99, 132)",
        borderColor: "rgb(0, 99, 132)",
        data: [],
      },
    ],
  },

  // Configuration options go here
  options: {},
});

function updateChart(items) {
  // sort items in the array by date
  let itemsDateSorted = items.sort(function (a, b) {
    if (a.specifiedDate > b.specifiedDate) {
      return 1;
    }
    if (a.specifiedDate < b.specifiedDate) {
      return -1;
    }
    return 0;
  });

  // sum calories for the same date in a new array
  let itemsAllSorted = Object.values(
    itemsDateSorted.reduce((r, o) => {
      r[o.specifiedDate] = r[o.specifiedDate] || {
        specifiedDate: o.specifiedDate,
        calories: 0,
      };
      r[o.specifiedDate].calories += +o.calories;
      return r;
    }, {})
  );

  // insert data into the chart
  itemsAllSorted.forEach(function (item) {
    chart.data.labels.push(item.specifiedDate);
    chart.data.datasets[0].data.push(item.calories);
  });

  chart.update();
}

export default {
  updateChart,
  ctx,
  chart,
};
