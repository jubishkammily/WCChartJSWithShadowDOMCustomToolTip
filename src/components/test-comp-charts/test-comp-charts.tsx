import { Component, Prop, h, Host,Element } from '@stencil/core';
// import { format } from '../../utils/utils';
import {  Chart } from 'chart.js';

@Component({
  tag: 'test-comp-charts',
  styleUrl: 'test-comp-charts.css',
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

   
    // Tooltip Element
    let ctx =  this.el.shadowRoot.querySelector('#myChart');
    let ctxParent = ctx.parentNode;
    var tooltipEl = this.el.shadowRoot.getElementById('chartjs-tooltip');

    // Create element on first render
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<table></table>';
        // document.body.appendChild(tooltipEl);
       
        ctxParent.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    if (tooltipModel.opacity === "0") {
        tooltipEl.style.opacity = "0";
        return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
        tooltipEl.classList.add('no-transform');
    }

    function getBody(bodyItem) {
        return bodyItem.lines;
    }

    // Set Text
    if (tooltipModel.body) {
        var titleLines = tooltipModel.title || [];
        var bodyLines = tooltipModel.body.map(getBody);

        var innerHtml = '<thead>';

        titleLines.forEach(function(title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';

        bodyLines.forEach(function(body, i) {
            var colors = tooltipModel.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            var span = '<span style="' + style + '"></span>';
            innerHtml += '<tr><td>' + span + body + '</td></tr>';
        });
        innerHtml += '</tbody>';

        var tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
    }

    // `this` will be the overall tooltip
    var position = ctx.getBoundingClientRect();
  

    // Display, position, and set styles for font
    tooltipEl.style.opacity = "1";
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
    tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
    tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
    tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
    tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
    tooltipEl.style.pointerEvents = 'none';
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
        </div>
       
      
      </Host>
    );
  }
}
