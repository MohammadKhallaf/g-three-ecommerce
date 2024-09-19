import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: {
    _id: "",
    username: "",
    password: "", // don't !
    role: "",
  },
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // sync only
    const userInLocal = localStorage.getItem("user");
    const userInJS = JSON.parse(userInLocal);
    // if (userInJS) return userInJS;
    // else return [];
    return userInJS ?? {};
  });

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser({});
  };

  useEffect(() => {
    const stringUserObject = JSON.stringify(user);
    localStorage.setItem("user", stringUserObject);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
