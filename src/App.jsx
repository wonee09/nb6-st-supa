import { UserProvider } from "./context/UserContext";
import AppRouter from "./shared/Router";

const App = () => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
};

export default App;
