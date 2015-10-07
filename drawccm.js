var dataset = externalDataSet;

function modelView() {

var $container = $('.stigmod-modal-d3');

//svg的长宽
// var width = $container[0].clientWidth - 30;
// var height = $container[0].clientHeight - 80;  // 80px 包含了各种 margin padding

var width = 3000;
var height = 3000;

var tickNum = 50;

var colorFillArray = {green: "#30B6AF", yellow: "#FCC940", blue: "#4356C0", grey:"#BABDBC",
                          orange: "#F25A29", purple: "#AD62CE", red: "#FF6C7C"};
var colorStrokeArray = {green: "#46A39E", yellow: "#F3BA25", blue: "#3445A2", grey:"#888888",
                            orange: "#DC4717", purple: "#9453B1", red: "#EB5D6C"};

var selectedColor = "#005499";  //选择之后圈和连线的颜色
var lineColor = "#BABDBC";      //连线的颜色
var strokeColor = "#8491c3";    //不选择时圈的颜色
var fillColor = "#73bbe2";      //点的颜色
var nameNotSelectedFill = "#999"; //名字的颜色
var fillArray = { class: "#30B6AF", value: "#FF6C7C", relation: "#FCC940", builtInClass: "#AD62CE"};
var strokeArray = {class: "#46A39E", value: "#EB5D6C", relation: "#F3BA25", builtInClass: "#9453B1"};

var lineWidth = 1;              //连线的宽度
var lineSelectedWidth = 2;      //连线被选择之后的宽度

/**
 *  将模型数据转换为展示 model view 所需的格式
 *   存入dataset
 */

// var dataset = {
//   nodes: [],
//   edges: []
// };

// var nodeRecord = {}; //记录node节点标号
// var nodeNumber = 0;

// //类转存入nodes
// for (ClassVar in model[0]) {
//   var myclass = {};
//   myclass.name = ClassVar;
//   var myAttribute = [];
//   for (AttributeVar in model[0][ClassVar][0])
//     myAttribute.push(model[0][ClassVar][0][AttributeVar][0]);
//   myclass.attribute = myAttribute;
//   dataset.nodes.push(myclass);
//   nodeRecord[ClassVar] = nodeNumber;
//   nodeNumber = nodeNumber + 1;
// }

// //关系转存入edges
// for (RelationVar in model[1]) {
//   var myrelation = {};
//   for (AttributeVar in model[1][RelationVar][0]) {
//     myrelation.type = model[1][RelationVar][0][AttributeVar][0]["type"][0];
//     var class1 = model[1][RelationVar][0][AttributeVar][0]["class"][1];
//     var class2 = model[1][RelationVar][0][AttributeVar][0]["class"][0];
//     myrelation.source = nodeRecord[class1];
//     myrelation.target = nodeRecord[class2];
//     myrelation.multiplicity = model[1][RelationVar][0][AttributeVar][0]["multiplicity"];
//     myrelation.role = model[1][RelationVar][0][AttributeVar][0]["role"];
//   }
//   dataset.edges.push(myrelation);
// }

//缩放定义
var zoom = d3.behavior.zoom()
  // .center([width / 2, height / 2])
  //.scaleExtent([1, 10])
  .on("zoom", zoomed);


// Detail 框的拖拽
var tooltip = document.getElementById('tooltip');
// startDrag(tooltip, tooltip);




//设置svg的大小
var svg = d3.select("#view")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("cursor", "default")
  .append("g")
  .call(zoom); //调用缩放功能
  // .append("svg:g");
  // .on("mousedown.zoom", null); //防止拖拽

//颜色为白的背景 -> 缩放时无需鼠标移到node上
svg.append("rect")
  .attr("class", "background")
  .attr("fill", "#fff")
  .attr("width", width)
  .attr("height", height);

var container = svg.append("svg:g");


//使用dataset中的nodes和edges初始化force布局
var force = d3.layout.force()
  .nodes(dataset.nodes)
  .links(dataset.edges)
  .size([width, height])
  .linkDistance(150)
  .charge([-350])
  .start();

var drag = force.drag()
  .on("dragstart", function(d) {
    d3.event.sourceEvent.stopPropagation();
});


//连线与edges数据绑定
var link = container.selectAll(".link")
  .data(dataset.edges)
  //.data(model[1])
  .enter().append("g")
  .attr("class", "link");

//节点与nodes数据绑定
var node = container.selectAll(".node")
  .data(dataset.nodes)
  .enter().append("g")
  .attr("class", "node")
  .call(drag);
  // .call(force.drag().on("drag", function(d) { drag() }));

node.append("title")
  .text(function(d) { return d.users; });

//节点添加文本，文本内容为节点名称
var myname = node.append("text")
  .attr("x", function(d){
    return radiusover(d) + 2;
  })
  .attr("y", ".35em")
  .text(function(d) {
    return d.name;
  })
  .attr("font-size", "12")
  .attr("fill", "#666");
  // .attr("stroke-width", 0.5);


//颜色范围
var colors = d3.scale.category20();

//箭头定义
var defs = container.append("defs");

defs.append("marker")
  .attr("id","plain")
  .attr("markerUnits", "userSpaceOnUse")
  .attr("viewBox", "0 -5 10 10")
  .attr("markerWidth",7)
  .attr("markerHeight",7)
  .attr("refX",10)
  .attr("refY",0)
  .attr("orient","auto")
  .append("svg:path")
  .attr("class", "edgeColortoChange")
  .attr("stroke-width", lineWidth)
  .attr("d", "M0,-5L10,0L0,5")
  .attr("fill","none")
  .attr("stroke",lineColor);

defs.append("marker")
  .attr("id","plainHover")
  .attr("markerUnits", "userSpaceOnUse")
  .attr("viewBox", "0 -5 10 10")
  .attr("markerWidth",7)
  .attr("markerHeight",7)
  .attr("refX",10)
  .attr("refY",0)
  .attr("orient","auto")
  .append("svg:path")
  .attr("stroke-width", lineSelectedWidth)
  .attr("d", "M0,-5L10,0L0,5")
  .attr("fill","none")
  .attr("stroke", selectedColor);

// //Generalization箭头(空心三角)
// var genMarker = defs.append("marker")
//   .attr("id", "Generalization") //箭头id
//   .attr("markerUnits", "userSpaceOnUse")
//   .attr("viewBox", "-5 -5 15 10")
//   .attr("markerWidth", 12)
//   .attr("markerHeight", 12)
//   .attr("refX", 10)
//   .attr("refY", 0)
//   .attr("orient", "auto")
//   .append("svg:path")
//   .attr("stroke-width", lineWidth)
//   .attr("d", "M0,-5L10,0L0,5Z")
//   .attr("fill", "#fff")
//   .attr("stroke", lineColor);

// //连线高亮时的Generalization箭头
// var genMarkerHover = defs.append("marker")
//   .attr("id", "GeneralizationHover")
//   .attr("markerUnits", "userSpaceOnUse")
//   .attr("viewBox", "-5 -5 15 10")
//   .attr("markerWidth", 12)
//   .attr("markerHeight", 12)
//   .attr("refX", 10)
//   .attr("refY", 0)
//   .attr("orient", "auto")
//   .append("svg:path")
//   .attr("stroke-width", lineSelectedWidth)
//   .attr("stroke-linecap", "round")
//   .attr("d", "M0,-5L10,0L0,5Z")
//   .attr("fill", "#fff")
//   .attr("stroke", selectedColor);

// //Aggregation箭头(空心菱形)
// var aggreMarker = defs.append("marker")
//   .attr("id", "Aggregation")
//   .attr("markerUnits", "userSpaceOnUse")
//   .attr("viewBox", "-10 -5 20 10")
//   .attr("markerWidth", 12)
//   .attr("markerHeight", 12)
//   .attr("refX", 10)
//   .attr("refY", 0)
//   .attr("orient", "auto")
//   .append("svg:path")
//   .attr("stroke-width", lineWidth)
//   .attr("d", "M0,-5L10,0L0,5L-10,0Z")
//   .attr("fill", "#fff")
//   .attr("stroke", lineColor);

// //连线高亮时的Aggregation箭头
// var aggreMarkerHover = defs.append("marker")
//   .attr("id", "AggregationHover")
//   .attr("markerUnits", "userSpaceOnUse")
//   .attr("viewBox", "-10 -5 20 10")
//   .attr("markerWidth", 12)
//   .attr("markerHeight", 12)
//   .attr("refX", 10)
//   .attr("refY", 0)
//   .attr("orient", "auto")
//   .append("svg:path")
//   .attr("stroke-width", lineSelectedWidth)
//   .attr("d", "M0,-5L10,0L0,5L-10,0Z")
//   .attr("fill", "#fff")
//   .attr("stroke", selectedColor);

// //Composition箭头(实心菱形)
// var comMarker = defs.append("marker")
//   .attr("id", "Composition")
//   .attr("markerUnits", "userSpaceOnUse")
//   .attr("viewBox", "-10 -5 20 10")
//   .attr("markerWidth", 12)
//   .attr("markerHeight", 12)
//   .attr("refX", 10)
//   .attr("refY", 0)
//   .attr("orient", "auto")
//   .append("svg:path")
//   .attr("stroke-width", lineWidth)
//   .attr("d", "M0,-5L10,0L0,5L-10,0Z")
//   .attr("fill", lineColor)
//   .attr("stroke", lineColor);

// //连线高亮时的Composition箭头
// var comMarkerHover = defs.append("marker")
//   .attr("id", "CompositionHover")
//   .attr("markerUnits", "userSpaceOnUse")
//   .attr("viewBox", "-10 -5 20 10")
//   .attr("markerWidth", 12)
//   .attr("markerHeight", 12)
//   .attr("refX", 10)
//   .attr("refY", 0)
//   .attr("orient", "auto")
//   .append("svg:path")
//   .attr("stroke-width", lineSelectedWidth)
//   .attr("d", "M0,-5L10,0L0,5L-10,0Z")
//   .attr("fill", selectedColor)
//   .attr("stroke", selectedColor);


/**
 *   Zoom缩放函数
 */

function zoomed() {
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// function dragstarted(d) {
//   d3.event.sourceEvent.stopPropagation();

//   d3.select(this).classed("dragging", true);
//   // force.start();
// }

// function dragged(d) {

//   d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);

// }

// function dragended(d) {

//   d3.select(this).classed("dragging", false);
// }



/**
 *   计算半径函数
 */
// function radiusover(d) {
//   if (!d.weight) { //节点weight属性没有值初始化为1（一般就是叶子了）
//     d.weight = 1;
//   }
//   return d.weight * 3 + 5;
// }
function  radiusover (d){
    return d.ref * 2 + 5;
}

//记录之前一次点击的临时节点
var tmpnode = null;
var tmpedge = null;

/**
 *   将所有节点和边归为非高亮状态
 *   参数：空
 */
function noneClickStyle() {
  node.selectAll("circle")
    .attr("fill-opacity", 0.9)
    .attr("stroke-width", 1)
    .attr("stroke", function(d){
      return strokeArray[d.type];
    })
    .attr("fill", function(d) {
        return fillArray[d.type];
      });
  node.selectAll("text")
    .attr("font-size", "12")
    .attr("fill", "#666")
    .attr("opacity", 1);
  link.selectAll("line")
    .attr("stroke", lineColor)
    .attr("stroke-width", lineWidth)
    .attr("marker-end", function(d) {
      return "url(#" + "plain" + ")";
    });
}

/**
 *   高亮某节点及其文本
 *   参数：被高亮节点node
 */
// function highlightNode(node){

//   //高亮该节点
//   mycircle.attr("fill-opacity", function(mynode) {
//     if (mynode === node)
//       return 0.9;
//     else
//       return 0.5;
//   });

//   mycircle.attr("stroke-width", function(mynode) {
//     if (mynode === node)
//       return 3;
//     else
//       return 1;
//   });

//   //高亮节点相关的文本
//   myname.attr("stroke", function(mytext) {
//     if (mytext === node)
//       return "#444";
//     else
//       return "#ccc";
//   });

//   myname.attr("stroke-width", function(mytext) {
//     if (mytext === node)
//       return 0.8;
//     else
//       return 0.5;
//   });
// }

/**
 *   高亮与某节点相连的线
 *   参数：节点node
 */
function highlightNodeEdge(node){

  //将该节点与所有邻居节点存入neighbors数组
  var neighbors = [];
  neighbors.push(node);

  myline.attr("stroke", function(edge) {
    if (edge.source === node) {
      neighbors.push(edge.target);
      return selectedColor;
    }
    else if(edge.target == node){
      neighbors.push(edge.source);
      return selectedColor;
    }
    else
      return lineColor;
  });

  myline.attr("stroke-width", function(edge) {
    if (edge.source === node || edge.target === node) {
      return lineSelectedWidth;
    } else
      return lineWidth;
  });

  myline.attr("marker-end", function(edge) {
    if (edge.source === node || edge.target === node) {
      return "url(#" + "plain" + "Hover)";
    } else
      return "url(#" + "plain" + ")";
  });

  //高亮该节点与邻居节点
  mycircle.attr("fill-opacity", function(mynode) {
    if (neighbors.indexOf(mynode) > -1)
      return 1.0;
    else
      return 0.5;
  });

  mycircle.attr("stroke-width", function(mynode) {
    if (neighbors.indexOf(mynode) > -1)
      return 2;
    else
      return 0.5;
  });

  mycircle.attr("stroke", function(mynode) {
    if (neighbors.indexOf(mynode) > -1)
      return selectedColor;
    else
      return "none";
  });

  //高亮节点相关的文本
  myname.attr("font-size", function(mytext) {
    if (neighbors.indexOf(mytext) > -1)
      return 12;
    else
      return 11;
  });

  myname.attr("fill", function(mytext) {
    if (neighbors.indexOf(mytext) > -1)
      return "#000";
    else
      return nameNotSelectedFill;
  });

  myname.attr("opacity", function(mytext) {
    if (neighbors.indexOf(mytext) > -1)
      return 1;
    else
      return 0.6;
  });

}

/**
 *   高亮某条边
 *   参数：被高亮的边edge
 */
function highlightEdge(edge){

  myline.attr("stroke", function(myedge) {
    if (myedge === edge) {
      return selectedColor;
    } else
      return lineColor;
  });

  myline.attr("stroke-width", function(myedge) {
    if (myedge === edge) {
      return lineSelectedWidth;
    } else
      return lineWidth;
  });

  myline.attr("marker-end", function(myedge) {
    if (myedge === edge) {
      return "url(#" + "plain" + "Hover)";
    } else
      return "url(#" + "plain" + ")";
  });

}

/**
 *   高亮与某条边相连的节点
 *   参数：被选择的边edge
 */
function highlightEdgeNode(edge){
  //高亮该节点
  mycircle.attr("fill-opacity", function(mynode) {
    if (mynode === edge.source || mynode === edge.target)
      return 1.0;
    else
      return 0.5;
  });

  mycircle.attr("stroke-width", function(mynode) {
    if (mynode === edge.source || mynode === edge.target)
      return 2;
    else
      return 0.5;
  });

  mycircle.attr("stroke", function(mynode) {
    if (mynode === edge.source || mynode === edge.target)
      return selectedColor;
    else
      return "none";
  });

  //高亮节点相关的文本
  myname.attr("font-size", function(mytext) {
    if (mytext === edge.source || mytext === edge.target)
      return 12;
    else
      return 11;
  });

  myname.attr("fill", function(mytext) {
    if (mytext === edge.source || mytext === edge.target)
      return "#000";
    else
      return nameNotSelectedFill;
  });

  myname.attr("opacity", function(mytext) {
    if (mytext === edge.source || mytext === edge.target)
      return 1;
    else
      return 0.6;
  });
}

/**
 *   点击某一节点，
 *   右侧展示详细信息
 *   并高亮相关信息
 *   参数：被点击的节点node
 */
function clickNode(node){

  tmpnode = node;
  tmpedge = null;

  d3.select("#nodeDetail").remove();
  d3.select("#edgeDetail").remove();

  //更新类的名字

  var nodeName = node.name;

  // d3.select("#tooltip")
  //   .style("left", mywidth - 350);

  d3.select("#tooltip")
    .append("div")
    .attr("id", "nodeDetail")
    .attr("style", "border: 1px solid #999; border-radius: 5px; padding:10px 0px;");


  d3.select("#nodeDetail")
    .append("p")
    .attr("style", "text-align:center;font-weight:bold")
    .text(nodeName);

  d3.select("#nodeDetail")
    .append("hr")
    .attr("style", "border-top:1px solid #999; margin:10px 0px;");

  // 显示类的属性及相关信息
  d3.select("#nodeDetail")
    .append("p")
    .attr("style", "padding-left:5%")
    .attr("id", "nodeType");
  d3.select("#nodeType")
    .append("span")
    .attr("style", "font-weight:bold")
    .text("Type:     ");
  d3.select("#nodeType")
    .append("span")
    .text(node.type);

  d3.select("#nodeDetail")
    .append("hr")
    .attr("style", "border-top:1px solid #999; margin:10px 0px;");

  var users = node.users.split(" ");
  var refString = "Referenced By " + users.length;
  if(users.length === 0 || users.length === 1)
    refString += " User";
  else
    refString += " Users";

  d3.select("#nodeDetail")
    .append("p")
    .attr("style", "padding-left:5%; font-weight:bold")
    // .text("RefByUsers:     ");
    .text(refString);

  d3.select("#nodeDetail")
    .append("p")
    .attr("style", "padding-left:5%")
    .text(node.users);



  // //显示类的属性
  d3.select("#tooltip").classed("hidden", false);


  //高亮该节点及文本
  // highlightNode(node);


  //高亮与节点相连的线
  highlightNodeEdge(node);
}

/**
 *   鼠标移到某节点上
 *   高亮相关信息
 *   参数：节点node
 */
function mouseoverNode(node){
  //高亮该节点及文本
  // highlightNode(node);


  //高亮与节点相连的线
  highlightNodeEdge(node);
}

/**
 *   鼠标移走
 *   恢复之前点击状态
 *   参数：无
 */
function mouseout(){
  //先将所有节点归为无高亮状态
  noneClickStyle();

  //高亮上一次点击的节点及与其相关信息
  if (tmpnode !== null)
    //更新类的名字
    clickNode(tmpnode);
  else if(tmpedge !== null)
    clickEdge(tmpedge);
  else //如无需高亮的节点，隐藏右侧的详细信息
    d3.select("#tooltip").classed("hidden", true);
}

/**
 *   点击某边，
 *   右侧展示详细信息
 *   并高亮相关信息
 *   参数：被点击的边edge
 */
function clickEdge(edge){

  tmpedge = edge;
  tmpnode = null;

  d3.select("#nodeDetail").remove();
  d3.select("#edgeDetail").remove();

  d3.select("#tooltip")
    .append("div")
    .attr("id", "edgeDetail")
    .attr("style", "border: 1px solid #999; border-radius: 5px; padding:10px 0px;");

  //显示边的名字
  d3.select("#edgeDetail")
    .append("p")
    .attr("style", "text-align:center;font-weight:bold")
    .text(edge.name);

  d3.select("#edgeDetail")
    .append("hr")
    .attr("style", "border-top:1px solid #999; margin:10px 0px;");

  //显示边的source
  d3.select("#edgeDetail")
    .append("p")
    .attr("style", "padding-left:5%")
    .attr("id", "edgeSource");

  d3.select("#edgeSource")
    .append("span")
    .attr("style", "font-weight:bold")
    .text("Source:     ");

  d3.select("#edgeSource")
    .append("span")
    .text(edge.source.name);

  d3.select("#edgeDetail")
    .append("hr")
    .attr("style", "border-top:1px solid #999; margin:10px 0px;");

  //显示边的target
  d3.select("#edgeDetail")
    .append("p")
    .attr("style", "padding-left:5%")
    .attr("id", "edgeTarget");

  d3.select("#edgeTarget")
    .append("span")
    .attr("style", "font-weight:bold")
    .text("Target:     ");

  d3.select("#edgeTarget")
    .append("span")
    .text(edge.target.name);

  d3.select("#edgeDetail")
    .append("hr")
    .attr("style", "border-top:1px solid #999; margin:10px 0px;");

  //显示引用用户

  var users = edge.users.split(" ");
  var refString = "Referenced By " + users.length;
  if(users.length === 0 || users.length === 1)
    refString += " User";
  else
    refString += " Users";

  d3.select("#edgeDetail")
    .append("p")
    .attr("style", "padding-left:5%; font-weight:bold")
    .text(refString);

  d3.select("#edgeDetail")
    .append("p")
    .attr("style", "padding-left:5%")
    .text(edge.users);


  //显示类的属性
  d3.select("#tooltip").classed("hidden", false);
  // d3.select("#tooltip").call(drag);

  //高亮该条边
  highlightEdgeNode(edge);

  //高亮与该边相连的节点
  highlightEdge(edge);
}

function mouseoverEdge(edge){
  //高亮该条边
  highlightEdgeNode(edge);

  //高亮与该边相连的节点
  highlightEdge(edge);
}


svg.on("click", function(d) {
  noneClickStyle();
  d3.select("#tooltip").classed("hidden", true);
  tmpnode = null;
  tmpedge = null;
});


//每个节点都绑定一个圆形显示
var mycircle =
  node.append("circle")
  .attr("r", function(d) { //设置圆点半径
    return radiusover(d);
  })
  // .attr("stroke", function(d, i) {
  //   return colors(i);
  // })
  .attr("stroke", function(d){
    return strokeArray[d.type];
  })
  .attr("stroke-width", 1)
  .attr("fill", function(d, i) {
    // return fillColor;
    return fillArray[d.type];
  })
  .attr("fill-opacity", 0.9)
  .attr("cursor", "pointer");


mycircle.on("click", function(d) {
  d3.event.stopPropagation(); //截断svg的click事件
  clickNode(d);

})
//高亮当前节点及其连线，但仍然显示上一次点击的节点信息
.on("mouseover", function(d) {
  mouseoverNode(d);
})
// 鼠标移走时高亮上一次点击节点及其连线，显示上一次点击的节点信息
.on("mouseout", function(d) {
  mouseout();
});


d3.select("#searchButton")
  .on("click", function(){
    var searchText = $("#searchText").val();
    for(var j = 0; j < dataset.nodes.length; j ++){
      if(dataset.nodes[j].name === searchText){
        clickNode(dataset.nodes[j]);
        break;
      }
    }
  });


//根据relation类型的不同绑定箭头

var myline = link.append("line")
  .attr("class", function(d) {
    return "link " + d.type;
  })
  .attr("marker-end", function(d) {
    return "url(#" + "plain" + ")";
  })
  .attr("stroke", lineColor)
  .attr("stroke-width", lineWidth);

var path = link.append("path")
  .attr("stroke", "#fff")
  .attr("stroke-width", 3)
  .attr("opacity", 0.0)
  .attr("cursor", "pointer");


path.on("click", function(d) {
  d3.event.stopPropagation(); //截断svg的click事件
  clickEdge(d);
})
//高亮当前节点及其连线，但仍然显示上一次点击的节点信息
.on("mouseover", function(d) {
  mouseoverEdge(d);
})
// 鼠标移走时高亮上一次点击节点及其连线，显示上一次点击的节点信息
.on("mouseout", function(d) {
  mouseout();
});



  var classSelectedColor = "green";
  var valueSelectedColor = "red";
  var relationSelectedColor = "yellow";
  var builtInSelectedColor = "purple";
  var edgeSelectedColor = "grey";

  var captionArray = { class: 1, value: 1, relation: 1, builtInClass: 1};

  d3.select("#classLegend")
      .on("click", function(){
        d3.selectAll(".legendOption").classed("hidden", true);
        d3.event.stopPropagation();
        d3.select("#classLegendOption").classed("hidden", false);
        document.getElementById("classColorSelect").value = classSelectedColor;
        document.getElementById("classCaptionSelect").value = classSelectedCaption;

      });

  d3.select("#valueLegend")
      .on("click", function(){
        d3.selectAll(".legendOption").classed("hidden", true);
        d3.event.stopPropagation();
        d3.select("#valueLegendOption").classed("hidden", false);
        document.getElementById("valueColorSelect").value = valueSelectedColor;
        document.getElementById("valueCaptionSelect").value = valueSelectedCaption;

      });

  d3.select("#relationLegend")
      .on("click", function(){
        d3.selectAll(".legendOption").classed("hidden", true);
        d3.event.stopPropagation();
        d3.select("#relationLegendOption").classed("hidden", false);
        document.getElementById("relationColorSelect").value = relationSelectedColor;
        document.getElementById("relationCaptionSelect").value = relationSelectedCaption;

      });

  d3.select("#builtInLegend")
      .on("click", function(){
        d3.selectAll(".legendOption").classed("hidden", true);
        d3.event.stopPropagation();
        d3.select("#builtInLegendOption").classed("hidden", false);
        document.getElementById("builtInColorSelect").value = builtInSelectedColor;
        document.getElementById("builtInCaptionSelect").value = builtInSelectedCaption;

      });

  d3.select("#edgeLegend")
      .on("click", function(){
        d3.selectAll(".legendOption").classed("hidden", true);
        d3.event.stopPropagation();
        d3.select("#edgeLegendOption").classed("hidden", false);
        document.getElementById("edgeColorSelect").value = edgeSelectedColor;

      });

  d3.selectAll(".close")
      .on("click", function(){
        d3.selectAll(".legendOption").classed("hidden", true);
      });

  d3.select("#showLegend")
        .on("click", function(){
          d3.select("#legendFold").style("background-color", "white");
          d3.select("#legendText").attr("fill", "#999");
          d3.select("#legend").classed("hidden", false);
          d3.select("#showLegend").classed("hidden", true);
          d3.select("#hiddenLegend").classed("hidden", false);
        });

    d3.select("#hiddenLegend")
        .on("click", function(){
          d3.select("#legendFold").style("background-color", "#999");
          d3.select("#legendText").attr("fill", "white");
          d3.select("#legend").classed("hidden", true);
          d3.select("#hiddenLegend").classed("hidden", true);
          d3.select("#showLegend").classed("hidden", false);
        });

  d3.select("#classColorSelect")
      .on("change", function(){
        var colorValue = document.getElementById("classColorSelect").value;
        fillArray["class"] = colorFillArray[colorValue];
        strokeArray["class"] = colorStrokeArray[colorValue];
        classSelectedColor = colorValue;
        d3.select("#classLegend")
            .attr("stroke", strokeArray["class"])
            .attr("fill", fillArray["class"]);
        d3.select("#classCircle")
            .attr("stroke", strokeArray["class"])
            .attr("fill", fillArray["class"]);
        mouseout();
      });

  d3.select("#valueColorSelect")
      .on("change", function(){
        var colorValue = document.getElementById("valueColorSelect").value;
        fillArray["value"] = colorFillArray[colorValue];
        strokeArray["value"] = colorStrokeArray[colorValue];
        valueSelectedColor = colorValue;
        d3.select("#valueLegend")
            .attr("stroke", strokeArray["value"])
            .attr("fill", fillArray["value"]);
        d3.select("#valueCircle")
            .attr("stroke", strokeArray["value"])
            .attr("fill", fillArray["value"]);
        mouseout();
      });

  d3.select("#relationColorSelect")
      .on("change", function(){
        var colorValue = document.getElementById("relationColorSelect").value;
        fillArray["relation"] = colorFillArray[colorValue];
        strokeArray["relation"] = colorStrokeArray[colorValue];
        relationSelectedColor = colorValue;
        d3.select("#relationLegend")
            .attr("stroke", strokeArray["relation"])
            .attr("fill", fillArray["relation"]);
        d3.select("#relationCircle")
            .attr("stroke", strokeArray["relation"])
            .attr("fill", fillArray["relation"]);
        mouseout();
      });

  d3.select("#builtInColorSelect")
      .on("change", function(){
        var colorValue = document.getElementById("builtInColorSelect").value;
        fillArray["builtInClass"] = colorFillArray[colorValue];
        strokeArray["builtInClass"] = colorStrokeArray[colorValue];
        builtInSelectedColor = colorValue;
        d3.select("#builtInLegend")
            .attr("stroke", strokeArray["builtInClass"])
            .attr("fill", fillArray["builtInClass"]);
        d3.select("#builtInCircle")
            .attr("stroke", strokeArray["builtInClass"])
            .attr("fill", fillArray["builtInClass"]);
        mouseout();
      });

  d3.select("#edgeColorSelect")
      .on("change", function(){
        var colorValue = document.getElementById("edgeColorSelect").value;
        lineColor = colorFillArray[colorValue];
        edgeSelectedColor = colorValue;
        d3.selectAll(".edgeColortoChange")
            .attr("stroke", lineColor);
        mouseout();
      });

  d3.select("#classCaptionSelect")
      .on("change", function(){
        var captionValue = document.getElementById("classCaptionSelect").value;
        captionArray["class"] = captionValue;
        myname.text(function(d) {
          if(captionArray[d.type] == 1)
            return d.name;
          else
            return "";
        });
        mouseout();
      });

  d3.select("#valueCaptionSelect")
      .on("change", function(){
        var captionValue = document.getElementById("valueCaptionSelect").value;
        captionArray["value"] = captionValue;
        myname.text(function(d) {
          if(captionArray[d.type] == 1)
            return d.name;
          else
            return "";
        });
        mouseout();
      });

  d3.select("#relationCaptionSelect")
      .on("change", function(){
        var captionValue = document.getElementById("relationCaptionSelect").value;
        captionArray["relation"] = captionValue;
        myname.text(function(d) {
          if(captionArray[d.type] == 1)
            return d.name;
          else
            return "";
        });
        mouseout();
      });

  d3.select("#builtInCaptionSelect")
      .on("change", function(){
        var captionValue = document.getElementById("builtInCaptionSelect").value;
        captionArray["builtInClass"] = captionValue;
        myname.text(function(d) {
          if(captionArray[d.type] == 1)
            return d.name;
          else
            return "";
        });
        mouseout();
      });


//Every time the simulation "ticks", this will be called
/**
 *   每一次tick，调用此函数
 */

force.on("tick", function() {

  /**
   *   限制节点的移动范围在该svg大小之内
   */
  dataset.nodes.forEach(function(d, i) {
    var r = radiusover(d);
    d.x = d.x - r < 0 ? r : d.x;
    d.x = d.x + r > width ? width - r : d.x;
    d.y = d.y - r < 0 ? r : d.y;
    d.y = d.y + r * 2 > height ? height - r * 2 : d.y;
  });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  /**
   *   计算两点之间连线的起止位置，以绘出合适的箭头
   */

  link.selectAll("line")
    .attr("x1", function(d) {
      var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
      var r = radiusover(d.source);
      var rx = r * dx / dr;
      return (d.source.x + rx);
    })
    .attr("y1", function(d) {
      var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
      var r = radiusover(d.source);
      var ry = r * dy / dr;
      return (d.source.y + ry);
    })
    .attr("x2", function(d) {
      var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
      var r = radiusover(d.target);
      var rx = r * dx / dr;
      return (d.target.x - rx);
    })
    .attr("y2", function(d) {
      var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
      var r = radiusover(d.target);
      var ry = r * dy / dr;
      return (d.target.y - ry);
    });

  path.attr("d", function(d) {
    return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
  });

});


force.start();
for (var i = 0; i < tickNum; ++i) force.tick();
force.stop();

}




// //Width and height
// var w = 3000;
// var h = 3000;


// var svg = d3.select("body")
//     .append("svg")
//     .attr("width", w)
//     .attr("height", h);

// var force = d3.layout.force()
//          .nodes(dataset.nodes)
//          .links(dataset.edges)
//          .size([w, h])
//          .linkStrength(0.3)
//          .linkDistance([150])
//          .charge([-130])
//          .start();

// var colors = d3.scale.category10();

// var defs = svg.append("defs");

// var genMarker = defs.append("marker")
//                   .attr("id","generalization")
//                   .attr("viewBox", "0 -5 10 10")
//                   .attr("markerWidth",7)
//                   .attr("markerHeight",7)
//                   .attr("refX",10)
//                   .attr("refY",0)
//                   .attr("orient","auto")
//                   .append("svg:path")
//                   .attr("d", "M0,-5L10,0L0,5")
//                   .attr("fill","none")
//                   .attr("stroke","#777")
//                   .attr("stroke-width",1.2);

// var link = svg.selectAll(".link")
//          .data(dataset.edges)
//          //.data(model[1])
//          .enter().append("g")
//          .attr("class", "link");

// function  radiusover (d){
//     return d.ref * 2 + 5;
// }



// link.append("title")
//     .text(function(d) { return d.users; });

// link.append("line")
//     .attr("marker-end", "url(#generalization)")
//     .attr("stroke", "#777")
//     .attr("stroke-width", function(d) {
//         return 1;  // + d.ref / 5;
//     });

// link.append("text")
//     .text(function(d) { return d.name + ' (' + d.ref + ')'; })
//     .attr("stroke", "#ddd")
//     .attr("stroke-width", 1)
//     .attr("font-size", 12)
//     .attr("font-family", 'Helvetica');


// var node = svg.selectAll(".node")
//                  .data(dataset.nodes)
//                  //.data(model[0])
//                  .enter().append("g")
//                  .attr("class", function(d) { return "class " + d.type; })
//                  .call(force.drag);



// node.append("title")
//     .text(function(d) { return d.users; });

// node.append("circle")
//     .attr("r", function(d){
//       return radiusover(d);
//     })
//     .attr("stroke", "#000")
//     .attr("fill", function(d){

//       if(d.name == "R255") {
//         return "yellow";
//       }

//       if(d.type === "class")
//         return "#0066CC";
//       else if(d.type == "builtInClass")
//         return "#33ffff";
//       else if(d.type == "relation")
//         return "#FF0033";
//       else
//         return "#FFFFFF";
//     })
//     .attr('opacity', 0.7);

// // 节点显示名字
// node.append("text")
//     .attr("class", "name")
//     .text(function(d) { return d.name; })
//     .attr("stroke", function(d){
//       if(d.type === "class")
//         return "#333";
//       else if(d.type == "builtInClass")
//         return "#333";
//       else if(d.type == "relation")
//         return "#333";
//       else
//         return "#777";
//     })
//     .attr("stroke-width", 1)
//     .attr("font-size", 12)
//     .attr("font-family", 'Helvetica');

// // 节点显示引用数
// node.append("text")
//     .attr("class", "ref")
//     .text(function(d) { return d.ref; })
//     .attr("stroke", function(d){
//       if(d.type === "class")
//         return "#333";
//       else if(d.type == "builtInClass")
//         return "#333";
//       else if(d.type == "relation")
//         return "#333";
//       else
//         return "#777";
//     })
//     .attr("stroke-width", 1)
//     .attr("font-size", 12)
//     .attr("font-family", 'Helvetica');

// // var drag = force.drag()
// //               .on("dragstart",function(d){
// //                   // d.fixed = true;    //拖拽开始后设定被拖拽对象为固定
// //               });
// // node.on("dblclick",function(d,i){
// //           // d.fixed = false;
// //         });


// /*
// svg.selectAll(".a")
//   .append("circle")
//   .attr("r",function(d){  //设置圆点半径
//         return radiusover (d);
//   })
//   .attr("stroke", "#000")
//   .attr("fill", "none");

// svg.selectAll(".b")
//   .append("rect")
//   .attr("width",function(d){  //设置圆点半径
//         return radiusover (d) * 2;
//   })
//   .attr("height",function(d){  //设置圆点半径
//         return radiusover (d) * 2;
//   })
//   .attr("stroke", "#000")
//   .attr("fill", "none");


// svg.selectAll(".c")
//   .append("ellipse")
//   .attr("rx",function(d){  //设置圆点半径
//         return radiusover (d) + 3;
//   })
//   .attr("ry",function(d){  //设置圆点半径
//         return radiusover (d) - 2;
//   })
//   .attr("stroke", "#000")
//   .attr("fill", "none");
// */


// force.on("tick", function() {

// dataset.nodes.forEach(function (d, i) {
//             var r = radiusover(d);
//             d.x = d.x - r < 0 ? r : d.x;
//             d.x = d.x + r > w ? w - r : d.x;
//             d.y = d.y - r < 0 ? r : d.y;
//             d.y = d.y + r * 2 > h ? h - r * 2 : d.y;
//         });

// link.selectAll("line")
//    .attr("x1", function(d) {
//       var dx = d.target.x - d.source.x,//增量
//           dy = d.target.y - d.source.y,
//           dr = Math.sqrt(dx * dx + dy * dy);
//       var r = radiusover(d.source);
//       var rx = r * dx / dr;
//       return (d.source.x + rx);
//    })
//    .attr("y1", function(d) {
//       var dx = d.target.x - d.source.x,//增量
//           dy = d.target.y - d.source.y,
//           dr = Math.sqrt(dx * dx + dy * dy);
//       var r = radiusover(d.source);
//       var ry = r * dy / dr;
//       return (d.source.y + ry);
//    })
//    .attr("x2", function(d) {
//       var dx = d.target.x - d.source.x,//增量
//           dy = d.target.y - d.source.y,
//           dr = Math.sqrt(dx * dx + dy * dy);
//       var r = radiusover(d.target);
//       var rx = r * dx / dr;
//       return (d.target.x - rx); })
//    .attr("y2", function(d) {
//       var dx = d.target.x - d.source.x,//增量
//           dy = d.target.y - d.source.y,
//           dr = Math.sqrt(dx * dx + dy * dy);
//       var r = radiusover(d.target);
//       var ry = r * dy / dr;
//       return (d.target.y - ry); });

// node.selectAll("circle")
//    .attr("cx", function(d) { return d.x; })
//    .attr("cy", function(d) { return d.y; });
// /*
// node.selectAll("rect")
//    .attr("x", function(d) { return d.x; })
//    .attr("y", function(d) { return d.y; });

// node.selectAll("ellipse")
//    .attr("cx", function(d) { return d.x; })
//    .attr("cy", function(d) { return d.y; });
// */
// node.selectAll("text.name")
//    .attr("x", function(d) { return d.x - 10; })
//    .attr("y", function(d) { return d.y + 5; });

// node.selectAll("text.ref")
//    .attr("x", function(d) { return d.x - 15; })
//    .attr("y", function(d) { return d.y - 8; });

// link.selectAll("text")
//    .attr("x",  function(d) { return (d.source.x + d.target.x)/2; })
//    .attr("y",  function(d) { return (d.source.y + d.target.y)/2; });
// });


// /**
//  * 悬浮窗控制台
//  */

// // 控制台隐藏、显示
// // var boxHead = document.getElementById('settings');
// function collapseBoxBody(event) {
//     var target = event.target || event.srcElement,
//         boxBody = null;
//         // alert(target.id);
//     if (target.parentNode.id === 'settings') {
//         boxBody = this.getElementsByClassName('box-body')[0];
//         if (boxBody.style.display === 'none' || getComputedStyle(boxBody).display === 'none') {
//             boxBody.style.display = 'block';
//         } else {
//             boxBody.style.display = 'none';
//         }
//     } else if (target.parentNode.id === 'legend') {
//         boxBody = this.getElementsByClassName('box-body')[1];
//         if (boxBody.style.display === 'none' || getComputedStyle(boxBody).display === 'none') {
//             boxBody.style.display = 'block';
//         } else {
//             boxBody.style.display = 'none';
//         }
//     }
// }
// if (typeof document.addEventListener !== void 0) {
//     document.addEventListener('click', collapseBoxBody, false);
// } else {
//     document.attechEvent('onclick', collapseBoxBody);
// }

// // 显示隐藏名字
// function toggleNames(event) {
//     var target = event.target || event.srcElement;
//     if (target.id === 'show-name-nodes') {
//         if (target.checked) {
//             node.selectAll('text.name').attr('opacity', 1);
//         } else {
//             node.selectAll('text.name').attr('opacity', 0);
//         }
//     } else if (target.id === 'show-ref-nodes') {
//         if (target.checked) {
//             node.selectAll('text.ref').attr('opacity', 1);
//         } else {
//             node.selectAll('text.ref').attr('opacity', 0);
//         }
//     } else if (target.id === 'show-name-edges') {
//         if (target.checked) {
//             link.selectAll('text').attr('opacity', 1);
//         } else {
//             link.selectAll('text').attr('opacity', 0);
//         }
//     }
// }
// if (typeof document.addEventListener !== void 0) {
//     document.addEventListener('click', toggleNames, false);
// } else {
//     document.attechEvent('onclick', toggleNames);
// }


// // 图例的显示

// var legend = d3.select(".box-legend")
//     .append("svg")
//     .attr("width", 200)
//     .attr("height", 120);

// var cx = 40,
//     x = cx + 35,
//     fontSize = 14,
//     fontWidth = 0.6;

// var classLeg = legend.append('g').attr('type', 'class');
// classLeg.append('circle')
//     .attr("stroke", "#000")
//     .attr("fill","#0066CC")
//     .attr('r', 8)
//     .attr('cx', cx)
//     .attr('cy', 15)
//     .attr('opacity', 0.7);
// classLeg.append('text')
//     .text('class node')
//     .attr("stroke", '#333')
//     .attr("stroke-width", fontWidth)
//     .attr("font-size", fontSize)
//     .attr("font-family", 'Helvetica')
//     .attr('x', x)
//     .attr('y', 20);

// var builtInClassLeg = legend.append('g').attr('type', 'builtInClass');
// builtInClassLeg.append('circle')
//     .attr("stroke", "#000")
//     .attr("fill","#33ffff")
//     .attr('r', 8)
//     .attr('cx', cx)
//     .attr('cy', 45)
//     .attr('opacity', 0.7);
// builtInClassLeg.append('text')
//     .text('built-in class node')
//     .attr("stroke", '#333')
//     .attr("stroke-width", fontWidth)
//     .attr("font-size", fontSize)
//     .attr("font-family", 'Helvetica')
//     .attr('x', x)
//     .attr('y', 50);

// var relationLeg = legend.append('g').attr('type', 'relation');
// relationLeg.append('circle')
//     .attr("stroke", "#000")
//     .attr("fill","#FF0033")
//     .attr('r', 8)
//     .attr('cx', cx)
//     .attr('cy', 75)
//     .attr('opacity', 0.7);
// relationLeg.append('text')
//     .text('relation node')
//     .attr("stroke", '#333')
//     .attr("stroke-width", fontWidth)
//     .attr("font-size", fontSize)
//     .attr("font-family", 'Helvetica')
//     .attr('x', x)
//     .attr('y', 80);

// var valueLeg = legend.append('g').attr('type', 'value');
// valueLeg.append('circle')
//     .attr("stroke", "#000")
//     .attr("fill","#ffffff")
//     .attr('r', 8)
//     .attr('cx', cx)
//     .attr('cy', 105)
//     .attr('opacity', 0.7);
// valueLeg.append('text')
//     .text('value node')
//     .attr("stroke", '#333')
//     .attr("stroke-width", fontWidth)
//     .attr("font-size", fontSize)
//     .attr("font-family", 'Helvetica')
//     .attr('x', x)
//     .attr('y', 110);
