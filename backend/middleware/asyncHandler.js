// Middleware function to handle asynchronous operations and errors
const asyncHandler = fn => (req, res, next) => {
    // Call the provided function `fn` with the request, response, and next middleware function
    // Resolve the promise returned by `fn`, and catch any errors that occur, passing them to the `next` function
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Export the asyncHandler middleware function to make it available for use in other modules
export default asyncHandler;
