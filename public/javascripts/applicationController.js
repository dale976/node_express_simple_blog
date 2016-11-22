'use strict';

// DOM READY
$(document).ready(function() {
    // Add user button click
    $('#btnAddEntry').on('click', addBlogEntry);

    // Delete user link click
    $('#btnRemoveEntry').on('click', removeBlogEntry);
});

function addBlogEntry(event) {
    event.preventDefault();

    var errCount = 0,
        blogPost;

    // Basic form validation
    if (($('#blogEntryForm textarea').val() === '') || ($('#blogEntryForm #authorInput').val() === '') || ($('#blogEntryForm #titleInput').val() === '')) {
        errCount++;
    }

    // If no errors with form entry then proceed with creating DB entry
    if (errCount === 0) {

        // Get the form data submitted by the user
        blogPost = {
            'title': $('#blogEntryForm input#titleInput').val(),
            'body': $('#blogEntryForm textarea#blogText').val(),
            'author': $('#blogEntryForm #authorInput').val(),
        };

        // submit form data
        $.ajax({
            type: 'POST',
            data: blogPost,
            url: '/addpost',
            dataType: 'JSON'
        }).done(function(response) {
            if (response.msg === '') {

                // Reload the page upon successful blog entry
                window.location = window.location.pathname;

            } else {

                //  Display screen error if post failed
                alert('Error : ', response.msg);
                return false;
            }
        });

    }
}

function removeBlogEntry(event){
		event.preventDefault();

		var id = $('#postID input#hiddenID').val();

		// Request to delete the item
		$.ajax({
			type: 'DELETE',
			url: '/removepost/' + id

		}).done(function(response){

				if (response.msg === '') {

					// nav to home page
					window.location.href = "/";

				} else {

					alert('Error : ', response.msg);
					return false;
				}

		});
}