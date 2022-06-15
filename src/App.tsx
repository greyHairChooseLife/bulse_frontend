import React, { useState } from 'react';
import { Speak } from './components/speak/Speak';
import { Admin } from './components/admin/Admin';
import { SpeakerBtn, ListenerBtn, ChatterBtn, AdminBtn } from './components/MainModeBtn';
import './App.css';

type mainMode = 'speaker' | 'listener' | 'chatter' | 'admin' |null;

export const App = () => {

	const [ mainMode, setMainMode ] = useState<mainMode>(null);

	const speakerBtn = <SpeakerBtn onclickEvent={setMainMode}></SpeakerBtn>
	const listenerBtn = <ListenerBtn onclickEvent={setMainMode}></ListenerBtn>
	const chatterBtn = <ChatterBtn onclickEvent={setMainMode}></ChatterBtn>
	const adminBtn = <AdminBtn onclickEvent={setMainMode}></AdminBtn>

	let article = null;
	switch (mainMode){
		case 'speaker':
			article = <Speak></Speak>;
			break;
		case 'listener':
			article = 'listenerComponent';
			break;
		case 'chatter':
			article = 'chatterComponent';
			break;
		case 'admin':
			article = <Admin></Admin>;
			break;
		default :
			console.log('mainMode :', mainMode);
	}

	const mainModeBtnBlock = 
			<div className="MainModeBtn">
				{speakerBtn}
				{listenerBtn}
				{chatterBtn}
				{adminBtn}
			</div>;

	const articleBlock = 
			<div className="MainArticle">
				{article}
			</div>;
	

	return (
		<div className="App">
			{mainMode === null ? mainModeBtnBlock : articleBlock}
		</div>
	);
}
