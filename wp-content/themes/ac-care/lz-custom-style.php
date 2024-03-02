<?php 

	$ac_care_custom_style = '';

	// Global color
	$ac_care_theme_color1 = get_theme_mod('ac_care_theme_color1','#57e5d1');

	if( $ac_care_theme_color1 != ''){

		$ac_care_custom_style .=' .nav-menu ul ul a, .woocommerce span.onsale, .woocommerce #respond input#submit, .woocommerce a.button, .woocommerce button.button, .woocommerce input.button,.woocommerce #respond input#submit.alt, .woocommerce a.button.alt, .woocommerce button.button.alt, .woocommerce input.button.alt, nav.woocommerce-MyAccount-navigation ul li, #sidebar button.search-submit, button.search-submit {';
			$ac_care_custom_style .=' background-color: '.esc_attr($ac_care_theme_color1).';';
		$ac_care_custom_style .=' }';

		$ac_care_custom_style .=' a, a:hover, a:active, .nav-menu ul li a:hover, .single-post-tags, .article_content h3, a.showcoupon, .woocommerce-message::before, #sidebar h2.widget-title {';
			$ac_care_custom_style .=' color: '.esc_attr($ac_care_theme_color1).';';
		$ac_care_custom_style .=' }';

		$ac_care_custom_style .=' .nav-menu ul ul, #services-section .services-box:hover img, .woocommerce .products li:hover {';
			$ac_care_custom_style .=' border-color: '.esc_attr($ac_care_theme_color1).';';
		$ac_care_custom_style .=' }';

		$ac_care_custom_style .=' .woocommerce-message {';
			$ac_care_custom_style .=' border-top-color: '.esc_attr($ac_care_theme_color1).';';
		$ac_care_custom_style .=' }';

		$ac_care_custom_style .=' @media screen and (max-width:1000px) {
			.sidenav {';
			$ac_care_custom_style .=' background-color: '.esc_attr($ac_care_theme_color1).';';
		$ac_care_custom_style .=' } }';
	}

	$ac_care_theme_color2 = get_theme_mod('ac_care_theme_color2', '#2ebfd1');

	if( $ac_care_theme_color2 != ''){

		$ac_care_custom_style .=' button, input[type="button"], input[type="submit"], #slider .carousel-control-prev-icon i:hover, #slider .carousel-control-next-icon i:hover, .comment-body .comment-reply-link {';
			$ac_care_custom_style .=' background-color: '.esc_attr($ac_care_theme_color2).';';
		$ac_care_custom_style .=' }';

		$ac_care_custom_style .=' .single-post-tags a {';
			$ac_care_custom_style .=' color: '.esc_attr($ac_care_theme_color2).';';
		$ac_care_custom_style .=' }';

		$ac_care_custom_style .=' #header, #slider .carousel-control-prev-icon i:hover, #slider .carousel-control-next-icon i:hover, #sidebar h2.widget-title:after {';
			$ac_care_custom_style .=' border-color: '.esc_attr($ac_care_theme_color2).';';
		$ac_care_custom_style .=' }';

		$ac_care_custom_style .=' @media screen and (max-width:1000px) {
			.toggle-menu i {';
			$ac_care_custom_style .=' background-color: '.esc_attr($ac_care_theme_color1).';';
		$ac_care_custom_style .=' } }';
	}

	// linear gradient color
	if( $ac_care_theme_color1 != '' || $ac_care_theme_color2 != ''){
		$ac_care_custom_style .=' #header .left-content, .metabox, .article_content .read-btn a, #colophon, #slider .slider-bg, #slider a.read-btn i {';
			$ac_care_custom_style .=' background: linear-gradient(45deg, '.esc_attr($ac_care_theme_color1).', '.esc_attr($ac_care_theme_color2).' 80%) no-repeat;';
		$ac_care_custom_style .=' }';
	}

	// Logo Size
	$ac_care_logo_top_margin = get_theme_mod('ac_care_logo_top_margin');
	$ac_care_logo_bottom_margin = get_theme_mod('ac_care_logo_bottom_margin');
	$ac_care_logo_left_margin = get_theme_mod('ac_care_logo_left_margin');
	$ac_care_logo_right_margin = get_theme_mod('ac_care_logo_right_margin');

	if( $ac_care_logo_top_margin != '' || $ac_care_logo_bottom_margin != '' || $ac_care_logo_left_margin != '' || $ac_care_logo_right_margin != ''){
		$ac_care_custom_style .=' .inner-logo {';
			$ac_care_custom_style .=' margin-top: '.esc_attr($ac_care_logo_top_margin).'px; margin-bottom: '.esc_attr($ac_care_logo_bottom_margin).'px; margin-left: '.esc_attr($ac_care_logo_left_margin).'px; margin-right: '.esc_attr($ac_care_logo_right_margin).'px;';
		$ac_care_custom_style .=' }';
	}

	//top header color
	$ac_care_topheader_phonetext_color = get_theme_mod('ac_care_topheader_phonetext_color','#fff');
	if( $ac_care_topheader_phonetext_color != ''){
		$ac_care_custom_style .=' .call p.calltext {';
			$ac_care_custom_style .=' color: '.esc_attr($ac_care_topheader_phonetext_color).';';
		$ac_care_custom_style .=' }';
	}

	$ac_care_topheader_phonenbr_color = get_theme_mod('ac_care_topheader_phonenbr_color','#fff');
	if( $ac_care_topheader_phonenbr_color != ''){
		$ac_care_custom_style .=' .call p {';
			$ac_care_custom_style .=' color: '.esc_attr($ac_care_topheader_phonenbr_color).';';
		$ac_care_custom_style .=' }';
	}

	$ac_care_topheader_menu_color = get_theme_mod('ac_care_topheader_menu_color','#fff');
	if( $ac_care_topheader_menu_color != ''){
		$ac_care_custom_style .=' .nav-menu ul li a {';
			$ac_care_custom_style .=' color: '.esc_attr($ac_care_topheader_menu_color).';';
		$ac_care_custom_style .=' }';
	}

	// Slider section color
	$ac_care_slider_text_color = get_theme_mod('ac_care_slider_text_color','#fff');
	if( $ac_care_slider_text_color != ''){

		$ac_care_custom_style .=' #slider h2 a,#slider p {';
			$ac_care_custom_style .=' color: '.esc_attr($ac_care_slider_text_color).';';
		$ac_care_custom_style .=' }';
	}

	$ac_care_slider_btn_color = get_theme_mod('ac_care_slider_btn_color');
	$ac_care_slider_btnbg_color = get_theme_mod('ac_care_slider_btnbg_color');
	if( $ac_care_slider_btn_color != ''){
		$ac_care_custom_style .=' #slider a.read-btn {';
			$ac_care_custom_style .=' color: '.esc_attr($ac_care_slider_btn_color).' !important; background-color: '.esc_attr($ac_care_slider_btnbg_color).' !important;';
		$ac_care_custom_style .=' }';
	}

	$ac_care_slider_np_color = get_theme_mod('ac_care_slider_np_color');
	$ac_care_slider_npbg_color = get_theme_mod('ac_care_slider_npbg_color');
	if( $ac_care_slider_np_color != ''){
		$ac_care_custom_style .=' #slider .carousel-control-prev-icon i, #slider .carousel-control-next-icon i {';
			$ac_care_custom_style .=' color: '.esc_attr($ac_care_slider_np_color).'; background-color: '.esc_attr($ac_care_slider_npbg_color).';';
		$ac_care_custom_style .=' }';
	}

	// service section padding
	$ac_care_service_section_padding = get_theme_mod('ac_care_service_section_padding');

	if( $ac_care_service_section_padding != ''){
		$ac_care_custom_style .=' #services-section {';
			$ac_care_custom_style .=' padding-top: '.esc_attr($ac_care_service_section_padding).'px; padding-bottom: '.esc_attr($ac_care_service_section_padding).'px;';
		$ac_care_custom_style .=' }';
	}

	$ac_care_services_text_color = get_theme_mod('ac_care_services_text_color','#000');
	if( $ac_care_services_text_color != ''){

		$ac_care_custom_style .=' #services-section h3,#services-section .services-box h4 a,#services-section .services-box p {';
			$ac_care_custom_style .=' color: '.esc_attr($ac_care_services_text_color).';';
		$ac_care_custom_style .=' }';
	}

	// Site Title color
	$ac_care_title_tagline_color = get_theme_mod('ac_care_title_tagline_color','#fff');
	if( $ac_care_title_tagline_color != ''){
		$ac_care_custom_style .=' p.site-title a,p.site-description {';
			$ac_care_custom_style .=' color: '.esc_attr($ac_care_title_tagline_color).';';
		$ac_care_custom_style .=' }';
	}
	


	// Site Title Font Size
	$ac_care_site_title_font_size = get_theme_mod('ac_care_site_title_font_size');
	if( $ac_care_site_title_font_size != ''){
		$ac_care_custom_style .=' .logo h1.site-title, .logo p.site-title {';
			$ac_care_custom_style .=' font-size: '.esc_attr($ac_care_site_title_font_size).'px;';
		$ac_care_custom_style .=' }';
	}

	// Site Title Font Size
	$ac_care_site_tagline_font_size = get_theme_mod('ac_care_site_tagline_font_size');
	if( $ac_care_site_tagline_font_size != ''){
		$ac_care_custom_style .=' .logo p.site-description {';
			$ac_care_custom_style .=' font-size: '.esc_attr($ac_care_site_tagline_font_size).'px;';
		$ac_care_custom_style .=' }';
	}

	// Copyright padding
	$ac_care_copyright_padding = get_theme_mod('ac_care_copyright_padding');

	if( $ac_care_copyright_padding != ''){
		$ac_care_custom_style .=' .site-info {';
			$ac_care_custom_style .=' padding-top: '.esc_attr($ac_care_copyright_padding).'px; padding-bottom: '.esc_attr($ac_care_copyright_padding).'px;';
		$ac_care_custom_style .=' }';
	}

	$ac_care_topbtm_color = get_theme_mod('ac_care_topbtm_color');
	if( $ac_care_topbtm_color != ''){
		$ac_care_custom_style .=' .back-to-top-text {';
			$ac_care_custom_style .=' color: '.esc_attr($ac_care_topbtm_color).';';
		$ac_care_custom_style .=' }';
	}

	$ac_care_topbtmbg_color = get_theme_mod('ac_care_topbtmbg_color');
	if( $ac_care_topbtmbg_color != ''){
		$ac_care_custom_style .=' .back-to-top:after {';
			$ac_care_custom_style .=' background: '.esc_attr($ac_care_topbtmbg_color).';';
		$ac_care_custom_style .=' }';
	}

	$ac_care_topbtmbghvr_color = get_theme_mod('ac_care_topbtmbghvr_color');
	if( $ac_care_topbtmbghvr_color != ''){
		$ac_care_custom_style .=' .back-to-top:hover::after{';
			$ac_care_custom_style .=' background-color: '.esc_attr($ac_care_topbtmbghvr_color).'; !important';
		$ac_care_custom_style .=' }';
	}

	// Header Image
	$header_image_url = ac_care_banner_image( $image_url = '' );
	if( $header_image_url != ''){
		$ac_care_custom_style .=' #inner-pages-header {';
			$ac_care_custom_style .=' background-image: url('. esc_url( $header_image_url ).'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;';
		$ac_care_custom_style .=' }';
		$ac_care_custom_style .=' .header-overlay {';
			$ac_care_custom_style .=' position: absolute; 	width: 100%; height: 100%; 	top: 0; left: 0; background: #000; opacity: 0.3;';
		$ac_care_custom_style .=' }';
	} else {
		$ac_care_custom_style .=' #inner-pages-header {';
			$ac_care_custom_style .=' background:linear-gradient(0deg,#ccc,#0a0607 80%) no-repeat; ';
		$ac_care_custom_style .=' }';
	}

	$ac_care_slider_hide_show = get_theme_mod('ac_care_slider_hide_show',false);
	if( $ac_care_slider_hide_show == true){
		$ac_care_custom_style .=' .page-template-custom-home-page #inner-pages-header {';
			$ac_care_custom_style .=' display:none;';
		$ac_care_custom_style .=' }';
	}