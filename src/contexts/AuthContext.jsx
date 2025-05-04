import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabase';

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_OUT') {
                    setUser(null)
                } else if (session) {
                    setUser(session.user)
                }
                setLoading(false)
            })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const signup = async(email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
    }

    const login = async(email, password) => {
        const { data, error } = supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
    }

    const logout = async() => {
        const { error } = await supabase.auth.signOut()
        if(error) {
            console.log(error)
        }
    }

    const value = {
        user,
        signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
