/**
 * Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/email-verification",
    "/reset-password",
    '/password-reset-email-redirect'
]


/**
 * This array of routes are used for authentication
 * @type {string[]}
 */
export const authRoutes = [
    '/Login',
    '/Signup',
    '/api/users',
]

/**
 * This is the auth api route
 * it should be by default, accessible to the public
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/home'