<?php
/**
 * Template Name: Trang Chủ
 */

get_header();
?>

    <div id="main-body" class="clearfix">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <?php echo do_shortcode('[metaslider id="89"]'); ?>
                </div>
            </div>
            <div class="divider_line4"></div>
            <div class="services">
                <div class="row">
                    <?php
                    $argsArticel = [
                        'post_type' => 'post',
                        'posts_per_page' => 6,
                        'meta_query' => array(
                            array(
                                'key' => 'post_recommend',
                                'value' => array( 1 ),
                                'compare' => '='
                            )
                        ),
                    ];
                    $articleQuery = new WP_Query($argsArticel);
                    $first_post = true;
                    ?>
                    <?php if ($articleQuery->have_posts()) : ?>
                        <?php while ($articleQuery->have_posts()) : $articleQuery->the_post(); ?>
                            <div class="col-md-4 col-sm-6 col-xs-12">
                                <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" rel="bookmark">
                                    <?php
                                    if(has_post_thumbnail()) {
                                        $post_thumbnail_attr = array(
                                            'alt'   =>  get_the_title(),
                                            'class'   =>  'loading',
                                        );
                                        the_post_thumbnail('blog-thumb',$post_thumbnail_attr );
                                    } else {
                                        echo '<img class="loading" src="'.THEME_URL.'/assets/images/no-thumb.png" alt="'.get_the_title().'">';
                                    }
                                    ?>
                                </a>
                                <h2>
                                    <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
                                <p>
                                    <?php
                                    $content = apply_filters('the_content', get_the_content());
                                    $content = str_replace(']]>', ']]&gt;', $content);
                                    echo wp_trim_words( $content, 50 ,'...' );
                                    ?>
                                </p>
                            </div>

                        <?php endwhile; ?>
                    <?php endif; ?>
                </div>
            </div>
            <div class="divider_line4"></div>
            <div class="row">
                <div class="col-md-8">
                    <?php
                        /* Start the Loop */
                        while ( have_posts() ) :
                            the_post();
                            the_content();

                        endwhile;
		            ?>
                </div>
                <div class="col-md-4">
                    <div class="widget_bulletin classic">
                        <h3 class="widget-title"><span>TIN TỨC MỚI</span></h3>

                        <ul>
                            <?php
                            $argsArticel = [
                                'post_type' => 'post',
                                'posts_per_page' => 6,
                            ];
                            $articleQuery = new WP_Query($argsArticel);
                            $first_post = true;
                            ?>
                            <?php if ($articleQuery->have_posts()) : ?>
                                <?php while ($articleQuery->have_posts()) : $articleQuery->the_post(); ?>
                                    <li>
                                        <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" rel="bookmark">
                                            <?php
                                            if(has_post_thumbnail()) {
                                                $post_thumbnail_attr = array(
                                                    'alt'   =>  get_the_title(),
                                                    'class'   =>  'loading',
                                                );
                                                the_post_thumbnail('blog-thumb',$post_thumbnail_attr );
                                            } else {
                                                echo '<img class="loading" src="'.THEME_URL.'/assets/images/no-thumb.png" alt="'.get_the_title().'">';
                                            }
                                            ?>
                                        </a>
                                        <h4>
                                            <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>

                                        </h4>
                                        <time class="meta-date"><?php echo get_the_date("d/m/Y H:i:s") ?></time>
                                    </li>

                                <?php endwhile; ?>
                            <?php endif; ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php
get_footer();
