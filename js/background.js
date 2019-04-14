// jQuery.noConflict();
$(document).ready(function () {
	var sidebarLoaded = false; // Avoid sidebar to be watched twice

	// Hide main content while loading
	$('.content-wrapper > *').not('.navbar').css('opacity', '0');

	$('#app').watch({properties:'prop_innerHTML', watchChildren: true, callback: function (data, i) {
        chrome.storage.sync.get('hideDifficulty', function(response) {
            if(response.hideDifficulty) {
                var info = $($('#question-title').next().children()[0]);
                if (info) {
                    info.css('opacity', '0');
                }

                if ($('div[class^=success]').length == 1) {
                    // Show stats of the current problem
                    info.css('opacity', '1');
                    // Hide next challenges difficulty
                    $("a[class^=next-challenge]").each(function () {
                        $(this).css({"opacity": 1, "background-color": "#fff", "color": "#000", "border-color": "#000"})
                    })
                }
            }})
    }});
	// Watch main content
	$('.content-wrapper').watch({
		properties: 'prop_innerHTML',
		watchChildren: true,
		callback: function (data, i) {
			// Hide acceptance
            chrome.storage.sync.get('hideAccepted', function(response) {
                if (response.hideAccepted) {
                    $('tbody.reactable-data td:nth-child(5)').each((index, obj) => {
                        $(obj).css('opacity', '0');
                });
                }
            });



			// Hide difficulty
            chrome.storage.sync.get('hideDifficulty', function(response) {
            	if(response.hideDifficulty){
                $('tbody.reactable-data td:nth-child(6)').each((index, obj) => {
                    $(obj).css('opacity', '0');
            });}
            });
			// Hide locked
			chrome.storage.sync.get('hideLocked', function(response) {
				if (response.hideLocked) {
					$('tr i.fa.fa-lock').closest('tr').css('display', 'none')
				}
			});

			// Hide question stats while on the problem's page
			var info = $('.side-bar');
			if(info) {
				info.css('opacity', '0');
				sidebarLoaded = true;
			}
			// Show content while loaded
			$('.content-wrapper > *').not('.navbar').css('opacity', '1');

			// After succesful submission
			$('.action').watch({
				properties: 'prop_innerHTML',
	  		watchChildren: true,
	  		callback: function (data, i) {
	  			var count = $('#result-state.text-success').length; // If the solution has been accepted
	    		if (count == 1) {
						// Show stats of the current problem
						info.css('opacity', '1');
						// Hide next challenges difficulty
						$('.next-challenge-list a').css('background-color', '#000');
	    		}
	  		}
			});
		}
	});
});
