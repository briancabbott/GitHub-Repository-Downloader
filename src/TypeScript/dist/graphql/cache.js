"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemsVar = exports.isLoggedInVar = exports.cache = void 0;
const client_1 = require("@apollo/client");
exports.cache = new client_1.InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return (0, exports.isLoggedInVar)();
                    }
                },
                cartItems: {
                    read() {
                        return (0, exports.cartItemsVar)();
                    }
                },
                launches: {
                    keyArgs: false,
                    merge(existing, incoming) {
                        let launches = [];
                        if (existing && existing.launches) {
                            launches = launches.concat(existing.launches);
                        }
                        if (incoming && incoming.launches) {
                            launches = launches.concat(incoming.launches);
                        }
                        return {
                            ...incoming,
                            launches,
                        };
                    }
                }
            }
        }
    }
});
exports.isLoggedInVar = (0, client_1.makeVar)(!!localStorage.getItem('token'));
exports.cartItemsVar = (0, client_1.makeVar)([]);
