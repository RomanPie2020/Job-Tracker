"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/jwt */ \"(middleware)/./node_modules/next-auth/jwt/index.js\");\n/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\n\nasync function middleware(req) {\n    const token = await (0,next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__.getToken)({\n        req\n    });\n    if (!token?.email) {\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: 'Unauthorized'\n        }, {\n            status: 401\n        });\n    }\n    const response = next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.next();\n    response.headers.set('x-user-email', token.email);\n    console.log('Middleware - User email:', token.email);\n    return response;\n}\nconst config = {\n    matcher: [\n        '/api/jobs/:path*'\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUF3QztBQUNFO0FBRW5DLGVBQWVFLFdBQVdDLEdBQWdCO0lBQy9DLE1BQU1DLFFBQVEsTUFBTUosdURBQVFBLENBQUM7UUFBRUc7SUFBSTtJQUNuQyxJQUFJLENBQUNDLE9BQU9DLE9BQU87UUFDakIsT0FBT0oscURBQVlBLENBQUNLLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEU7SUFFQSxNQUFNQyxXQUFXUixxREFBWUEsQ0FBQ1MsSUFBSTtJQUNsQ0QsU0FBU0UsT0FBTyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCUixNQUFNQyxLQUFLO0lBQ2hEUSxRQUFRQyxHQUFHLENBQUMsNEJBQTRCVixNQUFNQyxLQUFLO0lBQ25ELE9BQU9JO0FBQ1Q7QUFFTyxNQUFNTSxTQUFTO0lBQ3BCQyxTQUFTO1FBQUM7S0FBbUI7QUFDL0IsRUFBQyIsInNvdXJjZXMiOlsiRDpcXEpvYl9zZWFyY2hfdHJhY2tlclxcbWlkZGxld2FyZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRUb2tlbiB9IGZyb20gJ25leHQtYXV0aC9qd3QnXHJcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1pZGRsZXdhcmUocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0VG9rZW4oeyByZXEgfSlcclxuICBpZiAoIXRva2VuPy5lbWFpbCkge1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSlcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gTmV4dFJlc3BvbnNlLm5leHQoKVxyXG4gIHJlc3BvbnNlLmhlYWRlcnMuc2V0KCd4LXVzZXItZW1haWwnLCB0b2tlbi5lbWFpbClcclxuICBjb25zb2xlLmxvZygnTWlkZGxld2FyZSAtIFVzZXIgZW1haWw6JywgdG9rZW4uZW1haWwpXHJcbiAgcmV0dXJuIHJlc3BvbnNlXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XHJcbiAgbWF0Y2hlcjogWycvYXBpL2pvYnMvOnBhdGgqJ10sXHJcbn1cclxuIl0sIm5hbWVzIjpbImdldFRva2VuIiwiTmV4dFJlc3BvbnNlIiwibWlkZGxld2FyZSIsInJlcSIsInRva2VuIiwiZW1haWwiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJyZXNwb25zZSIsIm5leHQiLCJoZWFkZXJzIiwic2V0IiwiY29uc29sZSIsImxvZyIsImNvbmZpZyIsIm1hdGNoZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});