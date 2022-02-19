import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import focusApi from '../api/focusApi';

import { LoginResponse, LoginData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: string | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}



export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any)=> {

    const [ state, dispatch ] = useReducer( authReducer, authInicialState);

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        
        // No encontro token
        if ( !token ) {
            return dispatch({ type: 'notAuthenticated' });
        }
        else{
            dispatch({ 
                type: 'signUp',
                payload: {
                    token,
                    user: user || 'miuser'
                }
            });

        } 
       
    }


    const signIn = async({ email, password }: LoginData ) => {

        try {
         
            const { data } = await focusApi.post<LoginResponse>('/login', { email, password } );
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: email
                }
            });

            await AsyncStorage.setItem('token', data.token );
            await AsyncStorage.setItem('user', email );

        } catch (error: any) {
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.error || 'Incorrect information'
            })
        }
    };
    
    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        dispatch({ type: 'logout' });
        console.log('llega aca')
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )

}


