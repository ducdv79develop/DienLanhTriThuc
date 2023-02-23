
( function() {
	// Wait until the customizer has finished loading.
	wp.customize.bind( 'ready', function() {
		// Hide the "respect_user_color_preference" setting if the background-color is dark.
		if ( 127 > dientubkGetHexLum( wp.customize( 'background_color' ).get() ) ) {
			wp.customize.control( 'respect_user_color_preference' ).deactivate();
			wp.customize.control( 'respect_user_color_preference_notice' ).deactivate();
		}

		// Handle changes to the background-color.
		wp.customize( 'background_color', function( setting ) {
			setting.bind( function( value ) {
				if ( 127 > dientubkGetHexLum( value ) ) {
					wp.customize.control( 'respect_user_color_preference' ).deactivate();
					wp.customize.control( 'respect_user_color_preference_notice' ).activate();
				} else {
					wp.customize.control( 'respect_user_color_preference' ).activate();
					wp.customize.control( 'respect_user_color_preference_notice' ).deactivate();
				}
			} );
		} );
	} );
}() );
$(document).ready(function() {
	$('.subscribe-form').submit(function(){
		var _this = $(this);
		var data = {
			name : $(this).find('input[name="subscribe-name"]').val().trim(),
			email : $(this).find('input[name="subscribe-email"]').val().trim(),
			mobile : $(this).find('input[name="subscribe-mobile"]').val().trim(),
			content : $(this).find('textarea[name="subscribe-content"]').val().trim()
		}

		var error = [];
		if(data.name == ''){
			error.push('Bạn chưa điền họ tên');
		}
		if(data.email == ''){
			error.push('Bạn chưa điền email');
		}
		if(data.mobile == ''){
			error.push('Bạn chưa điền số điện thoại');
		}
		if(data.content == ''){
			error.push('Bạn chưa điền nội dung cần tư vấn');
		}

		if(error.length){
			// console.log(error);
			$('#alert-modal .modal-body').html(error.join('<br />'));
			$('#alert-modal').modal();
			return false;
		}
		$.ajax({
			url: "/index/subscribe",
			method: "POST",
			data: data,
			success : function(data){
				$('#alert-modal .modal-body').html('Cám ơn bạn đã gửi yêu cầu');
				$('#subscribe-modal').modal('hide');
				$('#alert-modal').modal();
				_this.trigger("reset");
			},
			error : function(){

			}
		});
	})
});
