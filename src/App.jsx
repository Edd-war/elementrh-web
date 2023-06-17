import { useState } from 'react'
import laravelLogo from './assets/laravel.svg'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './../resources/css/welcome.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="grid grid-cols-1 gap-14 mt-10 content-center">
		<div className="flex justify-center gap-20 mt-10 items-center">
			<a href="https://laravel.com/docs/10.x" target="_blank" rel="noreferrer">
				<span className="relative flex items-center justify-center">
					<img className="h-40 w-40 animate-ping-slow hover:drop-shadow-light dark:hover:drop-shadow-dark"
						alt="Laravel logo" 
						src={laravelLogo}
					/>
				</span>
			</a>
			<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
				<img className="h-40 w-40 animate-bounce hover:drop-shadow-light dark:hover:drop-shadow-dark"
					alt="Vite logo" 
					src={viteLogo}
				/>
			</a>
			<a href="https://react.dev" target="_blank" rel="noreferrer">
				<img className="h-40 w-40 animate-spin-slow hover:drop-shadow-light dark:hover:drop-shadow-dark"
					alt="React logo" 
					src={reactLogo} 
				/>
			</a>
		</div>
		<h1 className='text-5xl text-center'>
			Laravel &nbsp;&nbsp; + &nbsp; Vite &nbsp; + &nbsp;&nbsp; React
		</h1>
		<div className="card text-center">
			<button className='border-2 rounded-lg border-solid border-transparent
				bg-black/25 text-white 
				hover:border-blue-500 p-2
				hover:bg-black/50
				cursor-pointer
				transition-colors duration-300 
				focus-visible:outline-2 
				focus-visible:ring-2 
				focus-visible:ring-blue-500 
				focus-visible:ring-opacity-50'
				onClick={() => setCount((count) => count + 1)}
			>
				count is {count}
			</button>
			<p>
				Edit <code>src/App.jsx</code> and save to test HMR
			</p>
		</div>
		<p className="read-the-docs text-center">
			Click on the Vite and React logos to learn more
		</p>
    </div>
  )
}

export default App
