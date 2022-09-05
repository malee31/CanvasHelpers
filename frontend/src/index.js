import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import './index.css';
import { GlobalContexts } from "./components/parts/GlobalData";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<GlobalContexts>
			<Home/>
		</GlobalContexts>
	</React.StrictMode>
);