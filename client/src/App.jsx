import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "./store/auth.slice";
import { BrowserRouter } from "react-router-dom";

import SystemBar from "./components/ui/SystemBar";
import SystemFooter from "./components/ui/SystemFooter";
import AppRouter from "./router";

export default function App() {
  const dispatch = useDispatch();

 useEffect(() => {
  dispatch(fetchMe());
}, []);


  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex flex-col bg-bg">
        <SystemBar version="v0.1.0" />

        <div className="flex-1 overflow-hidden">
          <AppRouter />
        </div>

        <SystemFooter />
      </div>
    </BrowserRouter>
  );
}
