<?php
/**
 * AC Care: Customizer
 *
 * @subpackage AC Care
 * @since 1.0
 */

use WPTRT\Customize\Section\AC_Care_Button;

add_action( 'customize_register', function( $manager ) {

	$manager->register_section_type( AC_Care_Button::class );

	$manager->add_section(
		new AC_Care_Button( $manager, 'ac_care_pro', [
			'title'      => __( 'AC Care Pro', 'ac-care' ),
			'priority'    => 0,
			'button_text' => __( 'Go Pro', 'ac-care' ),
			'button_url'  => esc_url( 'https://www.luzuk.com/product/ac-repair-wordpress-theme/', 'ac-care')
		] )
	);

} );

// Load the JS and CSS.
add_action( 'customize_controls_enqueue_scripts', function() {

	$version = wp_get_theme()->get( 'Version' );

	wp_enqueue_script(
		'ac-care-customize-section-button',
		get_theme_file_uri( 'vendor/wptrt/customize-section-button/public/js/customize-controls.js' ),
		[ 'customize-controls' ],
		$version,
		true
	);

	wp_enqueue_style(
		'ac-care-customize-section-button',
		get_theme_file_uri( 'vendor/wptrt/customize-section-button/public/css/customize-controls.css' ),
		[ 'customize-controls' ],
 		$version
	);

} );

function ac_care_customize_register( $wp_customize ) {

	$wp_customize->add_setting('ac_care_title_tagline_color', array(
		'default' => '#fff',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_title_tagline_color', array(
		'label' => __('Title Tagline Color', 'ac-care'),
		'section' => 'title_tagline',
	)));

	$wp_customize->add_setting('ac_care_logo_margin',array(
      'sanitize_callback'	=> 'esc_html'
   ));
   $wp_customize->add_control('ac_care_logo_margin',array(
      'label' => __('Logo Margin','ac-care'),
      'section' => 'title_tagline'
   ));

	$wp_customize->add_setting('ac_care_logo_top_margin',array(
      'default' => '',
      'sanitize_callback'	=> 'ac_care_sanitize_float'
   ));
   $wp_customize->add_control('ac_care_logo_top_margin',array(
      'type' => 'number',
      'description' => __('Top','ac-care'),
      'section' => 'title_tagline',
   ));

	$wp_customize->add_setting('ac_care_logo_bottom_margin',array(
      'default' => '',
      'sanitize_callback'	=> 'ac_care_sanitize_float'
   ));
   $wp_customize->add_control('ac_care_logo_bottom_margin',array(
      'type' => 'number',
      'description' => __('Bottom','ac-care'),
      'section' => 'title_tagline',
   ));

	$wp_customize->add_setting('ac_care_logo_left_margin',array(
      'default' => '',
      'sanitize_callback'	=> 'ac_care_sanitize_float'
   ));
   $wp_customize->add_control('ac_care_logo_left_margin',array(
      'type' => 'number',
      'description' => __('Left','ac-care'),
      'section' => 'title_tagline',
   ));

	$wp_customize->add_setting('ac_care_logo_right_margin',array(
      'default' => '',
      'sanitize_callback'	=> 'ac_care_sanitize_float'
   ));
   $wp_customize->add_control('ac_care_logo_right_margin',array(
      'type' => 'number',
      'description' => __('Right','ac-care'),
      'section' => 'title_tagline',
   ));

	$wp_customize->add_setting('ac_care_show_site_title',array(
      'default' => true,
      'sanitize_callback'	=> 'ac_care_sanitize_checkbox'
   ));
   $wp_customize->add_control('ac_care_show_site_title',array(
      'type' => 'checkbox',
      'label' => __('Show / Hide Site Title','ac-care'),
      'section' => 'title_tagline'
   ));

	$wp_customize->add_setting('ac_care_site_title_font_size',array(
		'default' => '',
		'sanitize_callback'	=> 'ac_care_sanitize_float'
	));
	$wp_customize->add_control('ac_care_site_title_font_size',array(
		'type' => 'number',
		'label' => __('Site Title Font Size','ac-care'),
		'section' => 'title_tagline',
	));

   $wp_customize->add_setting('ac_care_show_tagline',array(
      'default' => true,
      'sanitize_callback'	=> 'ac_care_sanitize_checkbox'
   ));
   $wp_customize->add_control('ac_care_show_tagline',array(
      'type' => 'checkbox',
      'label' => __('Show / Hide Site Tagline','ac-care'),
      'section' => 'title_tagline'
   ));

	$wp_customize->add_setting('ac_care_site_tagline_font_size',array(
		'default' => '',
		'sanitize_callback'	=> 'ac_care_sanitize_float'
	));
	$wp_customize->add_control('ac_care_site_tagline_font_size',array(
		'type' => 'number',
		'label' => __('Site Tagline Font Size','ac-care'),
		'section' => 'title_tagline',
	));

	$wp_customize->add_panel( 'ac_care_panel_id', array(
	   'priority' => 10,
	   'capability' => 'edit_theme_options',
	   'theme_supports' => '',
	   'title' => __( 'Theme Settings', 'ac-care' ),
	   'description' => __( 'Description of what this panel does.', 'ac-care' ),
	) );

	$wp_customize->add_section( 'ac_care_theme_options_section', array(
    	'title'      => __( 'General Settings', 'ac-care' ),
		'priority'   => 30,
		'panel' => 'ac_care_panel_id'
	) );

	$wp_customize->add_setting('ac_care_theme_color1', array(
		'default' => '#57e5d1',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_theme_color1', array(
		'label' => __('Theme Primary Color', 'ac-care'),
		'section' => 'ac_care_theme_options_section',
	)));

	$wp_customize->add_setting('ac_care_theme_color2', array(
		'default' => '#2ebfd1',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_theme_color2', array(
		'label' => __('Theme Secondary Color', 'ac-care'),
		'section' => 'ac_care_theme_options_section',
	)));

	$wp_customize->add_setting('ac_care_theme_options',array(
		'default' => 'Right Sidebar',
		'sanitize_callback' => 'ac_care_sanitize_choices'
	));
	$wp_customize->add_control('ac_care_theme_options',array(
		'type' => 'select',
		'label' => __('Blog Page Sidebar Layout','ac-care'),
		'section' => 'ac_care_theme_options_section',
		'choices' => array(
		   'Left Sidebar' => __('Left Sidebar','ac-care'),
		   'Right Sidebar' => __('Right Sidebar','ac-care'),
		   'One Column' => __('One Column','ac-care'),
		   'Grid Layout' => __('Grid Layout','ac-care')
		),
	));

	$wp_customize->add_setting('ac_care_single_post_sidebar',array(
		'default' => 'Right Sidebar',
		'sanitize_callback' => 'ac_care_sanitize_choices'
	));
	$wp_customize->add_control('ac_care_single_post_sidebar',array(
		'type' => 'select',
		'label' => __('Single Post Sidebar Layout','ac-care'),
		'section' => 'ac_care_theme_options_section',
		'choices' => array(
		   'Left Sidebar' => __('Left Sidebar','ac-care'),
		   'Right Sidebar' => __('Right Sidebar','ac-care'),
		   'One Column' => __('One Column','ac-care')
		),
	));

	$wp_customize->add_setting('ac_care_page_sidebar',array(
		'default' => 'One Column',
		'sanitize_callback' => 'ac_care_sanitize_choices'
	));
	$wp_customize->add_control('ac_care_page_sidebar',array(
		'type' => 'select',
		'label' => __('Page Sidebar Layout','ac-care'),
		'section' => 'ac_care_theme_options_section',
		'choices' => array(
		   'Left Sidebar' => __('Left Sidebar','ac-care'),
		   'Right Sidebar' => __('Right Sidebar','ac-care'),
		   'One Column' => __('One Column','ac-care')
		),
	));

	$wp_customize->add_setting('ac_care_archive_page_sidebar',array(
      'default' => 'Right Sidebar',
      'sanitize_callback' => 'ac_care_sanitize_choices'
	));
	$wp_customize->add_control('ac_care_archive_page_sidebar',array(
      'type' => 'select',
      'label' => __('Archive & Search Page Sidebar Layout','ac-care'),
      'section' => 'ac_care_theme_options_section',
      'choices' => array(
         'Left Sidebar' => __('Left Sidebar','ac-care'),
         'Right Sidebar' => __('Right Sidebar','ac-care'),
         'One Column' => __('One Column','ac-care'),
         'Grid Layout' => __('Grid Layout','ac-care')
      ),
	));

	//Bottom Header
	$wp_customize->add_section( 'ac_care_header_section' , array(
    	'title'    => __( 'Header', 'ac-care' ),
		'priority' => null,
		'panel' => 'ac_care_panel_id'
	) );

	$wp_customize->add_setting('ac_care_topheader_phone_text',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('ac_care_topheader_phone_text',array(
		'type' => 'text',
		'label' => __('Add Phone Text','ac-care'),
		'section' => 'ac_care_header_section',
	));

	$wp_customize->add_setting('ac_care_topheader_phone_no',array(
    	'default' => '',
    	'sanitize_callback'	=> 'ac_care_sanitize_phone_number'
	));
	$wp_customize->add_control('ac_care_topheader_phone_no',array(
		'type' => 'text',
		'label' => __('Add Phone Number','ac-care'),
		'section' => 'ac_care_header_section',
	));

	$wp_customize->add_setting('ac_care_topheader_phonetext_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_topheader_phonetext_color', array(
		'label' => __('Call Text Color', 'ac-care'),
		'section' => 'ac_care_header_section',
	)));

	$wp_customize->add_setting('ac_care_topheader_phonenbr_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_topheader_phonenbr_color', array(
		'label' => __('Call No. Color', 'ac-care'),
		'section' => 'ac_care_header_section',
	)));

	$wp_customize->add_setting('ac_care_topheader_menu_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_topheader_menu_color', array(
		'label' => __('Menu Color', 'ac-care'),
		'section' => 'ac_care_header_section',
	)));

	//home page slider
	$wp_customize->add_section( 'ac_care_slider_section' , array(
    	'title'    => __( 'Slider Settings', 'ac-care' ),
		'priority' => null,
		'panel' => 'ac_care_panel_id'
	) );

	$wp_customize->add_setting('ac_care_slider_hide_show',array(
    	'default' => false,
    	'sanitize_callback'	=> 'ac_care_sanitize_checkbox'
	));
	$wp_customize->add_control('ac_care_slider_hide_show',array(
   	'type' => 'checkbox',
   	'label' => __('Show / Hide Slider','ac-care'),
   	'section' => 'ac_care_slider_section',
	));

	for ( $count = 1; $count <= 4; $count++ ) {
		$wp_customize->add_setting( 'ac_care_slider' . $count, array(
			'default'           => '',
			'sanitize_callback' => 'ac_care_sanitize_dropdown_pages'
		));
		$wp_customize->add_control( 'ac_care_slider' . $count, array(
			'label' => __('Select Slider Image Page', 'ac-care' ),
			'description' => __('Image Size (1600px x 600px)', 'ac-care' ),
			'section' => 'ac_care_slider_section',
			'type' => 'dropdown-pages'
		));
	}

	$wp_customize->add_setting('ac_care_slider_excerpt_length',array(
		'default' => '15',
		'sanitize_callback'	=> 'ac_care_sanitize_float'
	));
	$wp_customize->add_control('ac_care_slider_excerpt_length',array(
		'type' => 'number',
		'label' => __('Slider Excerpt Length','ac-care'),
		'section' => 'ac_care_slider_section',
	));

	$wp_customize->add_setting('ac_care_slider_text_color', array(
		'default' => '#fff',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_slider_text_color', array(
		'label' => __('Text Color', 'ac-care'),
		'section' => 'ac_care_slider_section',
	)));

	$wp_customize->add_setting('ac_care_slider_btn_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_slider_btn_color', array(
		'label' => __('Button Text Color', 'ac-care'),
		'section' => 'ac_care_slider_section',
	)));

	$wp_customize->add_setting('ac_care_slider_btnbg_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_slider_btnbg_color', array(
		'label' => __('Button Bg Color', 'ac-care'),
		'section' => 'ac_care_slider_section',
	)));

	$wp_customize->add_setting('ac_care_slider_np_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_slider_np_color', array(
		'label' => __('Next/Pre Arrow Color', 'ac-care'),
		'section' => 'ac_care_slider_section',
	)));

	$wp_customize->add_setting('ac_care_slider_npbg_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_slider_npbg_color', array(
		'label' => __('Next/Pre Arrow Bg Color', 'ac-care'),
		'section' => 'ac_care_slider_section',
	)));

	//Services Section
	$wp_customize->add_section('ac_care_services_section',array(
		'title'	=> __('Services Section','ac-care'),
		'description'=> __('<b>Note</b> : This section will appear below the slider.','ac-care'),
		'panel' => 'ac_care_panel_id',
	));

	$wp_customize->add_setting('ac_care_services_section_title',array(
    	'default' => '',
    	'sanitize_callback' => 'sanitize_text_field'
	));
	$wp_customize->add_control('ac_care_services_section_title',array(
   	'type' => 'text',
   	'label' => __('Add Section Title','ac-care'),
   	'section' => 'ac_care_services_section',
	));

	$categories = get_categories();
	$cats = array();
	$i = 0;
	$cat_pst[]= 'select';
	foreach($categories as $category){
		if($i==0){
			$default = $category->slug;
			$i++;
		}
		$cat_pst[$category->slug] = $category->name;
	}

	$wp_customize->add_setting('ac_care_services_category',array(
		'default' => 'select',
		'sanitize_callback' => 'ac_care_sanitize_choices',
	));
	$wp_customize->add_control('ac_care_services_category',array(
		'type' => 'select',
		'choices' => $cat_pst,
		'label' => __('Select Category To Display Post','ac-care'),
		'section' => 'ac_care_services_section',
	));

	$wp_customize->add_setting('ac_care_service_number',array(
		'default'	=> '3',
		'sanitize_callback'	=> 'sanitize_text_field',
	));
	$wp_customize->add_control('ac_care_service_number',array(
		'label'	=> __('Number Of Posts To Show In A Category','ac-care'),
		'section' => 'ac_care_services_section',
		'type'	  => 'number'
	));

	$wp_customize->add_setting('ac_care_service_section_padding',array(
      'default' => '',
      'sanitize_callback' => 'ac_care_sanitize_float'
    ));
    $wp_customize->add_control('ac_care_service_section_padding',array(
      'type' => 'number',
      'label' => __('Section Top Bottom Padding','ac-care'),
      'section' => 'ac_care_services_section',
    ));

	$wp_customize->add_setting('ac_care_services_text_color', array(
		'default' => '#000',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_services_text_color', array(
		'label' => __('Text Color', 'ac-care'),
		'section' => 'ac_care_services_section',
	)));

	//Footer
   $wp_customize->add_section( 'ac_care_footer', array(
    	'title'  => __( 'Footer Setting', 'ac-care' ),
		'priority' => null,
		'panel' => 'ac_care_panel_id'
	) );

	$wp_customize->add_setting('ac_care_show_back_totop',array(
      'default' => true,
      'sanitize_callback'	=> 'ac_care_sanitize_checkbox'
   ));
   $wp_customize->add_control('ac_care_show_back_totop',array(
      'type' => 'checkbox',
      'label' => __('Show / Hide Back to Top','ac-care'),
      'section' => 'ac_care_footer'
   ));

   $wp_customize->add_setting('ac_care_footer_copy',array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_text_field'
	));	
	$wp_customize->add_control('ac_care_footer_copy',array(
		'label'	=> __('Copyright Text','ac-care'),
		'section' => 'ac_care_footer',
		'setting' => 'ac_care_footer_copy',
		'type' => 'text'
	));

	$wp_customize->add_setting('ac_care_copyright_padding',array(
		'default' => '',
		'sanitize_callback'	=> 'ac_care_sanitize_float'
 	));
 	$wp_customize->add_control('ac_care_copyright_padding',array(
		'type' => 'number',
		'label' => __('Copyright Top Bottom Padding','ac-care'),
		'section' => 'ac_care_footer',
	));

	$wp_customize->register_section_type( AC_Care_Button::class );

	$wp_customize->add_section(
		new AC_Care_Button( $wp_customize, 'ac_care_pro_link', [
			'title'      => __( 'AC Care Pro', 'ac-care' ),
			'priority'    => 0,
			'button_text' => __( 'Go Pro', 'ac-care' ),
			'button_url'  => esc_url( 'https://www.luzuk.com/product/ac-repair-wordpress-theme/', 'ac-care'),
			'panel' => 'ac_care_panel_id'
		] )
	);

	$wp_customize->add_setting('ac_care_topbtm_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_topbtm_color', array(
		'label' => __('Top To Bottom Arrow Text Color', 'ac-care'),
		'section' => 'ac_care_footer',
	)));

	$wp_customize->add_setting('ac_care_topbtmbg_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_topbtmbg_color', array(
		'label' => __('Top To Bottom Arrow Bg Color', 'ac-care'),
		'section' => 'ac_care_footer',
	)));

	$wp_customize->add_setting('ac_care_topbtmbghvr_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'ac_care_topbtmbghvr_color', array(
		'label' => __('Top To Bottom Arrow Bg Hover Color', 'ac-care'),
		'section' => 'ac_care_footer',
	)));

	$wp_customize->get_setting( 'blogname' )->transport          = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport   = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport  = 'postMessage';

	$wp_customize->selective_refresh->add_partial( 'blogname', array(
		'selector' => '.site-title a',
		'render_callback' => 'ac_care_customize_partial_blogname',
	) );
	$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
		'selector' => '.site-description',
		'render_callback' => 'ac_care_customize_partial_blogdescription',
	) );
}
add_action( 'customize_register', 'ac_care_customize_register' );

function ac_care_customize_partial_blogname() {
	bloginfo( 'name' );
}

function ac_care_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

function ac_care_is_static_front_page() {
	return ( is_front_page() && ! is_home() );
}

function ac_care_is_view_with_layout_option() {
	// This option is available on all pages. It's also available on archives when there isn't a sidebar.
	return ( is_page() || ( is_archive() && ! is_active_sidebar( 'sidebar-1' ) ) );
}