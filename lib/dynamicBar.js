onload = function () {
  var data;
  var dataInput;
  data = '';
  dataInput = document.getElementById('dynamic-bar-file-input');
  dataInput.onchange = uploadCSV.bind(createDynamicBar);
};

var DynamicBar = function (data) {
  var i; var j; var k;

  this.canvas = document.getElementById('dynamic-bar');
  this.slider = document.getElementById('z-slider');
  this.knob = document.getElementById('z-slider-knob');
  this.slider.onmousemove = function (event) {
    var percent;
    this.knob.style.width = Math.floor(event.screenX - this.slider.getBoundingClientRect().left) + 'px';
    percent = (event.screenX - this.slider.getBoundingClientRect().left) / (this.slider.getBoundingClientRect().right - this.slider.getBoundingClientRect().left) * 100;
    percent = percent > 0 ? percent : 0;
    this.graph.currentZ = this.graph.zValues[Math.floor(percent / 100 * this.graph.zValues.length)];
    this.drawSlide();
  }.bind(this);

  this.graph = {};

  this.graph.labels = {};
  this.graph.size = {};

  this.graph.labels.z = data[0][0];
  this.graph.labels.x = data[0].slice(1,data[0].length);

  this.graph.size.x = data[0].length - 1;

  this.graph.currentZ = data[1][0];

  this.graph.zValues = [];

  this.yMin = Infinity;
  this.yMax = 0;

  this.dataObj = {};
  for (i=1 ; i<data.length ; i++) {
    this.dataObj[data[i][0]] = {};
    for (j=0 ; j<this.graph.size.x ; j++) {
      this.graph.zValues.push(data[i][0]);
      this.dataObj[data[i][0]][this.graph.labels.x[j]] = parseInt(data[i][j+1]);
      for (k=0 ; k<data[i].length - 1 ; k++) {
        if (parseInt(data[i].slice(1,data[i].length)[k]) < this.yMin) {
          this.yMin = parseInt(data[i].slice(1,data[i].length)[k]);
        }
        if (parseInt(data[i].slice(1,data[i].length)[k]) > this.yMax) {
          this.yMax = parseInt(data[i].slice(1,data[i].length)[k]);
        }
      }
    }
  }
};

DynamicBar.prototype.drawSlide = function (z) {
  var ctx;
  var i;
  ctx = this.canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 500);
  for (i=0 ; i<this.graph.labels.x[i].length ; i++) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(600 / (this.graph.size.x + 1) * (i + 1) - 36 / 2, 500 - (parseInt(this.dataObj[this.graph.currentZ][this.graph.labels.x[i]]) / (this.yMax + this.yMax / 16)) * 500, 36, (parseInt(this.dataObj[this.graph.currentZ][this.graph.labels.x[i]]) / (this.yMax + this.yMax / 16)) * 500);
  }
};

var createDynamicBar = function (data) {
  new DynamicBar (data);
};
