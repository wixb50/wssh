var term,
    client;

var terminalContainer = document.getElementById('term');

function openTerminal(options) {
  client = new WSSHClient();
  term = new Terminal(options.cols - 1, options.rows, function(key) {
      client.send(key);
  });
  term.open(terminalContainer, true);
  term.on('resize', function(size){
      var cols = size.cols,
          rows = size.rows;
      var width = (cols * term.charMeasure.width + 20 /*room for scrollbar*/).toString() + 'px';
      var height = (rows * term.charMeasure.height).toString() + 'px';

      terminalContainer.style.width = width;
      terminalContainer.style.height = height;
      client.resize(cols, rows);
  });
  term.write('Connecting...');
  client.connect($.extend(options, {
      onError: function(error) {
          term.write('Error: ' + error + '\r\n');
      },
      onConnect: function() {
          // Erase our connecting message
          term.write('\r');
          term.resize(options.cols, options.rows)
      },
      onClose: function() {
          term.write('Connection Reset By Peer');
      },
      onData: function(data) {
          term.write(data);
      }
  }));
}

$(document).ready(function() {
  $('#ssh').hide();
  $('#private_key_authentication', '#connect').hide();

  $('input:radio[value=private_key]', '#connect').click(
      function() {
          $('#password_authentication').hide();
          $('#private_key_authentication').show();
      }
  );

  $('input:radio[value=password]', '#connect').click(
      function() {
          $('#password_authentication').show();
          $('#private_key_authentication').hide();
      }
  );

  $('#connect').submit(function(ev) {
      ev.preventDefault();

      function validate(fields) {
          var success = true;
          fields.forEach(function(field) {
              if (!field.val()) {
                  field.closest('.control-group')
                      .addClass('error');
                  success = false;
              }
          });
          return success;
      }

      // Clear errors
      $('.error').removeClass('error');

      var username = $('input:text#username');
      var hostname = $('input:text#hostname');
      var portnumber = $('input:text#portnumber');
      var command = $('input:text#command');
      var cols = parseInt($('input:text#terminal_cols').val());
      var rows = parseInt($('input:text#terminal_rows').val());

      var authentication = $(
          'input[name=authentication_method]:checked',
          '#connect').val();
      var options = {
          username: username.val(),
          hostname: hostname.val(),
          command: command.val(),
          cols: isNaN(cols) ? 80 : cols,
          rows: isNaN(rows) ? 24 : rows,
          authentication_method: authentication
      };

      var port = parseInt(portnumber.val())
      if (port > 0 && port < 65535) {
          $.extend(options, {port: port});
      } else {
          $.extend(options, {port: 22});
      }

      if (authentication == 'password') {
          var password = $('input:password#password');
          if (!validate([username, hostname, password]))
              return false;
          $.extend(options, {password: password.val()});
      } else if (authentication == 'private_key') {
          var private_key = $('textarea#private_key');
          if (!validate([username, hostname, private_key]))
              return false;
          $.extend(options, {private_key: private_key.val()});
          var key_passphrase = $('input:password#key_passphrase');
          if (key_passphrase.val()) {
              $.extend(options,
                  {key_passphrase: key_passphrase.val()});
          }
      }

      $('#connect').hide();
      $('#ssh').show();
      openTerminal(options);
  });
});
