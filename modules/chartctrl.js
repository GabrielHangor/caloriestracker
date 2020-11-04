let chart = null;
Chart.defaults.global.defaultFontFamily = "Comic Sans MS, cursive, sans-serif";

function initChart(items) {
  if (chart != null) {
    chart.destroy();
  }

  let ctx = document.getElementById("myChart").getContext("2d");
  chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "bar",

    // The data for our dataset
    data: {
      labels: [],
      datasets: [
        {
          label: "Calories",
          backgroundColor: "rgba(54, 162, 235, 0.2",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: "2",
          hoverBackgroundColor: "rgba(54, 162, 235, 0.5)",

          data: [],
        },
      ],
    },

    // Configuration options go here
    options: {
      responsive: true,

      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],

        xAxes: [
          {
            maxBarThickness: 70,
          },
        ],
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Calories chart",
        fontColor: "#333",
        fontSize: 20,
        padding: 20,
      },
    },
  });

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
  initChart,
};
