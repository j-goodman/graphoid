onload = function () {
  var data;
  var dataInput;
  data = '';
  dataInput = document.getElementById('dynamic-bar-file-input');
  dataInput.onchange = uploadCSV;
};

var createDynamicBar = function (data) {
  console.log(data);
};

var uploadCSV = function (event) {
  var csv;
  var data;
  var file;
  var reader;
  file = event.target.files[0];
  reader = new FileReader ();
  console.log(file);
  reader.onload = function () {
    csv = this.result;
    data = csv.split('\n');
    createDynamicBar(data);
  };
  reader.readAsBinaryString(file);
};
