var uploadCSV = function (event) {
  var csv;
  var data;
  var file;
  var i;
  var reader;
  file = event.target.files[0];
  reader = new FileReader ();
  reader.onload = function () {
    csv = this.reader.result;
    data = csv.split('\n');
    for (i=0 ; i<data.length ; i++) {
      data[i] = data[i].split(',');
    }
    this.funct(data);
  }.bind({reader: reader, funct: this});
  reader.readAsBinaryString(file);
};
