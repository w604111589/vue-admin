<template>
  <div :class="className" :id="id"  :style="{height:height,width:width}"/>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import echarts from "echarts";
// import resize from "./mixins/resize";
// import { mixins } from 'vue-class-component';
@Component({
  // mixins: [resize]
})
export default class LineMarker extends Vue {
  @Prop({ default: "chart" })
  private className!: string;

  @Prop({ default: "chart" })
  private id!: string;

  @Prop({ default: "200px" })
  private width!: string;

  @Prop({ default: "200px" })
  private height!: string;

  @Prop({ default: [] })
  private list!: any[];

  @Prop({ default: {}  })
  private data!: any;

  private chart: any = null;

  private mounted() {
    this.initChart();
  }

  private axisX: any[] = [];
  private axisY: any[] = [];

  @Watch("data")
  private getData() {
    this.axisX.shift();
    this.axisY.shift();
    this.axisX.push(this.data.create_time);
    this.axisY.push(this.data.cpu_load);
    this.setOption();
  }

  @Watch("list")
  private getList() {
    const list = this.list;
    this.axisX = [];
    this.axisY = [];
    for ( let v of list) {
      // console.log(v);
      // this.axisX.push(v.create_time);
      // this.axisY.push(v.cpu_load);
      this.axisX.unshift(v.create_time);
      this.axisY.unshift(v.cpu_load);

    }

    this.setOption();

  }
  // 横轴坐标

  // private get transverse(){

  // }

  private beforeDestroy() {
    if (!this.chart) {
      return;
    }
    (this.chart as any).dispose();
    this.chart = null;
  }

  private setOption(){
    const  that = this;
      // tslint:disable-next-line:align
      (this.chart as any).setOption({
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: 'CPU 负载',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          // data: ['CMCC', 'CTCC', 'CUCC'],
          data: ['CMCC'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '10%',
          right: '2%',
          bottom: '35%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            interval: 20,
            // rotate:40,
            formatter: function(value: string)
            {
              return value.split(' ').join("\n");
            }
          },
          // data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
          data: that.axisX
        }],
        yAxis: [{
          type: 'value',
          name: '(load)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            },
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: 'CMCC',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(137, 189, 27, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(137, 189, 27, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12

            }
          },
          // data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
          data: that.axisY
        }, 
        ]
      });
  }

  private initChart() {
    const that = this;
      this.chart = echarts.init( (document as any).getElementById(this.id) );
      // that.chart = echarts.init( that.$refs.chart_id );
      // (this.chart as any).setOption({
      //   backgroundColor: '#394056',
      //   title: {
      //     top: 20,
      //     text: 'Requests',
      //     textStyle: {
      //       fontWeight: 'normal',
      //       fontSize: 16,
      //       color: '#F1F1F3'
      //     },
      //     left: '1%'
      //   },
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       lineStyle: {
      //         color: '#57617B'
      //       }
      //     }
      //   },
      //   legend: {
      //     top: 20,
      //     icon: 'rect',
      //     itemWidth: 14,
      //     itemHeight: 5,
      //     itemGap: 13,
      //     // data: ['CMCC', 'CTCC', 'CUCC'],
      //     data: ['CMCC'],
      //     right: '4%',
      //     textStyle: {
      //       fontSize: 12,
      //       color: '#F1F1F3'
      //     }
      //   },
      //   grid: {
      //     top: 100,
      //     left: '2%',
      //     right: '2%',
      //     bottom: '2%',
      //     containLabel: true
      //   },
      //   xAxis: [{
      //     type: 'category',
      //     boundaryGap: false,
      //     axisLine: {
      //       lineStyle: {
      //         color: '#57617B'
      //       }
      //     },
      //     // data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
      //     data: that.axisX
      //   }],
      //   yAxis: [{
      //     type: 'value',
      //     name: '(%)',
      //     axisTick: {
      //       show: false
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: '#57617B'
      //       }
      //     },
      //     axisLabel: {
      //       margin: 10,
      //       textStyle: {
      //         fontSize: 14
      //       }
      //     },
      //     splitLine: {
      //       lineStyle: {
      //         color: '#57617B'
      //       }
      //     }
      //   }],
      //   series: [{
      //     name: 'CMCC',
      //     type: 'line',
      //     smooth: true,
      //     symbol: 'circle',
      //     symbolSize: 5,
      //     showSymbol: false,
      //     lineStyle: {
      //       normal: {
      //         width: 1
      //       }
      //     },
      //     areaStyle: {
      //       normal: {
      //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //           offset: 0,
      //           color: 'rgba(137, 189, 27, 0.3)'
      //         }, {
      //           offset: 0.8,
      //           color: 'rgba(137, 189, 27, 0)'
      //         }], false),
      //         shadowColor: 'rgba(0, 0, 0, 0.1)',
      //         shadowBlur: 10
      //       }
      //     },
      //     itemStyle: {
      //       normal: {
      //         color: 'rgb(137,189,27)',
      //         borderColor: 'rgba(137,189,2,0.27)',
      //         borderWidth: 12

      //       }
      //     },
      //     // data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
      //     data: that.axisY
      //   }, 
      //   // {
      //   //   name: 'CTCC',
      //   //   type: 'line',
      //   //   smooth: true,
      //   //   symbol: 'circle',
      //   //   symbolSize: 5,
      //   //   showSymbol: false,
      //   //   lineStyle: {
      //   //     normal: {
      //   //       width: 1
      //   //     }
      //   //   },
      //   //   areaStyle: {
      //   //     normal: {
      //   //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //   //         offset: 0,
      //   //         color: 'rgba(0, 136, 212, 0.3)'
      //   //       }, {
      //   //         offset: 0.8,
      //   //         color: 'rgba(0, 136, 212, 0)'
      //   //       }], false),
      //   //       shadowColor: 'rgba(0, 0, 0, 0.1)',
      //   //       shadowBlur: 10
      //   //     }
      //   //   },
      //   //   itemStyle: {
      //   //     normal: {
      //   //       color: 'rgb(0,136,212)',
      //   //       borderColor: 'rgba(0,136,212,0.2)',
      //   //       borderWidth: 12

      //   //     }
      //   //   },
      //   //   data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
      //   // }, 
      //   // {
      //   //   name: 'CUCC',
      //   //   type: 'line',
      //   //   smooth: true,
      //   //   symbol: 'circle',
      //   //   symbolSize: 5,
      //   //   showSymbol: false,
      //   //   lineStyle: {
      //   //     normal: {
      //   //       width: 1
      //   //     }
      //   //   },
      //   //   areaStyle: {
      //   //     normal: {
      //   //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //   //         offset: 0,
      //   //         color: 'rgba(219, 50, 51, 0.3)'
      //   //       }, {
      //   //         offset: 0.8,
      //   //         color: 'rgba(219, 50, 51, 0)'
      //   //       }], false),
      //   //       shadowColor: 'rgba(0, 0, 0, 0.1)',
      //   //       shadowBlur: 10
      //   //     }
      //   //   },
      //   //   itemStyle: {
      //   //     normal: {
      //   //       color: 'rgb(219,50,51)',
      //   //       borderColor: 'rgba(219,50,51,0.2)',
      //   //       borderWidth: 12
      //   //     }
      //   //   },
      //   //   data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
      //   // }
      //   ]
      // });
  }

}
</script>

<style scoped lang="scss">
</style>