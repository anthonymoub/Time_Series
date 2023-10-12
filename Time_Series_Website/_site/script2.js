const startYear = 1977,
  endYear = 2022,
  btn = document.getElementById('play-pause-button'),
  input = document.getElementById('play-range'),
  nbr = 20;

let dataset, chart;


/*
 * Animate dataLabels functionality
 */
(function (H) {
  const FLOAT = /^-?\d+\.?\d*$/;

  // Add animated textSetter, just like fill/strokeSetters
  H.Fx.prototype.textSetter = function () {
    let startValue = this.start.replace(/ /g, ''),
      endValue = this.end.replace(/ /g, ''),
      currentValue = this.end.replace(/ /g, '');

    if ((startValue || '').match(FLOAT)) {
      startValue = parseInt(startValue, 10);
      endValue = parseInt(endValue, 10);

      // No support for float
      currentValue = Highcharts.numberFormat(
        Math.round(startValue + (endValue - startValue) * this.pos),
        0
      );
    }

    this.elem.endText = this.end;

    this.elem.attr(this.prop, currentValue, null, true);
  };

  // Add textGetter, not supported at all at this moment:
  H.SVGElement.prototype.textGetter = function () {
    const ct = this.text.element.textContent || '';
    return this.endText ? this.endText : ct.substring(0, ct.length / 2);
  };

  // Temporary change label.attr() with label.animate():
  // In core it's simple change attr(...) => animate(...) for text prop
  H.wrap(H.Series.prototype, 'drawDataLabels', function (proceed) {
    const attr = H.SVGElement.prototype.attr,
      chart = this.chart;

    if (chart.sequenceTimer) {
      this.points.forEach(point =>
        (point.dataLabels || []).forEach(
          label =>
            (label.attr = function (hash) {
              if (hash && hash.text !== undefined) {
                const text = hash.text;

                delete hash.text;

                return this
                  .attr(hash)
                  .animate({ text });
              }
              return attr.apply(this, arguments);

            })
        )
      );
    }

    const ret = proceed.apply(
      this,
      Array.prototype.slice.call(arguments, 1)
    );

    this.points.forEach(p =>
      (p.dataLabels || []).forEach(d => (d.attr = attr))
    );

    return ret;
  });
}(Highcharts));


function getData(year) {
  const output = Object.entries(dataset)
    .map(country => {
      const [countryName, countryData] = country;
      return [countryName, Number(countryData[year])];
    })
    .sort((a, b) => b[1] - a[1]);
  return [output[0], output.slice(1, nbr)];
}



function getSubtitle() {
  const population = (getData(startYear)[0][1]).toFixed(2);
  return `<span style="font-size: 80px">${input.value}</span>
    <br>
`;
}

(async () => {

  dataset = {
    "Action": {
        "1977": 4,
        "1978": 5,
        "1979": 3,
        "1980": 7,
        "1981": 3,
        "1982": 6,
        "1983": 12,
        "1984": 7,
        "1985": 18,
        "1986": 14,
        "1987": 17,
        "1988": 3,
        "1989": 11,
        "1990": 15,
        "1991": 15,
        "1992": 13,
        "1993": 9,
        "1994": 12,
        "1995": 13,
        "1996": 21,
        "1997": 28,
        "1998": 10,
        "1999": 8,
        "2000": 12,
        "2001": 12,
        "2002": 18,
        "2003": 19,
        "2004": 12,
        "2005": 13,
        "2006": 9,
        "2007": 18,
        "2008": 13,
        "2009": 7,
        "2010": 20,
        "2011": 24,
        "2012": 20,
        "2013": 18,
        "2014": 26,
        "2015": 26,
        "2016": 25,
        "2017": 24,
        "2018": 29,
        "2019": 21,
        "2020": 20,
        "2021": 33,
        "2022": 36,
        "2023": 21
    },
    "Adventure": {
        "1977": 2,
        "1978": 1,
        "1980": 3,
        "1981": 4,
        "1982": 1,
        "1983": 6,
        "1984": 2,
        "1985": 14,
        "1986": 1,
        "1989": 6,
        "1990": 4,
        "1991": 4,
        "1992": 4,
        "1993": 7,
        "1994": 2,
        "1995": 3,
        "1996": 3,
        "1997": 2,
        "1998": 1,
        "1999": 4,
        "2000": 6,
        "2001": 7,
        "2002": 1,
        "2003": 2,
        "2004": 7,
        "2005": 3,
        "2006": 5,
        "2007": 3,
        "2008": 4,
        "2009": 3,
        "2010": 2,
        "2011": 2,
        "2012": 11,
        "2013": 8,
        "2014": 8,
        "2015": 9,
        "2016": 5,
        "2017": 5,
        "2018": 7,
        "2019": 4,
        "2020": 8,
        "2021": 6,
        "2022": 1,
        "2023": 2
    },
    "Comedy": {
        "1977": 1,
        "1978": 3,
        "1979": 3,
        "1980": 9,
        "1981": 8,
        "1982": 12,
        "1983": 24,
        "1984": 30,
        "1985": 10,
        "1986": 25,
        "1987": 17,
        "1988": 34,
        "1989": 27,
        "1990": 12,
        "1991": 22,
        "1992": 18,
        "1993": 13,
        "1994": 23,
        "1995": 14,
        "1996": 11,
        "1997": 9,
        "1998": 9,
        "1999": 8,
        "2000": 23,
        "2001": 7,
        "2002": 6,
        "2003": 19,
        "2004": 8,
        "2005": 17,
        "2006": 18,
        "2007": 14,
        "2008": 18,
        "2009": 17,
        "2010": 4,
        "2011": 6,
        "2012": 5,
        "2013": 3,
        "2014": 8,
        "2015": 2,
        "2016": 4,
        "2017": 3,
        "2018": 6,
        "2019": 3,
        "2020": 11,
        "2021": 1,
        "2022": 6,
        "2023": 4
    },
    "Drama": {
        "1977": 1,
        "1978": 1,
        "1979": 7,
        "1980": 8,
        "1981": 11,
        "1982": 14,
        "1983": 5,
        "1984": 11,
        "1985": 7,
        "1986": 7,
        "1987": 6,
        "1988": 6,
        "1989": 12,
        "1990": 11,
        "1991": 3,
        "1992": 4,
        "1993": 10,
        "1994": 14,
        "1995": 13,
        "1996": 8,
        "1997": 5,
        "1998": 21,
        "1999": 12,
        "2000": 6,
        "2001": 9,
        "2002": 7,
        "2003": 1,
        "2004": 7,
        "2005": 6,
        "2006": 7,
        "2007": 4,
        "2008": 2,
        "2009": 6,
        "2010": 8,
        "2011": 11,
        "2012": 8,
        "2013": 8,
        "2014": 4,
        "2015": 8,
        "2016": 1,
        "2017": 4,
        "2018": 4,
        "2019": 10,
        "2020": 6,
        "2021": 4,
        "2022": 3,
        "2023": 1
    },
    "Other": {
        "1977": 16,
        "1978": 14,
        "1979": 19,
        "1980": 12,
        "1981": 16,
        "1982": 4,
        "1983": 8,
        "1984": 5,
        "1985": 8,
        "1986": 7,
        "1987": 6,
        "1988": 6,
        "1989": 3,
        "1990": 5,
        "1991": 2,
        "1992": 1,
        "1993": 1,
        "1994": 5,
        "1995": 2,
        "1996": 3,
        "1997": 2,
        "1998": 4,
        "2000": 4,
        "2001": 2,
        "2002": 5,
        "2003": 3,
        "2004": 9,
        "2005": 1,
        "2007": 3,
        "2008": 3,
        "2009": 5,
        "2010": 3,
        "2011": 3,
        "2012": 2,
        "2013": 3,
        "2014": 1,
        "2015": 3,
        "2016": 2,
        "2017": 1,
        "2018": 4,
        "2019": 2,
        "2020": 1,
        "2022": 4,
        "2023": 7
    },
    "Sci-Fi": {
        "1977": 15,
        "1978": 2,
        "1979": 12,
        "1980": 4,
        "1982": 18,
        "1983": 4,
        "1984": 1,
        "1985": 1,
        "1986": 1,
        "1988": 2,
        "1989": 1,
        "1991": 1,
        "1992": 1,
        "1994": 2,
        "1996": 5,
        "1997": 3,
        "1998": 1,
        "1999": 4,
        "2000": 1,
        "2001": 1,
        "2002": 1,
        "2004": 1,
        "2008": 5,
        "2009": 1,
        "2013": 5,
        "2015": 2,
        "2017": 2
    },
    "Horror": {
        "1978": 1,
        "1979": 2,
        "1980": 3,
        "1981": 3,
        "1982": 3,
        "1983": 1,
        "1984": 1,
        "1986": 2,
        "1987": 1,
        "1988": 7,
        "1989": 3,
        "1990": 3,
        "1991": 3,
        "1992": 2,
        "1996": 1,
        "1997": 2,
        "1999": 2,
        "2000": 2,
        "2001": 2,
        "2002": 2,
        "2003": 6,
        "2004": 4,
        "2005": 5,
        "2006": 5,
        "2007": 4,
        "2008": 1,
        "2009": 5,
        "2010": 3,
        "2011": 1,
        "2012": 5,
        "2013": 5,
        "2014": 2,
        "2016": 1,
        "2017": 5,
        "2018": 3,
        "2019": 4,
        "2020": 8,
        "2021": 3,
        "2022": 3,
        "2023": 5
    },
    "Thriller": {
        "1978": 1,
        "1979": 1,
        "1980": 1,
        "1981": 2,
        "1984": 2,
        "1985": 1,
        "1987": 12,
        "1990": 6,
        "1991": 8,
        "1992": 9,
        "1993": 14,
        "1995": 5,
        "1996": 4,
        "1997": 4,
        "1999": 7,
        "2000": 6,
        "2001": 7,
        "2002": 10,
        "2003": 3,
        "2005": 3,
        "2006": 4,
        "2007": 5,
        "2008": 2,
        "2009": 2,
        "2011": 3,
        "2012": 3,
        "2014": 1,
        "2015": 1,
        "2016": 4,
        "2017": 3,
        "2020": 2,
        "2021": 5
    },
    "Musical": {
        "1979": 1,
        "1982": 1,
        "1983": 1,
        "1984": 1,
        "1993": 5,
        "1994": 1,
        "1997": 1,
        "2007": 3,
        "2008": 3,
        "2009": 2,
        "2016": 2,
        "2019": 5,
        "2021": 3,
        "2022": 1,
        "2023": 2
    },
    "Biography": {
        "1980": 1,
        "1988": 1,
        "1993": 1,
        "2015": 4
    },
    "Western": {
        "1980": 2,
        "1985": 1,
        "1988": 1,
        "1992": 7,
        "1993": 1,
        "1994": 1,
        "1999": 1,
        "2011": 1,
        "2016": 1
    },
    "Romance": {
        "1981": 1,
        "1982": 1,
        "1984": 2,
        "1986": 2,
        "1988": 1,
        "1990": 4,
        "1995": 2,
        "1997": 1,
        "1998": 5,
        "1999": 5,
        "2001": 3,
        "2002": 2,
        "2003": 2,
        "2004": 2,
        "2005": 1,
        "2006": 1,
        "2008": 2,
        "2009": 3,
        "2010": 2,
        "2011": 2,
        "2013": 1,
        "2017": 1
    },
    "Fantasy": {
        "1982": 2,
        "1986": 1,
        "1988": 1,
        "1993": 1,
        "1996": 1,
        "1998": 1,
        "2000": 2,
        "2001": 7,
        "2002": 5,
        "2003": 3,
        "2004": 3,
        "2005": 10,
        "2007": 3,
        "2008": 1,
        "2009": 4,
        "2010": 6,
        "2011": 1,
        "2013": 2,
        "2014": 1,
        "2015": 2,
        "2016": 4,
        "2017": 2,
        "2018": 2,
        "2019": 3,
        "2020": 1,
        "2021": 3,
        "2022": 5,
        "2023": 1
    },
    "Crime": {
        "1983": 1,
        "1987": 1,
        "1990": 1,
        "1994": 2,
        "1999": 1,
        "2001": 2,
        "2002": 1,
        "2004": 1,
        "2005": 1,
        "2007": 1,
        "2010": 1,
        "2012": 1
    },
    "Animation": {
        "1988": 1,
        "1994": 1,
        "1995": 9,
        "1996": 3,
        "1998": 8,
        "1999": 6,
        "2001": 2,
        "2002": 1,
        "2003": 2,
        "2004": 7,
        "2005": 3,
        "2006": 12,
        "2007": 4,
        "2008": 6,
        "2009": 4,
        "2010": 11,
        "2011": 7,
        "2012": 7,
        "2013": 7,
        "2014": 6,
        "2015": 3,
        "2016": 13,
        "2017": 13,
        "2018": 7,
        "2019": 8,
        "2020": 2,
        "2021": 4,
        "2022": 3,
        "2023": 3
    },
    "Mystery": {
        "1988": 1,
        "1990": 1,
        "1991": 2,
        "1992": 1,
        "1995": 2,
        "1997": 3,
        "1999": 4,
        "2000": 1,
        "2001": 1,
        "2002": 1,
        "2004": 1,
        "2006": 2,
        "2009": 1,
        "2010": 2,
        "2011": 2,
        "2014": 3,
        "2016": 2,
        "2020": 1,
        "2022": 1,
        "2023": 1
    }
}


  chart = Highcharts.chart('container', {
    chart: {
      animation: {
        duration: 500
      },
      marginRight: 50
    },
    title: {
      text: 'Box Office Winners per Genre',
      align: 'center'
    },
    subtitle: {
      useHTML: true,
      text: getSubtitle(),
      floating: true,
      align: 'right',
      verticalAlign: 'middle',
      y: -20,
      x: -100
    },

    legend: {
      enabled: false
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      opposite: true,
      tickPixelInterval: 150,
      title: {
        text: null
      }
    },
    plotOptions: {
      series: {
        animation: false,
        groupPadding: 0,
        pointPadding: 0.1,
        borderWidth: 0,
        colorByPoint: true,
        dataSorting: {
          enabled: true,
          matchByName: true
        },
        type: 'bar',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {
        type: 'bar',
        name: startYear,
        data: getData(startYear)[1]
      }
    ],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 550
        },
        chartOptions: {
          xAxis: {
            visible: false
          },
          subtitle: {
            x: 0
          },
          plotOptions: {
            series: {
              dataLabels: [{
                enabled: true,
                y: 8
              }, {
                enabled: true,
                format: '{point.name}',
                y: -8,
                style: {
                  fontWeight: 'normal',
                  opacity: 0.7
                }
              }]
            }
          }
        }
      }]
    }
  });
})();

/*

 * Pause the timeline, either when the range is ended, or when clicking the pause button.
 * Pausing stops the timer and resets the button to play mode.
 */
function pause(button) {
  button.title = 'play';
  button.className = 'fa fa-play';
  clearTimeout(chart.sequenceTimer);
  chart.sequenceTimer = undefined;
}

/*
 * Update the chart. This happens either on updating (moving) the range input,
 * or from a timer when the timeline is playing.
 */
function update(increment) {
  if (increment) {
    input.value = parseInt(input.value, 10) + increment;
  }
  if (input.value >= endYear) {
    // Auto-pause
    pause(btn);
  }

  chart.update(
    {
      subtitle: {
        text: getSubtitle()
      }
    },
    false,
    false,
    false
  );

  chart.series[0].update({
    name: input.value,
    data: getData(input.value)[1]
  });
}

/*
 * Play the timeline.
 */
function play(button) {
  button.title = 'pause';
  button.className = 'fa fa-pause';
  chart.sequenceTimer = setInterval(function () {
    update(1);
  }, 750);
}

function playAnimation() {
  let year = startYear; // Use startYear as the starting year
  btn.disabled = true;

  const animationInterval = setInterval(() => {
    input.value = year; // Update the input value
    chart.setTitle({ text: getSubtitle() }); // Update the chart title
    chart.series[0].setData(getData(year)); // Update the chart data

    year++; // Increment the year

    if (year > endYear) {
      clearInterval(animationInterval);
      btn.disabled = false;
    }
  }, 100);
}

btn.addEventListener('click', function () {
  if (chart.sequenceTimer) {
    pause(this);
  } else {
    play(this);
  }
});
/*
 * Trigger the update on the range bar click.
 */
input.addEventListener('click', function () {
  update();
});