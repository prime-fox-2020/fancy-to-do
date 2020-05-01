(function($) {
	$.fn.simpleAlert = function(options) {
		if (typeof options === 'undefined') options = {};

		var defaultOptions = {
			title: 'Alert',
			id: '',
			message: '',
	        btnLabel: 'OK'
	    }
	    options = $.extend(defaultOptions, options);

	    this.each(function() {
	    	var $this = $(this);
	    	var html;

	    	$this.addClass('simple-dialog active');

	    	html = '<div class="simple-dialog-content">';
	    	html += '<div class="simple-dialog-header"><h3 class="title">'+options.title+'</h3><a class="simple-dialog-close" data-action="close"></a></div>';
	    	html += '<div class="simple-dialog-body"><p class="message">'+options.message+'</p></div>';
	    	html += '<div class="simple-dialog-footer"><a class="simple-dialog-button" data-action="close">'+options.btnLabel+'</a></div>';
	    	html += '</div>';

	    	$this.html(html);

	    	$(document).on('click', 'a[data-action="close"]', function(e) {
				e.preventDefault();
				$(this).parents('.simple-dialog').removeClass('active');
			});
	    });

	    return this;
	};

	$.fn.simpleConfirm = function(options) {
		if (typeof options === 'undefined') options = {};

        var defaultOptions = {
	        title: 'Confirm',
	        message: '',
	        acceptBtnLabel: 'Yes',
	        cancelBtnLabel: 'Cancel',
	        success: function() {},
	        cancel: function() {}
	    }
	    options = $.extend(defaultOptions, options);

	    this.each(function() {
	    	var $this = $(this);
	    	var html;

	    	$this.addClass('simple-dialog active');

	    	html = '<div class="simple-dialog-content">';
	    	html += '<div class="simple-dialog-header"><h3 class="title">'+options.title+'</h3></div>';
	    	html += '<div class="simple-dialog-body"><p class="message"> Do You Want to Delete '+options.message+' ?</p></div>';
	    	html += '<div class="simple-dialog-footer clearfix"><a class="simple-dialog-button accept" data-action="close">'+options.acceptBtnLabel+'</a><a class="simple-dialog-button cancel" data-action="close">'+options.cancelBtnLabel+'</a></div>';
	    	html += '</div>';

	    	$this.html(html);

	    	$(document).on('click', 'a[data-action="close"]', function(e) {
				e.preventDefault();
				var answer = {};
				answer.id=options.message
				$(this).parents('.simple-dialog').removeClass('active');
				if($(this).hasClass('accept')) {
					console.log(answer)
					options.success(answer);
				}
				if($(this).hasClass('cancel')) {
					options.cancel();
				}
			});
	    });

	    return this;
	};

	$.fn.simplePrompt = function(options) {
		if (typeof options === 'undefined') options = {};
		console.log(options)

        var defaultOptions = {
			id: '',
			username: options.username,
			title: '',
			description:'',
			status:'',
			due_date:'',
	        acceptBtnLabel: 'Accept',
	        cancelBtnLabel: 'Cancel',
	        success: function(result) {},
	        cancel: function(result) {}
	    }
	    options = $.extend(defaultOptions, options);

	    this.each(function() {
	    	var $this = $(this);
	    	var html;

	    	$this.addClass('simple-dialog active');

	    	html = '<div class="simple-dialog-content">';
			html += '<div class="simple-dialog-header"> <h3 class="Prompt-id">'+ options.id +'</h3></div>';
			html += `<div class="simple-dialog-body"><p class="Prompt-title"> Username = ${options.username} </p><p class="answer0"><input value = ${options.username} class = "username" type="text" /></p></div>`;
			html += '<div class="simple-dialog-body"><p class="Prompt-title">'+ `Title = ` + options.title+'</p><p class="answer1"><input class = "title" type="text" /></p></div>';
			html += '<div class="simple-dialog-body"><p class="Prompt-desc">' + `Desc = `+options.description+'</p><p class="answer2"><input class = "description" type="text" /></p></div>';
			html += '<div class="simple-dialog-body"><p class="Prompt-status">'+ `Status = `+options.status+'</p><p class="answer"3><input class = "status" type="text" /></p></div>';
			html += '<div class="simple-dialog-body"><p class="Prompt-due_date">'+ `Due Date = `+options.due_date+'</p><p class="answer4"><input class = "due_date" type="text" /></p></div>';
	    	html += '<div class="simple-dialog-footer clearfix"><a class="simple-dialog-button accept" data-action="close">'+options.acceptBtnLabel+'</a><a class = "simple-dialog-button cancel" data-action="close">'+options.cancelBtnLabel+'</a></div>';
	    	html += '</div>';

	    	$this.html(html);

	    	$(document).on('click', 'a[data-action="close"]', function(e) {
				e.preventDefault();
				var title = $('.title').val();
				var username = $('.username').val();
			
				var description = $('.description').val();
				var status = $('.status').val();
				var due_date = $('.due_date').val();

				var answer = {}
				answer.id = options.id
				answer.username = username
				answer.title = title
				answer.description = description
				answer.status = status
				answer.due_date = due_date


				$(this).parents('.simple-dialog').removeClass('active');
				if($(this).hasClass('accept')) {
					options.success(answer);
				}
				if($(this).hasClass('cancel')) {
					options.cancel(result);
				}
			});
	    });

	    return this;
	};
})(jQuery);