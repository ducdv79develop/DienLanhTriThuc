<?php
/**
 * Template Name: Custom Home
 */

get_header(); ?>

<main id="skip-content" role="main">

	<?php do_action( 'ac_care_above_slider' ); ?>

	<?php if( get_theme_mod('ac_care_slider_hide_show') != ''){ ?>
		<section id="slider">
			<div id="carouselExampleIndicators" class="carousel" data-ride="carousel"> 
			    <?php $ac_care_slider_pages = array();
			    for ( $count = 1; $count <= 4; $count++ ) {
			        $mod = intval( get_theme_mod( 'ac_care_slider'. $count ));
			        if ( 'page-none-selected' != $mod ) {
			          $ac_care_slider_pages[] = $mod;
			        }
			    }
		      	if( !empty($ac_care_slider_pages) ) :
			        $args = array(
			          	'post_type' => 'page',
			          	'post__in' => $ac_care_slider_pages,
			          	'orderby' => 'post__in'
			        );
		        	$query = new WP_Query( $args );
		        if ( $query->have_posts() ) :
		          	$i = 1;
		    	?>     
			    <div class="carousel-inner" role="listbox">
			      	<?php  while ( $query->have_posts() ) : $query->the_post(); ?>
			        <div <?php if($i == 1){echo 'class="carousel-item fade-in-image active"';} else{ echo 'class="carousel-item fade-in-image"';}?>>
			        	<div class="slider-img">
            				<img src="<?php esc_url(the_post_thumbnail_url('full')); ?>" alt="<?php the_title_attribute(); ?> "/>
            			</div>
		        		<div class="slider-bg"></div>
		        		<img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/slidebottom.png" class="slider-design" alt="<?php echo esc_html('Slider bottom image', 'ac-care'); ?> "/>
			            <div class="inner-carousel">
			              	<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
							<p><?php $ac_care_excerpt = get_the_excerpt(); echo esc_html( ac_care_string_limit_words( $ac_care_excerpt, esc_attr(get_theme_mod('ac_care_slider_excerpt_length','15') ) )); ?></p>
			              	<a href="<?php the_permalink(); ?>" class="read-btn"><?php esc_html_e('Read More','ac-care'); ?><i class="fas fa-arrow-right"></i><span class="screen-reader-text"><?php esc_html_e('Read More','ac-care'); ?></span></a>
	            		</div>
			        </div>
			      	<?php $i++; endwhile; 
			      	wp_reset_postdata();?>
			    </div>
			    <?php else : ?>
			    <div class="no-postfound"></div>
		      		<?php endif;
			    endif;?>
			    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
			      	<span class="carousel-control-prev-icon" aria-hidden="true"><i class="fas fa-arrow-left"></i></span>
			      	<span class="screen-reader-text"><?php esc_html_e( 'Prev','ac-care' );?></span>
			    </a>
			    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
			      	<span class="carousel-control-next-icon" aria-hidden="true"><i class="fas fa-arrow-right"></i></span>
			      	<span class="screen-reader-text"><?php esc_html_e( 'Next','ac-care' );?></span>
			    </a>
			</div>
		  	<div class="clearfix"></div>
		</section>
	<?php }?>

	<?php do_action('ac_care_below_slider'); ?>

	<?php if( get_theme_mod('ac_care_services_category') != '' || get_theme_mod('ac_care_services_section_title') != ''){ ?>
		<section id="services-section">
			<div class="container">
				<div class="services-head text-md-right text-center">
					<?php if(get_theme_mod('ac_care_services_section_title')) {?>
						<h3><?php echo esc_html(get_theme_mod('ac_care_services_section_title')); ?></h3>
					<?php }?>
				</div>
	            <div class="row">
		      		<?php $ac_care_catData1 =  get_theme_mod('ac_care_services_category');
	  				if($ac_care_catData1){ 
						$args = array(
							'post_type' => 'post',
							'category_name' => esc_html($ac_care_catData1 ,'ac-care'),
				          'posts_per_page' => get_theme_mod('ac_care_service_number', 3)
				        );
				        $i=1;
				        $page_query = new WP_Query( $args);?>
		        		<?php while( $page_query->have_posts() ) : $page_query->the_post(); ?>	
		          			<div class="col-lg-4 col-md-4">
		          				<div class="services-box">
	          						<?php the_post_thumbnail(); ?>
			      					<div class="service-content">
					            		<h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
					            		<p><?php $ac_care_excerpt = get_the_excerpt(); echo esc_html( ac_care_string_limit_words( $ac_care_excerpt,15 ) ); ?></p>
					            		<a href="<?php the_permalink(); ?>" class="seemore-btn"><?php esc_html_e('Read More','ac-care'); ?><i class="fas fa-caret-right"></i><span class="screen-reader-text"><?php esc_html_e('Read More','ac-care'); ?></span></a>
					            	</div>
		          				</div>
						    </div>
		          		<?php $i++; endwhile; 
		          		wp_reset_postdata();
		      		}?>
	      		</div>
				<div class="clearfix"></div>
			</div>
		</section>
	<?php }?>

	<?php do_action('ac_care_below_service_section'); ?>

	<div class="container">
	  	<?php while ( have_posts() ) : the_post(); ?>
	  		<div class="lz-content">
	        	<?php the_content(); ?>
	        </div>
	    <?php endwhile; // end of the loop. ?>
	</div>
</main>

<?php get_footer(); ?>