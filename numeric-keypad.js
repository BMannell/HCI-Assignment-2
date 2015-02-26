<script>
	$(function(){
		// Code for Keypad Button Password Entry
		$('.number-button').click(function () {
			var insertText = $('#keypad-input').val() + $(this).attr('value');
			$('#keypad-input').val(insertText);
		});

		$('.clear-button').click(function () {
			//used to be variable assignment here that went in val() below
			$('#keypad-input').val('');
		});

		$('.del-button').click(function () {
			//used to be variable assignment here that went in val() below
			var str = $('#keypad-input').val();
			str = str.substring(0,str.length-1);
			$('#keypad-input').val(str);
		});


		$('.ok-button').click(function () {
			//call affirmative action

		});
	});
</script>