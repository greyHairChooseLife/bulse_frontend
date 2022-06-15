import React, { useState, useEffect } from 'react';
import { Login, Register, Identity, StateTaps, CalendarFormat, DiagramFormat, TextTalbeFormat, DetailPage, CommentTextarea, PrivateNoteTextarea } from './Element';
import axios from 'axios';
import './Admin.css';

const api = axios.create({
	baseURL: `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`,
})

type modeType = 'register' | 'login' | 'content'
type classNameType = 'adminRegister' | 'adminLogin' | 'adminContent'

export const Admin = () => {

	const [ mode, setMode ] = useState<modeType>('register');
	const [ classNames, setClassNames ] = useState<classNameType>('adminRegister');

	useEffect(() => {
		//
		//		axios : get admin info that has status like alive
		//		setMode by each case
		//
	}, [])

	useEffect(() => {
		switch (mode){
			case 'register':
				setClassNames('adminRegister');
				break;
			case 'login':
				setClassNames('adminLogin');
				break;
			case 'content':
				setClassNames('adminContent');
				break;
		}
	}, [mode])


	// just for layout testing
	// just for layout testing
	// just for layout testing
	// just for layout testing
	const [ article, SET ]  = useState<any>(null);
	const actLogin = () => { SET(<Login></Login>) }
	const actDetailPage = () => { SET(<DetailPage></DetailPage>) }
	const actRegister = () => { SET(<Register></Register>) }
	const actCalF = () => { 
		SET(
			<div className="Format">
				<Identity></Identity>
				<StateTaps></StateTaps>
				<CalendarFormat></CalendarFormat>
				<DiagramFormat></DiagramFormat>
			</div>
		)
	}
	const actTableF = () => { 
		SET(
			<div className="Format">
				<Identity></Identity>
				<StateTaps></StateTaps>
				<TextTalbeFormat></TextTalbeFormat>
			</div>
		)
	}
	const actDetailReview = () => { 
		SET(
			<div className="Format">
				<DetailPage></DetailPage>
				<CommentTextarea></CommentTextarea>
				<PrivateNoteTextarea></PrivateNoteTextarea>
			</div>
		)
	}
	// just for layout testing
	// just for layout testing
	// just for layout testing
	// just for layout testing


	return (
		<div className={classNames}>
			<div className="tempBtn">
				<button onClick={actLogin}>login</button>
				<button onClick={actRegister}>register</button>
				<button onClick={actCalF}>calFormat</button>
				<button onClick={actTableF}>tableFormat</button>
				<button onClick={actDetailPage}>detailPage</button>
				<button onClick={actDetailReview}>detail+review</button>
			</div>
			{article}
		</div>
	);
}
