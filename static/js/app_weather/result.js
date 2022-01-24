"use strict"

document.addEventListener("DOMContentLoaded", e => {
    // variables
    const chart_height = 350;

    // map -> add data and coordinates to map-objects -> set marker on map
    let map = L.map('map').setView([geo_lat, geo_lon], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    L.marker([geo_lat, geo_lon]).addTo(map);

    // chart temperature
    let options_temperature = {
        series: [{
                name: 'Temperatur in &#176;',
                data: arr_temperature
            }],
        chart: {
            height: chart_height,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'text',
            categories: arr_hours
        },
        yaxis: {
            min: temp_min,
            max: temp_max
        },
    };

    // chart wind
    let options_wind = {
        series: [{
                name: 'Wind in km/h',
                data: arr_wind
            }],
        chart: {
            height: chart_height,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'text',
            categories: arr_hours
        },
    };

    // chart rain
    let options_rain = {
        series: [{
            name: 'Niederschlag in mm',
            data: arr_rain
        }],
        chart: {
            height: chart_height,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                if (val == 0) {
                    return '';
                } else {
                    return val;
                };
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        xaxis: {
            categories: arr_hours,
            position: 'bottom',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            min: 0,
            max: 2,
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    if (val == 0) {
                        return '';
                    } else {
                        return val;
                    };
                }
            }
        }
    };

    // chart precipitation
    let options_precipitation = {
        series: [{
            name: 'Niederschlag in %',
            data: arr_pop
        }],
        chart: {
            height: chart_height,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                if (val == 0) {
                    return '';
                } else {
                    return val + '%';
                };
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        xaxis: {
            categories: arr_hours,
            position: 'bottom',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            min: 0,
            max: 100,
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    if (val == 0) {
                        return '';
                    } else {
                        return val + '%';
                    };
                }
            }
        }
    };

    let chart_temperature = new ApexCharts(document.querySelector("#chart-temperature"), options_temperature);
    let chart_rain = new ApexCharts(document.querySelector("#chart-rain"), options_rain);
    let chart_wind = new ApexCharts(document.querySelector("#chart-wind"), options_wind);
    let chart_precipitation = new ApexCharts(document.querySelector("#chart-precipitation"), options_precipitation);

    chart_temperature.render();
    chart_rain.render();
    chart_wind.render();
    chart_precipitation.render();

});