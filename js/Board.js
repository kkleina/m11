var board = {
  name: 'Kanban board',
  addColumn: function(column) {
    this.$element.append(column.$element);

  },
  $element: $('#board .column-container')
};

$('.create-column').click(function() {
  var columnName = prompt('Enter a column name');
  $.ajax({
    url: baseUrl + '/column',
    method: 'POST',
    data: {
      name: columnName
    },
    success: function(response){
      var column = new Column(response.id, columnName);
      board.addColumn(column);
    }
  });
});
