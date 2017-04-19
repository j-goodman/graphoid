onload = function () {
  var data;
  var dataInput;
  data = '';
  dataInput = document.getElementById('dynamic-bar-file-input');
  dataInput.onchange = uploadCSV.bind(createDynamicBar);
};

var DynamicBar = function (data) {
  var dataObj;
  var graph;
  var i;
  var j;
  var zMin;
  var zMax;
  var yMin;
  var yMax;

  this.canvas = document.getElementById('dynamic-bar');
  this.slider = document.getElementById('z-slider');
  this.knob = document.getElementById('z-slider-knob');
  this.slider.onmousemove = function (event) {
    var percent;
    this.knob.style.width = Math.floor(event.screenX - this.slider.getBoundingClientRect().left) + 'px';
    percent = Math.floor((event.screenX - this.slider.getBoundingClientRect().left) / (this.slider.getBoundingClientRect().right - this.slider.getBoundingClientRect().left) * 100);
  }.bind(this);

  graph = {};

  graph.labels = {};
  graph.size = {};

  graph.labels.z = data[0][0];
  graph.labels.x = data[0].slice(1,data[0].length);

  graph.size.x = data[0].length - 1;

  graph.currentZ = data[1][0];

  dataObj = {};
  for (i=1 ; i<data.length ; i++) {
    dataObj[data[i][0]] = {};
    for (j=0 ; j<graph.size.x ; j++) {
      dataObj[data[i][0]][graph.labels.x[j]] = parseInt(data[i][j+1]);
    }
  }

  console.log(dataObj);
};

DynamicBar.prototype.drawSlide = function (z) {
  var ctx;
  ctx = this.canvas.getContext('2d');
};

var createDynamicBar = function (data) {
  new DynamicBar (data);
};
