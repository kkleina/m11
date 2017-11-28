function Card(id, name, col_id) {
  var self = this;

  this.id = id;
  this.name = name || 'No name';
  this.bootcamp_kanban_column_id = col_id;
  this.$element = createCard();

  function createCard() {
    var $card = $('<li>').addClass('card');
    var $cardDescription = $('<p>').addClass('card-description').text(self.name);
    var $cardDelete = $('<button>').addClass('btn-delete').html('<i class="fa fa-times" aria-hidden="true"></i>');

    $cardDelete.click(function() {
      self.removeCard();
    });

  /*  $card.mouseleave(function() {
      self.moveCard();
    });*/

    initSortable();

    $card.append($cardDelete)
          .append($cardDescription);
    return $card;
  }
}

Card.prototype = {
  removeCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'DELETE',
      success: function(){
        self.$element.remove();
      }
    });
  }/*,

  moveCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'PUT',
      data: {
        name: self.name,
        bootcamp_kanban_column_id: self.bootcamp_kanban_column_id
      },
      success: function(){
        console.log(self.bootcamp_kanban_column_id);
      }
    });
  }*/
};

function initSortable() {
  $('.column-card-list').sortable({
    connectWith: '.column-card-list',
    placeholder: 'card-placeholder',
    cursor: 'move'
  }).disableSelection();
}
