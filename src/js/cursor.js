import { lerp, getCursorPos } from './utils';

// Track the cursor position
let cursor = {x: 0, y: 0};
window.addEventListener('mousemove', ev => cursor = getCursorPos(ev));

/**
 * Class representing a .cursor element
 */
export class CursorText {
	// DOM elements
	DOM = {
		// Main element (.cursor)
		el: null,
		// Inner element (.cursor__text)
		text: null,
	}
	// Element style properties
	renderedStyles = {
		// With interpolation, we can achieve a smooth animation effect when moving the cursor. 
		// The "previous" and "current" values are the values that will interpolate. 
		// The returned value will be one between these two (previous and current) at a specific increment. 
		// The "amt" is the amount to interpolate. 
		// As an example, the following formula calculates the x-axis translation value to apply to the cursor element:
		// this.renderedStyles.tx.previous = lerp(this.renderedStyles.tx.previous, this.renderedStyles.tx.current, this.renderedStyles.tx.amt);
		
		// translation values
		// The lower the amt, the slower the cursor "follows" the user gesture
		tx: {previous: 0, current: 0, amt: 0.15},
		ty: {previous: 0, current: 0, amt: 0.15},
	};
	// Element size and position
	bounds;

	/**
	 * Constructor.
	 */
	constructor(DOM_el) {
		this.DOM.el = DOM_el;
		this.DOM.text = this.DOM.el.querySelector('.cursor__text');
		
		// Hide it initially
		this.DOM.el.style.opacity = 0;
		
		// Calculate size and position
		this.bounds = this.DOM.el.getBoundingClientRect();

		for (const key in this.renderedStyles) {
			this.renderedStyles[key].amt = this.DOM.el.dataset.amt || this.renderedStyles[key].amt;
		}
		
		// Show the element and start tracking its position as soon as the user moves the cursor.
		const onMouseMoveEv = () => {
			// Set up the initial values to be the same
			this.renderedStyles.tx.previous = this.renderedStyles.tx.current = cursor.x + 20;
			this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = cursor.y - this.bounds.height/2;
			// Show it
			this.DOM.el.style.opacity = 1;
			// Start rAF loop
			requestAnimationFrame(() => this.render());
			// Remove the initial mousemove event
			window.removeEventListener('mousemove', onMouseMoveEv);
		};
		window.addEventListener('mousemove', onMouseMoveEv);
	}

	/**
	 * Loop / Interpolation
	 */
	render() {
		// New cursor positions
		this.renderedStyles['tx'].current = cursor.x + 20;
		this.renderedStyles['ty'].current = cursor.y - this.bounds.height/2;
		
		// Interpolation
		for (const key in this.renderedStyles ) {
			this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
		}
		
		// Apply interpolated values (smooth effect)
		this.DOM.el.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px)`;

		// loop...
		requestAnimationFrame(() => this.render());
	}
}