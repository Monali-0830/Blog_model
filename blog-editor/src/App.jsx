import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/LOgin';
import Editor from './component/BlogEditor';
import BlogList from './component/Bloglist';
import Header from './component/Header';
import DraftsList from './component/DraftList';
import PublishedList from './component/PublishList';

function AppWrapper() {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/signup'];

  return !hideHeaderPaths.includes(location.pathname) ? (
    <Header
      onLogout={() => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // simple full page reload for logout
      }}
    />
  ) : null;
}

export default function App() {
  const [isAuth, setAuth] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AppWrapper />
      <Routes>
        {/* existing routes */}
        <Route
          path="/signup"
          element={<Signup onSignup={() => setAuth(true)} />}
        />

        <Route
          path="/login"
          element={<Login onLogin={() => setAuth(true)} />}
        />

        <Route
          path="/editor"
          element={isAuth ? <Editor /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/"
          element={isAuth ? <BlogList /> : <Navigate to="/login" replace />}
        />

        {/* NEW routes for drafts and published lists */}
        <Route
          path="/drafts"
          element={isAuth ? <DraftsList /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/published"
          element={isAuth ? <PublishedList /> : <Navigate to="/login" replace />}
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
