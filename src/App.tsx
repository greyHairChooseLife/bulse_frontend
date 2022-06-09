import React, { useState, useEffect } from 'react';
import { Speak } from './components/speak/Speak';
import { SpeakerBtn, ListenerBtn, ChatterBtn } from './components/MainModeBtn';
import './App.css';

type mainMode = 'speaker' | 'listener' | 'chatter' | null;

export const App = () => {

	const [ mainMode, setMainMode ] = useState<mainMode>(null);

	const speakerBtn = <SpeakerBtn onclickEvent={setMainMode}></SpeakerBtn>
	const listenerBtn = <ListenerBtn onclickEvent={setMainMode}></ListenerBtn>
	const chatterBtn = <ChatterBtn onclickEvent={setMainMode}></ChatterBtn>

	let article = null;
	switch (mainMode){
		case 'speaker':
			article = <Speak></Speak>
			break;
		case 'listener':
			article = 'listenerComponent';
			break;
		case 'chatter':
			article = 'chatterComponent';
			break;
		default :
			console.log('mainMode :', mainMode);
	}

	const mainModeBtnBlock = 
			<div className="MainModeBtn">
				{ speakerBtn }
				{ listenerBtn }
				{ chatterBtn }
			</div>;

	const articleBlock = 
			<div className="MainArticle">
				{ article }
			</div>;
	

	return (
		<div className="App">
			{mainMode === null ? mainModeBtnBlock : articleBlock}
		</div>
	);
}
