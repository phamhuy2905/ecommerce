import { useState, createContext, useContext } from "react";
import { getProfileLocal, getTokenLocal } from "../helpers/local.helper";
import { UserType } from "../types/auth.type";

interface TypeAuthInitialState {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    profile: UserType | null;
    setProfile: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const initialState: TypeAuthInitialState = {
    isAuthenticated: Boolean(getTokenLocal()),
    setIsAuthenticated: () => {},
    profile: getProfileLocal(),
    setProfile: () => {},
};

const AuthContext = createContext<TypeAuthInitialState>(initialState);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialState.isAuthenticated);
    const [profile, setProfile] = useState<UserType | null>(initialState.profile);
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
