import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import { StyledEngineProvider } from '@mui/material/styles';
import { ElementRHProvider } from './contexts/ElementRHProvider.jsx';

import './../resources/css/app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider>
			<StyledEngineProvider injectFirst>
				<ElementRHProvider>
					<RouterProvider router={router} />
				</ElementRHProvider>
			</StyledEngineProvider>
		</ThemeProvider>
	</React.StrictMode>
)
