import { AuthBindings } from "@refinedev/core";
import { notification } from "antd";
import Cookies from 'js-cookie';
import { useState } from "react"

export const TOKEN_KEY = "token";

// const [loading, setLoading] = useState(false);


export const authProvider: AuthBindings = {


    login: async ({ email, password }) => {
        localStorage.setItem(TOKEN_KEY, `${email}-${password}`);
        return {
            success: true,
            redirectTo: "/",
        };
    },
    // register: async ({ email, password }) => {
    //     try {
    //         await authProvider.login({ email, password });
    //         return {
    //             success: true,
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: {
    //                 message: "Register failed",
    //                 name: "Invalid email or password",
    //             },
    //         };
    //     }
    // },
    // updatePassword: async () => {
    //     notification.success({
    //         message: "Updated Password",
    //         description: "Password updated successfully",
    //     });
    //     return {
    //         success: true,
    //     };
    // },
    // forgotPassword: async ({ email }) => {
    //     notification.success({
    //         message: "Reset Password",
    //         description: `Reset password link sent to "${email}"`,
    //     });
    //     return {
    //         success: true,
    //     };
    // },
    logout: async () => {
        // Cookies.remove(TOKEN_KEY);

        return new Promise((resolve, reject) => {

            const url = 'http://localhost:3000'; // Change the URL to your server endpoint

            fetch(url, { method: 'HEAD', mode: 'no-cors' })
                .then(() => {
                    Cookies.remove(TOKEN_KEY);
                    Cookies.remove('user');
                    window.location.href = url;
                    // resolve({
                    //     success: true,
                    //     redirectTo: "/login",
                    // });
                })
                .catch(() => {
                    console.log('Server is not available');
                    reject(new Error('Server is not available'));
                });
        });
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        const token = Cookies.get(TOKEN_KEY);
        if (token) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            error: {
                message: "Check failed",
                name: "Token not found",
            },
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const token = Cookies.get(TOKEN_KEY);
        if (!token) {
            return null;
        }

        const cleanedToken = token.slice(1, -1);
        

        try {
            const response = await fetch("http://43.205.207.125/api/v1/auth/get_instructor", {
                headers: {
                    Authorization: `Bearer ${cleanedToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();

                //   console.log("data",data);
                return {
                    id: data.status.id,
                    name: data.status.firstname,
                    avatar: data.status.avatar,
                };
            } else {
                // Handle the error response
                console.error("Failed to fetch instructor identity");
                return null;
            }
        } catch (error) {
            // Handle any network or other errors
            console.error("An error occurred while fetching instructor identity", error);
            return null;
        }


    },
};
