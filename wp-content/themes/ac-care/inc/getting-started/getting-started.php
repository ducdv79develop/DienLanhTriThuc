<?php
//about theme info
add_action( 'admin_menu', 'ac_care_gettingstarted' );
function ac_care_gettingstarted() {    	
	add_theme_page( esc_html__('About Theme', 'ac-care'), esc_html__('About Theme', 'ac-care'), 'edit_theme_options', 'ac_care_guide', 'ac_care_mostrar_guide');   
}

// Add a Custom CSS file to WP Admin Area
function ac_care_admin_theme_style() {
   wp_enqueue_style('custom-admin-style', esc_url(get_template_directory_uri()) . '/inc/getting-started/getting-started.css');
}
add_action('admin_enqueue_scripts', 'ac_care_admin_theme_style');

//guidline for about theme
function ac_care_mostrar_guide() { 
	//custom function about theme customizer
	$return = add_query_arg( array()) ;
	$theme = wp_get_theme( 'ac-care' );

?>

<div class="wrapper-info">
	<div class="col-left">
		<div class="intro">
			<h3><?php esc_html_e( 'Welcome to AC Care WordPress Theme', 'ac-care' ); ?> <span>Version: <?php echo esc_html($theme['Version']);?></span></h3>
		</div>
		<div class="started">
			<hr>
			<div class="free-doc">
				<div class="lz-4">
					<h4><?php esc_html_e( 'Start Customizing', 'ac-care' ); ?></h4>
					<ul>
						<span><?php esc_html_e( 'Go to', 'ac-care' ); ?> <a target="_blank" href="<?php echo esc_url( admin_url('customize.php') ); ?>"><?php esc_html_e( 'Customizer', 'ac-care' ); ?> </a> <?php esc_html_e( 'and start customizing your website', 'ac-care' ); ?></span>
					</ul>
				</div>
				<div class="lz-4">
					<h4><?php esc_html_e( 'Support', 'ac-care' ); ?></h4>
					<ul>
						<span><?php esc_html_e( 'Send your query to our', 'ac-care' ); ?> <a href="<?php echo esc_url( AC_CARE_SUPPORT ); ?>" target="_blank"> <?php esc_html_e( 'Support', 'ac-care' ); ?></a></span>
					</ul>
				</div>
			</div>
			<p><?php esc_html_e( 'AC repair theme is a multipurpose theme designed for appliance repair, air conditioning, window cleaning, plumbing, renovation, carpentry, construction, HVAC services, refrigeration, maintenance, heating & cooling and related websites. This cool theme’s design is also modern and luxurious, elegant and sophisticated as well as retina-ready. The theme is based on bootstrap framework which makes it handy to use. It gives you a lot of customization and personalization options. It is SEO-friendly which will make your website visible soon on the first page of Google results. Also, it is mobile-friendly with a responsive layout that fits perfectly with all devices. The theme is translation-ready and supports RTL layout. You can add shortcodes if you like to improve the functionality of your website. It is also optimized for speed therefore it has faster page load times. It is secure and cleanly coded. With the social media option you can integrate all your social media pages. This interactive theme has a testimonial section given that will let your customers and visitors review and comment on your services.', 'ac-care')?></p>
			<hr>			
			<div class="col-left-inner">
				<h3><?php esc_html_e( 'Get started with Free AC Care Theme', 'ac-care' ); ?></h3>
				<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/customizer-image.png" alt="" />
			</div>
		</div>
	</div>
	<div class="col-right">
		<div class="col-left-area">
			<h3><?php esc_html_e('Premium Theme Information', 'ac-care'); ?></h3>
			<hr>
		</div>
		<div class="centerbold">
			<a href="<?php echo esc_url( AC_CARE_LIVE_DEMO ); ?>" target="_blank"><?php esc_html_e('Live Demo', 'ac-care'); ?></a>
			<a href="<?php echo esc_url( AC_CARE_BUY_NOW ); ?>"><?php esc_html_e('Buy Pro', 'ac-care'); ?></a>
			<a href="<?php echo esc_url( AC_CARE_PRO_DOCS ); ?>" target="_blank"><?php esc_html_e('Pro Documentation', 'ac-care'); ?></a>
			<hr class="secondhr">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/ac-care.jpg" alt="" />
		</div>
		<h3><?php esc_html_e( 'PREMIUM THEME FEATURES', 'ac-care'); ?></h3>
		<div class="lz-6">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/icon01.png" alt="" />
			<h4><?php esc_html_e( 'Banner Slider', 'ac-care'); ?></h4>
		</div>
		<div class="lz-6">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/icon02.png" alt="" />
			<h4><?php esc_html_e( 'Theme Options', 'ac-care'); ?></h4>
		</div>
		<div class="lz-6">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/icon03.png" alt="" />
			<h4><?php esc_html_e( 'Custom Innerpage Banner', 'ac-care'); ?></h4>
		</div>
		<div class="lz-6">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/icon04.png" alt="" />
			<h4><?php esc_html_e( 'Custom Colors and Images', 'ac-care'); ?></h4>
		</div>
		<div class="lz-6">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/icon05.png" alt="" />
			<h4><?php esc_html_e( 'Fully Responsive', 'ac-care'); ?></h4>
		</div>
		<div class="lz-6">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/icon06.png" alt="" />
			<h4><?php esc_html_e( 'Hide/Show Sections', 'ac-care'); ?></h4>
		</div>
		<div class="lz-6">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/icon07.png" alt="" />
			<h4><?php esc_html_e( 'Woocommerce Support', 'ac-care'); ?></h4>
		</div>
		<div class="lz-6">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/icon08.png" alt="" />
			<h4><?php esc_html_e( 'Limit to display number of Posts', 'ac-care'); ?></h4>
		</div>
		<div class="lz-6">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/icon09.png" alt="" />
			<h4><?php esc_html_e( 'Multiple Page Templates', 'ac-care'); ?></h4>
		</div>
		<div class="lz-6">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/icon10.png" alt="" />
			<h4><?php esc_html_e( 'Custom Read More link', 'ac-care'); ?></h4>
		</div>
		<div class="lz-6">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/icon11.png" alt="" />
			<h4><?php esc_html_e( 'Code written with WordPress standard', 'ac-care'); ?></h4>
		</div>
		<div class="lz-6">
			<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getting-started/images/icon12.png" alt="" />
			<h4><?php esc_html_e( '100% Multi language', 'ac-care'); ?></h4>
		</div>
	</div>
</div>
<?php } ?>