$(document).ready(function() {
	var modalOpen;

	function closeModal() {
		if (modalOpen) {
			$(modalOpen).hide();
			$('.container').removeClass('dialog_open');
		}

		modalOpen = null;
	}

	function openModal(modalId) {
		closeModal();
		modalOpen = modalId;
    	$(modalId).show();;
    	$('.container').addClass('dialog_open');

		$(modalId + ' .close').click(function() {
			closeModal();
		});
	}

	function showPhotoModal(photoId) {
		console.log(photoId);
		var template = $('#photoModalTemplate').html();
		var rendered = Mustache.render(template, {
			photo: photoId,
			showNext: photoId != 'weekend48',
			showPrev: photoId != 'weekend01'
		});
		$('#photoModal').html(rendered);

		$('a.nextImage').click(function() {
			showNextImage(photoId);
		});

		$('a.previousImage').click(function() {
			showPrevImage(photoId);
		});

		openModal('#photoModal');
	}

	$('a.photo').click(function() {
		var id = $(this).data('photo');
		showPhotoModal(id);
	});

	function showNextImage(photoId) {
		var singleResult = /weekend0([0-9])/g.exec(photoId);
		if (singleResult) {
			if (singleResult[1] == '9') {
				showPhotoModal('weekend10');
			} else {
				showPhotoModal('weekend0' + (parseInt(singleResult[1]) + 1));
			}
		} else {
			var doubleResult = /weekend([0-9][0-9])/g.exec(photoId);
			if (doubleResult) {
				showPhotoModal('weekend' + (parseInt(doubleResult[1]) + 1));
			}
		}
	}

	function showPrevImage(photoId) {
		var singleResult = /weekend0([0-9])/g.exec(photoId);
		if (singleResult) {
			showPhotoModal('weekend0' + (parseInt(singleResult[1]) - 1));

		} else {
			var doubleResult = /weekend([0-9][0-9])/g.exec(photoId);
			if (doubleResult) {
				if (doubleResult[1] == '10') {
					showPhotoModal('weekend09');
				} else {
					showPhotoModal('weekend' + (parseInt(doubleResult[1]) - 1));
				}
			}
		}
	}
});
