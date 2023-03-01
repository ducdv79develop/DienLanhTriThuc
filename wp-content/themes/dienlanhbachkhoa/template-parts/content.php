<div class="post-item">
    <div class="row post-inner">
        <div class="post-thumb col-md-3 col-sm-4">
            <a class="hover-effect" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" rel="bookmark">
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
                <span class="over-play"></span>
            </a>
        </div>
        <div class="post-info col-md-9 col-sm-8">
            <h3 class="post-title">
                <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" rel="bookmark">
                    <?php the_title(); ?>
                </a>
            </h3>
            <div class="post-summary">
                <?php
                $content = apply_filters('the_content', get_the_content());
                $content = str_replace(']]>', ']]&gt;', $content);
                echo wp_trim_words( $content, 20 ,'...' );
                ?>
            </div>
            <a class="detail" href="<?php the_permalink(); ?>">
                Chi tiết <i class="fa fa-angle-double-right" aria-hidden="true"></i>
            </a>
        </div>
    </div>
</div>