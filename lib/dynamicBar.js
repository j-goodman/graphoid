var DynamicBar = function (data) {
  var i; var j; var k;

  this.canvas = document.getElementById('dynamic-bar');
  this.slider = document.getElementById('z-slider');
  this.knob = document.getElementById('z-slider-knob');

  this.slider.onmousemove = function (event) {
    var percent;
    var position;
    this.knob.style.width = Math.floor(event.screenX - this.slider.getBoundingClientRect().left) + 'px';
    percent = (event.screenX - this.slider.getBoundingClientRect().left) / (this.slider.getBoundingClientRect().right - this.slider.getBoundingClientRect().left) * 100;
    percent = percent > 0 ? percent : 0;
    position = Math.floor(percent / 100 * this.graph.zValues.length);
    this.graph.currentZ = position < this.graph.zValues.length ? this.graph.zValues[position] : this.graph.zValues[this.graph.zValues.length-1];
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
      if (data[i][0]) {
        this.graph.zValues.push(data[i][0]);
      }
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
  var colors;
  var ctx;
  var i;

  colors = ['rgb(100, 255, 120)', 'rgb(255, 80, 255)', 'rgb(255, 80, 120)', 'rgb(255, 255, 80)', 'rgb(120, 120, 255)', 'rgb(120, 255, 120)', 'rgb(255, 120, 120)'];

  ctx = this.canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 500);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ddd';
  ctx.font = '24px sans-serif';
  ctx.fillText(
    this.graph.labels.z.toUpperCase() + ': ' + this.graph.currentZ,
    300,
    48
  );

  for (i=0 ; i<this.graph.labels.x.length ; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect(
      600 / (this.graph.size.x + 1) * (i + 1) - 24 / 2,
      500 - (parseInt(this.dataObj[this.graph.currentZ][this.graph.labels.x[i]]) / (this.yMax + this.yMax / 16)) * 500,
      24,
      (parseInt(this.dataObj[this.graph.currentZ][this.graph.labels.x[i]]) / (this.yMax + this.yMax / 16)) * 500
    );
    ctx.fillStyle = '#000';
    ctx.fillText(
      this.graph.labels.x[i],
      600 / (this.graph.size.x + 1) * (i + 1) + 2,
      488
    );
    ctx.fillStyle = '#fff';
    ctx.fillText(this.graph.labels.x[i],
      600 / (this.graph.size.x + 1) * (i + 1),
      486
    );
  }
};
