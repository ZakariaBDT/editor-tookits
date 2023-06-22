<?php
/**
 * Plugin Name:       Block Editor Plus
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Zakaria Binsaifullah
 * Author URI:        https://makegutenblock.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-editor-plus
 *
 */

// Stop Direct Access 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Blocks Final Class
 */

final class BOILERPLATE_BLOCKS_CLASS {
	public function __construct() {

		// define constants
		$this->define_constants();

		// block initialization
		add_action( 'init', [ $this, 'blocks_init' ] );

		// blocks category
		if( version_compare( $GLOBALS['wp_version'], '5.7', '<' ) ) {
			add_filter( 'block_categories', [ $this, 'register_block_category' ], 10, 2 );
		} else {
			add_filter( 'block_categories_all', [ $this, 'register_block_category' ], 10, 2 );
		}

		// register blocks style
		add_filter( 'render_block', [ $this, 'generate_inline_style_on_render_block' ], 10, 2 );

		// Editor Script
		add_action( 'enqueue_block_editor_assets', [ $this, 'editor_scripts' ] );	

		// render hooks attributes
		add_filter( 'render_block', [ $this, 'render_hooks_attributes' ], 10, 2 );

		// includes 
		$this->includes();
	}

	/**
	 * Includes
	 */
	public function includes() {
		require_once __DIR__ . '/public/view.php';
	}

	/**
	 * Initialize the plugin
	 */
	public static function init(){
		static $instance = false; 
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Define the plugin constants
	 */
	private function define_constants() {
		define( 'BOILERPLATE_VERSION', '1.0.0' );
		define( 'BOILERPLATE_URL', plugin_dir_url( __FILE__ ) );	
	}

	/**
	 * Register Block Category
	 */
	public function register_block_category( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'boilerplate',
					'title' => __( 'Boilerplate', 'boilerplate' ),
				),
			),
			$categories,
		);
	}

	/**
	 * Blocks Registration 
	 */
	public function register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/blocks/' . $name, $options );
	 }

	/**
	 * Blocks Initialization
	*/
	public function blocks_init() {
		$blocksList = [
			'test',
		];
		
		// register blocks
		if( ! empty( $blocksList ) ) {
			foreach( $blocksList as $block ) {
				$this->register_block( $block );
			}
		}
	}

	/**
     * Register Inline Style
     */
    function generate_inline_style_on_render_block($block_content, $block ) {

        if (isset($block['blockName']) && str_contains($block['blockName'], 'boilerplate/')) {
            if (isset($block['attrs']['blockStyle'])) {

                $style = $block['attrs']['blockStyle'];
                $handle = isset( $block['attrs']['uniqueId'] ) ? $block['attrs']['uniqueId'] : 'boilerplate-blocks';

                // convert style array to string
                if ( is_array($style) ) {
                    $style = implode(' ', $style);
                }

                // minify style to remove extra space
                $style = preg_replace( '/\s+/', ' ', $style );

                wp_register_style(
                    $handle,
                    false
                );
                wp_enqueue_style( $handle );
                wp_add_inline_style( $handle, $style );

            }
        }
        return $block_content;
    }

	/**
	 * Hooks Scripts
	 */
	public function editor_scripts() {
		$hooks_dependency_file = __DIR__ . '/build/hooks/index.asset.php';
		if( file_exists( $hooks_dependency_file ) ) {
			$hooks_dependency = require_once $hooks_dependency_file;
		} else {
			$hooks_dependency = [
				'dependencies' => [],
				'version' => BOILERPLATE_VERSION,
			];
		}

		// enqueue hooks style
		wp_enqueue_style(
			'bep-hooks-style',
			BOILERPLATE_URL . 'build/hooks/index.css',
			[],
			BOILERPLATE_VERSION,
			'all'
		);

		// enqueue hooks script
		wp_enqueue_script(
			'bep-hooks-script',
			BOILERPLATE_URL . 'build/hooks/index.js',
			$hooks_dependency['dependencies'],
			$hooks_dependency['version'],
			true
		);
	}

	/**
	 * Render Hooks Attributes
	 */
	public function render_hooks_attributes( $block_content, $block ) {
		// Device Visibility
		$desktop_hide = isset( $block['attrs']['hideOnDesktop'] ) && $block['attrs']['hideOnDesktop'];
		$tablet_hide = isset( $block['attrs']['hideOnTablet'] ) && $block['attrs']['hideOnTablet'];
		$mobile_hide = isset( $block['attrs']['hideOnMobile'] ) && $block['attrs']['hideOnMobile'];
	
		// Device Visibility Class
		$desktop_hide_class = $desktop_hide ? 'bep-hide__desktop ' : '';
		$tablet_hide_class = $tablet_hide ? 'bep-hide__tablet ' : '';
		$mobile_hide_class = $mobile_hide ? 'bep-hide__mobile' : '';
	
		$device_visibility_class = $desktop_hide_class . $tablet_hide_class . $mobile_hide_class;
	
		// Append device visibility class to block wrapper
		if ( ! empty( $device_visibility_class ) ) {

			$block_content =  str_replace( 'class="', 'class="'.$device_visibility_class.'', $block_content );
		}
	
		return $block_content;
	}

}

/**
 * Kickoff
*/

BOILERPLATE_BLOCKS_CLASS::init();
