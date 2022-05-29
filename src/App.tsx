import React, { useState, useEffect } from 'react';
import { Project } from './components/Project';
import './App.css';

type mainMode = 'user' | 'project' | 'arena' | null;

export const App = () => {

	const [ mainMode, setMainMode ] = useState<mainMode>(null);

	let article = null;
	switch (mainMode){
		case 'user':
			article = 'userComponent';
			break;
		case 'project':
			article = <Project></Project>
			break;
		case 'arena':
			article = 'arenaComponent';
			break;
		default :
			console.log('mainMode :', mainMode);
	}

	return (
		<div className="App">
			<button className="btnUser" onClick={() => {
				setMainMode('user');
			}}>user</button>
			<button className="btnProject" onClick={() => {
				setMainMode('project');
			}}>project</button>
			<button className="btnArena" onClick={() => {
				setMainMode('arena');
			}}>arena</button>

			{ article }
		</div>
	);
}
