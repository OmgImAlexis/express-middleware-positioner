/**
 * Position Middleware in Express stack
 *
 * @param {*} middleware The middleware to add
 * @param {number} position The index where the middleware should go
 * @returns
 */
export const positionMiddleware = (app, middleware, position) => {
	const index = app._router.stack.findIndex(stack => stack.handle.toString() === middleware.toString());

	// If it's in the right spot bail
	if (position === index) {
		return;
	}

	// Otherwise, remove from the current index
	const [stack] = app._router.stack.splice(index, 1);

	// And middleware it into the correct position
	app._router.stack.splice(position, 0, stack);
};

/**
 * Position Middleware before another in Express stack
 *
 * @param {*} middleware The middleware to lookup for the index
 * @param {*} secondMiddleware The middleware to add
 * @returns
 */
export const positionBeforeMiddleware = (app, middleware, secondMiddleware) => {
	positionMiddleware(app, secondMiddleware, app._router.stack.findIndex(stack => stack.handle.toString() === middleware.toString()));
};