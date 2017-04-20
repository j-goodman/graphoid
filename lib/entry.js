onload = function () {
  var data;
  var dataInput;
  data = '';
  dataInput = document.getElementById('dynamic-bar-file-input');
  dataInput.onchange = uploadCSV.bind(createDynamicBar);
};

var createDynamicBar = function (data) {
  new DynamicBar (data);
};
