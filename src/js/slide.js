/**
 * Class representing a Slide element (.slide)
 */
export class Slide {
	// DOM elements
	DOM = {
		// main element (.slide)
		el: null,
		// slide inner element (.slide__inner)
		inner: null,
        // slide image element (.slide__img)
        img: null,
        // slide image inner element (.slide__img-inner)
        imgInner: null,
        // slide content element (.slide__content)
        content: null,
        // slide content image (slide__content-img)
        contentImg: null,
        // other content elements besides the image
        contentTexts: null,
	};
	
	/**
	 * Constructor.
	 * @param {Element} DOM_el - main element (.slide)
	 */
	constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.DOM.inner = this.DOM.el.querySelector('.slide__inner');
        this.DOM.img = this.DOM.el.querySelector('.slide__img');
        this.DOM.imgInner = this.DOM.el.querySelector('.slide__img-inner');
        this.DOM.content = this.DOM.el.querySelector('.slide__content');
        this.DOM.contentImg = this.DOM.content.querySelector('.slide__content-img');
        this.DOM.contentTexts = [...this.DOM.content.children].filter(item => item != this.DOM.contentImg);
	}
}