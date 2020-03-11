
$(function () {

    echarts_1();
    echarts_3();
    echarts_4();
    echarts_5();

    echarts_7();


    function echarts_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_1'));
        option = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
//            toolbox: {
//                feature: {
//                    restore: {},
//                    saveAsImage: {}
//                }
//            },
            series: [
                {
                    name: '打卡率',
                    type: 'gauge',
                    detail:
                    {
                        formatter: '{value}%',
                        textStyle:{
                            fontSize: 25,//字体大小
                            color: 'white'//字体颜色
                        },
                    },
                     title : {               //设置仪表盘中间显示文字样式
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontSize: 16,
                            color:"white"
                        }
                    },
                    data: [{value: 99.5, name: '完成率'}],
                    splitLine : {           //分割线样式（及10、20等长线样式）
                           length : 15,
                           lineStyle: {            // 分隔线样式。
                            color: "#eee",              //线的颜色,默认 #eee。
                            opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                            width: 2,                   //线度,默认 2。
                            type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
                            shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                            shadowColor: "#fff",        //阴影颜色。支持的格式同color。
                        }
                    },
                    pointer : { //指针样式
                      length: '80%'
                    },
                    axisLine:{
                          show : true,// 是否显示仪表盘轴线(轮廓线),默认 true。
                          lineStyle : { // 属性lineStyle控制线条样式
                            shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                            shadowColor: "#fff",        //阴影颜色。支持的格式同color。
                               color : [ //表盘颜色
                                   [ 0.5, "#DA462C" ],//0-50%处的颜色
                                 [ 0.7, "#FF9618" ],//51%-70%处的颜色
                                 [ 0.9, "#FFED44" ],//70%-90%处的颜色
                                 [ 1,"#20AE51" ]//90%-100%处的颜色
                               ],
                              width : 15//表盘宽度
                          }
                    },
                     axisLabel : { //文字样式（及“10”、“20”等文字样式）
                      color : "white",
                      distance : 5 //文字离表盘的距离
                  },
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    function map() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map'));
var data = [
     {name: '荆州', value: 511},
     {name: '宜昌', value: 656},
     {name: '武汉', value: 744},
     {name: '襄阳', value: 2992},
     {name: '黄冈', value: 658},
     {name: '随州', value: 452},
     {name: '孝感', value: 381},
     {name: '荆门', value: 261},
     {name: '咸宁', value: 220},
     {name: '黄石', value: 151},
     {name: '鄂州', value: 136},
];
var geoCoordMap = {
"鄂州":[114.89171,30.40057],
"黄石":[115.06611,30.22286],
"咸宁":[114.2984,29.85251],
"荆门":[112.20158,31.05193],
"孝感":[113.91049,30.91677],
"随州":[113.3712,31.71615],
"荆州":[112.19016,30.35269],
"宜昌":[111.43471,30.5307],
"黄冈":[114.88005,30.43472],
"武汉":[114.31,30.52],
"襄阳":[112.13555, 32.04487],

};
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

option = {
    tooltip : {
        trigger: 'item'
    },
  
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#3eabff',
                borderColor: '#fff'
            },
            emphasis: {
                areaColor: '#006be4'
            }
        }
    },
    series : [
        {
            name: '实时人数',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#fff'
                }
            }
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6)),
            symbolSize: function (val) {
                return val[2] / 20;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#0041d2',
                    shadowBlur: 10,
                    shadowColor: 'rgba(0,0,0,.3)'
                }
            },
            zlevel: 1
        }
    ]
};
		
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
	
    function echarts_3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_3'));

        option = {

            tooltip : {
                trigger: 'axis'
            },
          
            grid: {
                left: '3%',
                right: '5%',
                top:'8%',
                bottom: '5%',
                containLabel: true
            },
            color:['#a4d8cc','#25f3e6'],
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },

            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    axisTick:{show:false},
                    boundaryGap : false,
                    axisLabel: {
                        textStyle:{
                            color: 'rgba(255,255,255,.6)',
                            fontSize:'12'
                        },
                        lineStyle:{
                            color:'rgba(255,255,255,.1)',
                        },
                        interval: {default: 0},
                     //   rotate:50,
                        formatter : function(params){
                            var newParamsName = "";// 最终拼接成的字符串
                            var paramsNameNumber = params.length;// 实际标签的个数
                            var provideNumber = 4;// 每行能显示的字的个数
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                            /**
                             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                             */
                            // 条件等同于rowNumber>1
                            if (paramsNameNumber > provideNumber) {
                                /** 循环每一行,p表示行 */
                                var tempStr = "";
                                tempStr=params.substring(0,4);
                                newParamsName = tempStr+"...";// 最终拼成的字符串
                            } else {
                                // 将旧标签的值赋给新标签
                                newParamsName = params;
                            }
                            //将最终的字符串返回
                            return newParamsName
                        }

                    },
                    data: ['星期一','星期二 ','星期三 ','星期四','星期五','星期六','星期天']
                }
            ],
            yAxis : {
				min:300,
                type : 'value',
                axisLabel: {
                    textStyle: {
                        color: '#ccc',
                        fontSize:'12',
                    }
                },
                axisLine: {
                    lineStyle:{
                        color:'rgba(160,160,160,0.2)',
                    }
                },
                splitLine: {
                    lineStyle:{
                        color:'rgba(160,160,160,0.2)',
                    }
                },

            },
			
            series : [
                {
                    // name:'简易程序案件数',
					 lineStyle:{
                        color:'#72b0f9',
                    },
					
                    type:'line',
                    areaStyle: {

                        normal: {type: 'default',
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
                                offset: 0,
                                color: 'rgba(129,197,255,.6)'
                            }, {
                                offset: 1,
                                color: 'rgba(129,197,255,.0)'
                            }], false)
                        }
                    },
                    smooth:true,
                    itemStyle: {
                        normal: {areaStyle: {type: 'default'}}
                    },
                    data:[0, 0, 0,0, 0, 0, 0]
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_4'));

        option = {

            tooltip : {
                trigger: 'item',
                formatter: "{b}: <br/>  {c} ({d}%)"
            },

            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [

                {
                    name:'排名',
                    type:'pie',
                    color: ['#FFA500', "#00FFFF", '#FFC1C1', '#F0FFF0', '#EEEE00'],
                    radius : [10, 90],
                    center : ['50%', '50%'],
                    roseType : 'area',
                    data:{{city_top5}}
                }
            ]
        };


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_5'));

        var xData = function() {
            var data = ['湖北','贵州','河南','广西','山西'];

            return data;
        }();

        var data = [10124, 695, 609, 423, 408]

        option = {
            // backgroundColor: "#141f56",

            tooltip: {
                show: "true",
                trigger: 'item',
                backgroundColor: 'rgba(0,0,0,0.4)', // 背景
                padding: [38, 50], //内边距
                // extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
                formatter: function(params) {
                    if (params.seriesName != "") {
                        return params.name + ' ：  ' + params.value + ' 人';
                    }
                },

            },
            grid: {
                borderWidth: 0,
                top: 20,
                bottom: 35,
                left:60,
                right:10,
                textStyle: {
                    color: "#fff"
                }
            },
            xAxis: [{
                type: 'category',

                axisTick: {
                    show: false
                },
				 
                axisLine: {
                    show: true,
                    lineStyle: {
                         color:'rgba(255,255,255,0.2)',
                    }
                },
                axisLabel: {
                    inside: false,
                    textStyle: {
                        color: '#bac0c0',
                        fontWeight: 'normal',
                        fontSize: '12',
                    },
                    // formatter:function(val){
                    //     return val.split("").join("\n")
                    // },
                },
                data: xData,
            }, {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: xData,
            }],
            yAxis: {
				min:10,
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.2)',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)',
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#bac0c0',
                        fontWeight: 'normal',
                        fontSize: '12',
                    },
                    formatter: '{value}',
                },
            },
            series: [{
                type: 'bar',
                itemStyle: {
                    normal: {
                        show: true,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#00c0e9'
                        }, {
                            offset: 1,
                            color: '#3b73cf'
                        }]),
                        barBorderRadius: 50,
                        borderWidth: 0,
                    },
                    emphasis: {
                        shadowBlur: 15,
                        shadowColor: 'rgba(105,123, 214, 0.7)'
                    }
                },
                zlevel: 2,
                barWidth: '20%',
                data: data,
            },
                {
                    name: '',
                    type: 'bar',
                    xAxisIndex: 1,
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            borderWidth: 0,
                            shadowBlur: {
                                shadowColor: 'rgba(255,255,255,0.31)',
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowOffsetY: 2,
                            },
                        }
                    },
                    barWidth: '20%',
                    data: [30, 30, 30, 30, 30]
                }
            ]
        }


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

   function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map'));
        var option = {
		tooltip: {
	            trigger: 'item',
	            formatter: '{b}<br/>{c} (人)'
    		},
//    		toolbox: {
//	           show: true,
//	           orient: 'vertical',
//	           left: 'right',
//	           top: 'center',
//	           feature: {
//	               dataView: {readOnly: false},
//	               restore: {},
//	               saveAsImage: {}
//	           }
//    		},
    		visualMap: {
		            min: 0,
		            max: 1000,
		            text:['多','少'],
		            realtime: false,
		            calculable: true,
		            inRange: {
		                color: ['lightskyblue','yellow', 'orangered']
		            }
   			},
    		series:[
    			{
    				name: '湖北省',
           	 		type: 'map',//type必须声明为 map 说明该图标为echarts 中map类型
           	 		map: '湖北', //这里需要特别注意。如果是中国地图，map值为china，如果为各省市则为中文。这里用北京
           	 		aspectScale: 0.75, //长宽比. default: 0.75
           	 		zoom: 1.2,
           	 		//roam: true,
	                itemStyle:{
	                    normal:{label:{show:true}},
	                    emphasis:{label:{show:true}}
	                },
        			data: [
        				{name:'武汉市', value: 744},
        				{name:'襄阳市', value: 3368},
        				{name:'荆州市', value: 511},
        				{name:'黄冈市', value: 658},
        				{name:'孝感市', value: 381},
        				{name:'鄂州市', value: 136},
        				{name:'黄石市', value: 151},
        				{name:'咸宁市', value: 220},
        				{name:'荆门市', value: 261},
        				{name:'随州市', value: 452},
        				{name:'宜昌市', value: 656},
        				{name:'仙桃市', value: 119},
        				{name:'天门市', value: 148},
        				{name:'恩施土家族苗族自治州', value: 434},
        				{name:'十堰市', value: 612},
        				{name:'神农架林区', value: 4},
        				{name:'潜江市', value: 104},
        			]
    			}
    		]
	    };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

   function echarts_7() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map'));
        var option = {
//            backgroundColor: 'rgba(0,0,0,0.1)',
		    tooltip: {
	            trigger: 'item',
	            formatter:function(params){
	                var res = "";
	                res+=params["data"].name + '</br>';
	                res+='人数' +' : '+params['data'].value+'</br>';
					return res;
	            }
    		},
//    		toolbox: {
//	           show: true,
//	           orient: 'vertical',
//	           left: 'right',
//	           top: 'center',
//	           feature: {
//	                mark : {show: true},
//	               dataView: {show: true,readOnly: false},
//	               restore: {show: true},
//	               saveAsImage: {show: true}
//	           }
//    		},
    		visualMap: {
    		        type: 'continuous',
		            min: -120,
		            max: 600,
		            text:['高','低'],
		            textStyle: { // 文字颜色
                        color: '#ddd'
                    },
		            realtime: false,
		            calculable: true,
		            inRange: {
		                color: ['#0c1c30', '#216bc2', '#7760f6', '#9900FF']
		            }
   			},

    		series:[
    			{
    				name: '中国',
           	 		type: 'map',//type必须声明为 map 说明该图标为echarts 中map类型
           	 		map: 'china', //这里需要特别注意。如果是中国地图，map值为china，如果为各省市则为中文。这里用北京
           	 		aspectScale: 0.75, //长宽比. default: 0.75
           	 		zoom: 1.4,
           	 		roam: true,
           	 		//roam: true,
	                itemStyle: { // 地图区域的多边形 图形样式。
                        areaColor: '#0c1c30', // 地区默认颜色
                        borderColor: '#678dd6', //片区边框颜色
                        borderWidth:1, // 边框描绘
                        borderColor: '#90c5ed', //片区边框颜色
                        emphasis: { // 高亮状态下的多边形和标签样式
                          areaColor: '#24cbff', // 高亮区域背景颜色
                          shadowBlur: 20,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
        			data: [
        				{"name":'湖北', value: 10124},
        				{name:'贵州', value: 695},
        				{name:'河南', value: 609},
        				{name:'广西', value: 432},
        				{name:'山西', value: 408},
        				{name:'甘肃', value: 397},
        				{name:'安徽', value: 318},
        				{name:'湖南', value: 287},
        				{name:'江苏', value: 216},
        				{name:'山东', value: 141},
        				{name:'四川', value: 130},
        				{name:'江西', value: 74},
        				{name:'云南', value: 71},
        				{name:'广东', value: 55},
        				{name:'浙江', value: 51},
        				{name:'天津', value: 49},
        				{name:'重庆', value: 44},
        				{name:'陕西', value: 42},
        				{name:'河北', value: 42},
        				{name:'内蒙古', value: 39},
        				{name:'西藏', value: 38},
        				{name:'福建', value: 38},
        				{name:'新疆', value: 34},
        				{name:'海南', value: 32},
        				{name:'黑龙江', value: 29},
        				{name:'吉林', value: 28},
        				{name:'宁夏', value: 23},
        				{name:'辽宁', value: 18},
        				{name:'青海', value: 17},
        				{name:'上海', value: 2},
        				{name:'北京', value: 6},
        			],
        			label:{
        			    normal:{
        			        show:true,
        			        formatter:function(val){
        			            var area_content =  '{a|' + val.name + '}' + '-' + '{b|' + val.data.value + '}';
							    return area_content.split("-").join("\n");
        			        },
        			        rich: {
                                a: {
                                    color: 'black',
                                    fontSize: 8,

                                },
                                b: {
                                    color: 'white',
                                    fontFamily: 'Microsoft YaHei',
                                    fontSize: 8,
                                }
                            },
        			    },
        			    emphasis: {show: true}
        			},
    			}
    		]
	    };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option,true);
        	myChart.on('click', function(params){
			if(params.name == "湖北"){
			    self.location='hubei.html';
			}
		});
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
})

