import { createRoot } from 'react-dom/client'
import './index.css'
import AppWidthRedux from "./AppWidthRedux.tsx";
import {Provider} from "react-redux";
import {store} from "./model/store.ts";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}><AppWidthRedux /></Provider>

)
