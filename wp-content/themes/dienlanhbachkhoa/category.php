<?php
get_header(); ?>

    <div class="container">
        <div id="main-content">
            <div id="content">
                <div class="widget widget_nav_menu">
                    <h1 class="widget-title"><?php single_cat_title(); ?></h1>
                </div>
                <?php
                if (have_posts()) : ?>

                    <div class="categories">
                        <div class="row">
                            <?php while (have_posts()) : the_post(); ?>
                                <article class="col-lg-6 col-md-6 col-sm-6 col-xs-12 blog-item hentry post">
                                    <div class="row" style="height: 100px">
                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <div class="thumb-pad1">
                                                <div class="thumbnail">
                                                    <figure>
                                                        <a href="<?php the_permalink(); ?>"
                                                           title="<?php the_title(); ?>">
                                                            <?php
                                                            if (has_post_thumbnail()) {
                                                                $post_thumbnail_attr = array(
                                                                    'alt' => get_the_title(),
                                                                    'class' => 'loading',
                                                                );
                                                                the_post_thumbnail('blog-thumb', $post_thumbnail_attr);
                                                            } else {
                                                                echo '<img class="img-responsive" src="' . THEME_URL . '/assets/images/no-thumb.png" alt="' . get_the_title() . '">';
                                                            }
                                                            ?>
                                                        </a>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                            <h4 class="entry-title"><a href="<?php the_permalink(); ?>"
                                                                       title="<?php the_title(); ?>"><?php the_title(); ?></a>
                                            </h4>
                                            <p>
                                                <?php
                                                $content = apply_filters('the_content', get_the_content());
                                                $content = str_replace(']]>', ']]&gt;', $content);
                                                echo wp_trim_words($content, 20, '...');
                                                ?>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="divider"></div>
                                </article>


                            <?php endwhile; ?>
                        </div>
                    </div>
                <?php endif; ?>
                <div class="pagenavi clear"></div>
            </div>
        </div>
        <?php get_sidebar() ?>
    </div><br>

<?php get_footer(); ?>