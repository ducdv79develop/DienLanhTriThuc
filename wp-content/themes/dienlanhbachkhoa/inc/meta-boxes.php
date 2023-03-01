<?php

add_filter('rwmb_meta_boxes', 'dvb_register_meta_boxes');

function dvb_register_meta_boxes($meta_boxes)
{
    $meta_boxes[] = array(
        'title' => __('Cấu hình cơ bản', 'dvb'),
        'pages' => array('post'),
        'fields' => array(
            [
                'name' => 'Bài viết nổi bật',
                'id'   => 'post_recommend',
                'type' => 'checkbox',
                'std'  => 0,
            ],
        ),
    );
    return $meta_boxes;
}
