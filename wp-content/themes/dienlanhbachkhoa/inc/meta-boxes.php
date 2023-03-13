<?php

add_filter('rwmb_meta_boxes', 'theme_register_meta_boxes');

function theme_register_meta_boxes($meta_boxes)
{
    $meta_boxes[] = array(
        'title' => __('Cấu hình cơ bản', 'bcfg'),
        'pages' => array('post'),
        'fields' => array(
            [
                'name' => 'Bài viết nổi bật',
                'id'   => 'post_recommend',
                'type' => 'checkbox',
                'std'  => 0,
            ],
            [
                'name' => 'Thứ tự sắp xếp',
                'id'   => 'post_sort_order',
                'type' => 'number',
                'std'  => 1,
            ],
        ),
    );
    return $meta_boxes;
}
