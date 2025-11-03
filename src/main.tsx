import { createRoot } from 'react-dom/client'
import './index.css'
import AppWidthRedux from "./app/AppWidthRedux.tsx";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}><AppWidthRedux /></Provider>

)
