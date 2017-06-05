/**
 * Created by admin on 2016/4/18.
 */
function Madechart(xfields,fieldCount01){
    $("#chart").highcharts({
        credits: {                                 //使图表的版权信息去掉
            enabled:false
        },
        chart: {
            type: 'column'
            //width:1000,
            //height:300
        },
        legend: {
            layout: 'horizontal',
            backgroundColor: '#FFFFFF',
            floating: true,
            align: 'left',
            verticalAlign: 'top',
            x: 90,
            y: 45
        },
        colors: ['#058DC7',  '#50B432',],
        margin: [0, 0, 0, 0],
        title: {
            text:"危化品生产企业日报柱形图",
            color: "#000000",
            font: "13px Arial,Helvetica,sans-serif; "
        },

        chartArea: {
            background: ""
        },
        xAxis: {
            categories: xfields,
            crosshair: true
        },

        yAxis: {
            min: 0,
            title: {
                text: "条"
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:14px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}<Strong>:</Strong> </td>' +
            '<td style="padding:0"><b>{point.y:.f}条</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true, // dataLabels设为true
                    style: {
                        color: '#000000'
                    }
                }
            }
        },

        series: [{
            name: "已上报",
            data: fieldCount01

        }]
    });

}
