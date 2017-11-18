$(function() {

  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  function Board(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createBoard();

    function createBoard() {
      var $board = $('<div>').addClass('board');
      var $boardTitle = $('<h1>').addClass('board-title').text(self.name);
      var $boardColumnList = $('<div>').addClass('column-container');
      var $boardDelete = $('<button>').addClass('btn-delete').html('<i class="fa fa-times" aria-hidden="true"></i>');
      var $boardAddColumn = $('<button>').addClass('create-column').text('Add a column');

      $boardDelete.click(function() {
        self.removeBoard();
      });

      $boardAddColumn.click(function() {
        var name = prompt('Enter a column name');
        if (name == '') {
          name = 'No name';
        };
        self.addColumn(new Column(name));
      });

      $board.append($boardTitle)
            .append($boardDelete)
            .append($boardAddColumn)
            .append($boardColumnList);

      return $board;
    }
  }

  Board.prototype = {
    addColumn: function(column) {
      this.$element.children('div').append(column.$element);
      initSortable();
      moveColumn();
    },
    removeBoard: function() {
      this.$element.remove();
    }
  };

  $('.create-board').click(function() {
    var name = prompt('Enter a board name');
    if (name == '') {
      name = 'No name';
    };
    var board = new Board(name);
    main.addBoard(board);
  });

  function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').html('<i class="fa fa-times" aria-hidden="true"></i>');
      var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

      $columnDelete.click(function() {
        self.removeColumn();
      });

      $columnAddCard.click(function() {
        self.addCard(new Card(prompt("Enter the name of the card")));
      });

      $column.append($columnTitle)
              .append($columnDelete)
              .append($columnAddCard)
              .append($columnCardList);

      return $column;
    }
  }

  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };

  function Card(description) {
    var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
      var $card = $('<li>').addClass('card');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('btn-delete').html('<i class="fa fa-times" aria-hidden="true"></i>');

      $cardDelete.click(function() {
        self.removeCard();
      });

      $card.append($cardDelete)
            .append($cardDescription);
      return $card;
    }
  }

  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  };

  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

  function moveColumn() {
    $('.column-container').sortable({
      connectWith: '.column-container',
      placeholder: 'column-placeholder'
    }).disableSelection();
  }

  var main = {
    name: 'Container',
    addBoard: function(board) {
      this.$element.append(board.$element);
    },
    $element: $('main.container')
  };

// CREATING BOARD
  var board = new Board('Kanban board');
  main.addBoard(board);

// CREATING COLUMNS
  var todoColumn = new Column('To do');
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');

// ADDING COLUMNS TO THE BOARD
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

// CREATING CARDS
  var card1 = new Card('New task');
  var card2 = new Card('Create kanban boards');

// ADDING CARDS TO COLUMNS
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);

});
