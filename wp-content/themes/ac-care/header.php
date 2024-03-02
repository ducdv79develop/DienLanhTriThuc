<?php
/**
 * The header for our theme
 *
 * @subpackage AC Care
 * @since 1.0
 * @version 0.1
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php if ( function_exists( 'wp_body_open' ) ) {
    wp_body_open();
} else {
    do_action( 'wp_body_open' );
}?>

<a class="screen-reader-text skip-link" href="#skip-content"><?php esc_html_e( 'Skip to content', 'ac-care' ); ?></a>

<div id="header">
	<div class="row">
		<div class="col-12 left-content m-0 p-0">
            <div class="container">
                <a href="<?php echo home_url("/"); ?>" title="Điện Lạnh Trí Thức">
                    <img class="logo" alt="Điện Lạnh Trí Thức"
                         src="<?php echo THEME_URL . '/assets/images/logo.png'?>" style="max-width: 450px;">
                </a>
            </div>
		</div>
		<div class="col-12 col-lg-offset-1">
            <div class="container">
			    <div class="menu-section py-3">
				<div class="toggle-menu responsive-menu">
					<?php if(has_nav_menu('primary')){ ?>
		            	<button onclick="ac_care_open()" role="tab" class="mobile-menu"><i class="fas fa-bars"></i><span class="screen-reader-text"><?php esc_html_e('Open Menu','ac-care'); ?></span></button>
		            <?php }?>
		        </div>
				<div id="sidelong-menu" class="nav sidenav">
	                <nav id="primary-site-navigation" class="nav-menu" role="navigation" aria-label="<?php esc_attr_e( 'Top Menu', 'ac-care' ); ?>">
	                  	<?php if(has_nav_menu('primary')){
		                    wp_nav_menu( array(
								'theme_location' => 'primary',
								'container_class' => 'main-menu-navigation clearfix' ,
								'menu_class' => 'clearfix',
								'items_wrap' => '<ul id="%1$s" class="%2$s mobile_nav">%3$s</ul>',
								'fallback_cb' => 'wp_page_menu',
		                    ) );
	                  	} ?>
	                  	<a href="javascript:void(0)" class="closebtn responsive-menu" onclick="ac_care_close()"><i class="fas fa-times"></i><span class="screen-reader-text"><?php esc_html_e('Close Menu','ac-care'); ?></span></a>
	                </nav>
	            </div>
			</div>
            </div>
		</div>
	</div>
</div>

<?php if(is_singular()) {?>
	<div id="inner-pages-header">
		<div class="header-overlay"></div>
	    <div class="header-content">
		    <div class="container text-center">
		      	<h1><?php single_post_title(); ?></h1>
		      	<div class="theme-breadcrumb mt-3">
					<?php ac_care_breadcrumb();?>
				</div>
		    </div>
		</div>
	</div>
<?php } ?>