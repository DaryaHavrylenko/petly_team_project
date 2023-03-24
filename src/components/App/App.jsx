import { RouterProvider } from 'react-router-dom';
import router from 'router';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth/useAuth';
import { useEffect } from 'react';
import { refreshUser } from '../../redux/auth/operations';

const App = () => {
  const dispatch = useDispatch();

  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <RouterProvider router={router} />
  );
};

export default App;
