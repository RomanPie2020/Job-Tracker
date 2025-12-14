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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/jwt */ \"(middleware)/./node_modules/next-auth/jwt/index.js\");\n/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\n\nasync function middleware(req) {\n    const token = await (0,next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__.getToken)({\n        req\n    });\n    if (!token?.email) {\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: 'Unauthorized'\n        }, {\n            status: 401\n        });\n    }\n    const response = next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.next();\n    response.headers.set('x-user-email', token.email);\n    console.log('Middleware - User email:', token.email);\n    return response;\n}\nconst config = {\n    matcher: [\n        '/api/jobs/:path*'\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUF3QztBQUNlO0FBRWhELGVBQWVFLFdBQVdDLEdBQWdCO0lBQy9DLE1BQU1DLFFBQVEsTUFBTUosdURBQVFBLENBQUM7UUFBRUc7SUFBSTtJQUNuQyxJQUFJLENBQUNDLE9BQU9DLE9BQU87UUFDakIsT0FBT0oscURBQVlBLENBQUNLLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEU7SUFFQSxNQUFNQyxXQUFXUixxREFBWUEsQ0FBQ1MsSUFBSTtJQUNsQ0QsU0FBU0UsT0FBTyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCUixNQUFNQyxLQUFLO0lBQ2hEUSxRQUFRQyxHQUFHLENBQUMsNEJBQTRCVixNQUFNQyxLQUFLO0lBQ25ELE9BQU9JO0FBQ1Q7QUFFTyxNQUFNTSxTQUFTO0lBQ3BCQyxTQUFTO1FBQUM7S0FBbUI7QUFDL0IsRUFBQyIsInNvdXJjZXMiOlsiRDpcXEpvYl9zZWFyY2hfdHJhY2tlclxcbWlkZGxld2FyZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRUb2tlbiB9IGZyb20gJ25leHQtYXV0aC9qd3QnXHJcbmltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtaWRkbGV3YXJlKHJlcTogTmV4dFJlcXVlc3QpIHtcclxuICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldFRva2VuKHsgcmVxIH0pXHJcbiAgaWYgKCF0b2tlbj8uZW1haWwpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LCB7IHN0YXR1czogNDAxIH0pXHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IE5leHRSZXNwb25zZS5uZXh0KClcclxuICByZXNwb25zZS5oZWFkZXJzLnNldCgneC11c2VyLWVtYWlsJywgdG9rZW4uZW1haWwpXHJcbiAgY29uc29sZS5sb2coJ01pZGRsZXdhcmUgLSBVc2VyIGVtYWlsOicsIHRva2VuLmVtYWlsKVxyXG4gIHJldHVybiByZXNwb25zZVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xyXG4gIG1hdGNoZXI6IFsnL2FwaS9qb2JzLzpwYXRoKiddLFxyXG59XHJcbiJdLCJuYW1lcyI6WyJnZXRUb2tlbiIsIk5leHRSZXNwb25zZSIsIm1pZGRsZXdhcmUiLCJyZXEiLCJ0b2tlbiIsImVtYWlsIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwicmVzcG9uc2UiLCJuZXh0IiwiaGVhZGVycyIsInNldCIsImNvbnNvbGUiLCJsb2ciLCJjb25maWciLCJtYXRjaGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});