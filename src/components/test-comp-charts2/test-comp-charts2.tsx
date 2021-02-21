import { Component, Prop, h, Host,Element } from '@stencil/core';
// import { format } from '../../utils/utils';
import {  Chart } from 'chart.js';

@Component({
  tag: 'test-comp-charts2',
  styleUrl: 'test-comp-charts2.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  @Element() el: HTMLElement;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

//   private getText(): string {
//     return format(this.first, this.middle, this.last);
//   }

  componentDidLoad(){
    // // var ctx = document.getElementById('myChart').getContext('2d');
    // let ctx =  this.el.shadowRoot.querySelector('#myChart');

    // var myChart = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         datasets: [{
    //             label: 'Cities',
    //             data: [12, 19, 3, 5, 2, 3],                           
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
          
    //     }
    // });
    this.plotGraph();

  }

  tooltipStart(tooltipModel) {

    
    console.log("tooltipStart called");


    // var toolTipModelString = JSON.stringify(tooltipModel);
    // var tooltip = (JSON.parse(toolTipModelString));

    // console.log(JSON.stringify(tooltip));
   
        // Tooltip Element
    let ctx =  (this.el.shadowRoot.querySelector('#myChart') as HTMLElement);
    let chartjs =  (this.el.shadowRoot.querySelector('.chartjs-tooltip') as HTMLElement);

    let chartjsList =  this.el.shadowRoot.querySelectorAll('.chartjs-tooltip');

    chartjs.style.opacity = "0";

    
    
  
    (chartjsList[0] as HTMLElement).style.opacity = "0";
    (chartjsList[1] as HTMLElement).style.opacity = "0";



    ctx.classList.add("canvas-custom-cursor");
    var positionY = (ctx as HTMLElement).offsetTop;
    var positionX = (ctx as HTMLElement).offsetLeft;

    var tooltip = tooltipModel;

    

    if (!tooltip || !tooltip.opacity) {
      return;
    }

    console.log("tooltipStart called2");

    var dataPoint;
    if (tooltip.dataPoints.length > 0) {
        // tooltip.dataPoints.forEach(function(dataPoint) {
        for(var i = 0 ;i< tooltip.dataPoints.length;i++){
          
        dataPoint = tooltip.dataPoints[i];
        console.log("Test Test",dataPoint);
        var content = [dataPoint.label, dataPoint.value].join(': ');
        var id = '#tooltip-'+ dataPoint.datasetIndex;
        console.log("id",id);
        var tooltip1 = (this.el.shadowRoot.querySelector('#tooltip-'+ dataPoint.datasetIndex) as HTMLElement);
        // var pos = dataPoint.tooltipPosition();
        console.log("content",content);
        console.log("tooltip1",tooltip1);
        tooltip1.innerHTML = content;
        tooltip1.style.opacity = "1";       
        tooltip1.style.top = positionY + dataPoint.y + 'px';
        tooltip1.style.left = positionX + dataPoint.x + 'px';
        // tooltip1.style.top = positionY + "px" ;
        // tooltip1.style.left = positionX+"px";
        }
      
    }


}


  plotGraph(){



    let ctx =  this.el.shadowRoot.querySelector('#myChart');

    // var originalLineDraw = Chart.controllers.scatter.prototype.draw;
    // Chart.helpers.extend(Chart.controllers.scatter.prototype, {
    //   draw: function() {
    //     originalLineDraw.apply(this, arguments);
    
    //     var chart = this.chart;
    //     var ctx = chart.chart.ctx;
    
    //     var index = chart.config.data.lineAtIndex;
    //     if (index) {
    //       var xaxis = chart.scales['x-axis-0'];
    //       var yaxis = chart.scales['y-axis-0'];
    
    //       ctx.save();
    //       ctx.beginPath();
    //       ctx.moveTo(xaxis.getPixelForValue(undefined, index), yaxis.top);
    //       ctx.strokeStyle = '#ff0000';
    //       ctx.lineTo(xaxis.getPixelForValue(undefined, index), yaxis.bottom);
    //       ctx.stroke();
    //       ctx.restore();
    //     }
    //   }
    // });




    var myChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Chart 1',
            data: [{x: 1, y: 2}, {x: 2, y: 4}, {x: 3, y: 8},{x: 4, y: 16}],
            showLine: true,
            fill: false,
            borderColor: 'rgba(0, 200, 0, 1)'
          },
          {
            label: 'Chart 2',
            data: [{x: 1, y: 3}, {x: 3, y: 4}, {x: 4, y: 6}, {x: 6, y: 9}],
            showLine: true,
            fill: false,
            borderColor: 'rgba(200, 0, 0, 1)'
          }
        ]
      },
      options: {
        tooltips: {
          enabled:false,
          mode: 'index',
          intersect: false,
          custom:this.tooltipStart.bind(this)
        },
        elements: {
          point:{
              radius: 0
          }
      },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        },
      }
    });
  }


  protected render(): HTMLElement {
    return (
      <Host>
        <div>test 2</div>
        {/* <CoToolbarSlots marginBottom={false} />
        <div
          ref={(el) => (this.printContainerEl = el)}
          class='print-container'
          style={{
            position: 'relative',
            height: this.height,
            width: '100%',
            overflow: 'hidden'
          }}
        >
          <div ref={(el) => (this.printingEl = el)} class='printing'>
            <p>Chart wird exportiert ...</p>
          </div>
          <div
            ref={(el) => (this.chartContainerEl = el)}
            class='chart-container'
            style={{ position: 'relative', height: this.height, width: '100%' }}
          >
            <canvas ref={(el) => (this.canvas = el)} width='400' height='300' />
          </div>
        </div> */}
        <div class="graph_chart">
        <canvas id="overlay" width="600" height="400"></canvas>
        <canvas id="myChart" width="600" height="400"></canvas>
        <div class="chartjs-tooltip" id="tooltip-0"></div>
		    <div class="chartjs-tooltip" id="tooltip-1"></div>
        </div>
       
      
      </Host>
    );
  }
}
