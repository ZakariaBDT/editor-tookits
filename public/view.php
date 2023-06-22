<?php
/**
 * Public View Class
 */

 class BOILERPLATE_PUBLIC_VIEW_CLASS {

    /**
     * Constructor
     */
    public function __construct() {
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
    } 

    /**
     * Enqueue Scripts
     */
    public function enqueue_scripts() {
        wp_enqueue_style( 'bep-frontend-style', BOILERPLATE_URL . 'public/assets/css/frontend-style.css', [], BOILERPLATE_VERSION, 'all' );
    }
}

new BOILERPLATE_PUBLIC_VIEW_CLASS();