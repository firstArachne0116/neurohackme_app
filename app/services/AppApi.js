// class Api {
//     static headers(token) {
//         return {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': token,
//             'dataType': 'json',
//         }
//     }

//     static neurohack(route, params, token, verb,) {
//         const host = 'https://neurohack.app/'
//         const url = `${host}${route}`
//         console.log('__host__', host)
//         console.log('__url___', url)
//         let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);
//         console.log('options__', options)
//         options.headers = Api.headers(token)
//         return fetch(url, options).then(resp => {
//             let json = resp.json();
//             if (resp.ok) {
//                 return json;
//             } else {
//                 return json;
//             }
//         }).then(json => json);
//     }

//     // static get(route, token) {
//     //     return this.neurohack(route, null, token, 'GET');
//     // }

//     // static put(route, params) {
//     //     return this.neurohack(route, params, 'PUT')
//     // }

//     // static post(route, params) {
//     //     return this.neurohack(route, params, null, 'POST')
//     // }
//     static postWithToken(route, params, token) {
//         console.log('route__', route, params, token)
//         return this.neurohack(route, params, token, 'POST')
//     }
//     // static postWithToken(route, params, token) {
//     //     console.log('route__', route, params, token)
//     //     return this.neurohack(route, params, token, 'POST')
//     // }

//     // static delete(route, params) {
//     //     return this.neurohack(route, params, 'DELETE')
//     // }

//     // static patchWithToken(route, params, token) {
//     //     return this.neurohack(route, params, token, 'PATCH')
//     // }

// }
// export default Api


// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////



// // class AppApi {
// //   static headers(token) {
// //     return {
// //       'Accept': 'application/json',
// //       'Content-Type': 'application/x-www-form-urlencoded',
// //       'Authorization': token,
// //       'dataType': 'json',
// //     }
// //   }



// //   static neurohack(route, params, token, verb) {

// //     // live .........................
// //     const host = 'http://178.128.215.126/api/'

// //     // local.........................
// //     // const host = ''

// //     const url = `${host}${route}`
// //     let options = Object.assign({ method: verb }, params ? { body: params } : null);
// //     options.headers = AppApi.headers(token)

// //     return fetch(url, options).then(resp => {
// //       let json = resp.json();
// //       if (resp.ok) {
// //         return json;
// //       }
// //       return json.then(err => console.log('_ERROR', err));
// //     }).then(json => json)
// //       .catch(error => error)
// //   }

// //   static signup(params) {
// //     console.log('dattaaa', params)
// //     return this.neurohack('signup', params, null, 'POST')
// //   }


// // }

// // export default AppApi
