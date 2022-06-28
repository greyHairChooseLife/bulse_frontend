import React, { useState, useEffect } from 'react';
import { Login, Register, Identity, StateTaps, CalendarFormat, DiagramFormat, TextTalbeFormat, DetailPage, CommentTextarea, PrivateNoteTextarea } from './Element';
import axios from 'axios';
import './Admin.css';

const api = axios.create({
	baseURL: `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`,
})

type modeType = 'register' | 'login' | 'content'
type classNameType = 'adminRegister' | 'adminLogin' | 'adminContent'
interface Iwhoami {
	nickname: string
	status: 1 | 2
}

export const Admin = () => {

	const [ mode, setMode ] = useState<modeType>('register');
	const [ classNames, setClassNames ] = useState<classNameType>('adminRegister');
	const [ whoami, setWhoami ] = useState<Iwhoami | null>(null);

	const [ article2, setArticle ]  = useState<any>(null);

	useEffect(() => {
		const getLastAndSetWhoami = async () => {
			const result = await api.get('admin');
			setWhoami(result.data);
		};
		getLastAndSetWhoami();
	}, [])

	useEffect(() => {
		if(whoami !== null){
			switch (whoami.status){
				case 1:
					setMode('login');
					break;
				case 2:
					setMode('register');
					break;
			}
		}
	}, [whoami])

	useEffect(() => {
		switch (mode){
			case 'register':
				setClassNames('adminRegister')
				setArticle(<Register></Register>)
				break;
			case 'login':
				setClassNames('adminLogin')
				setArticle(<Login></Login>)
				break;
			case 'content':
				setClassNames('adminContent')
				setArticle(<Register></Register>)
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
			{article2}
		</div>
	);

	// just for layout testing
	// just for layout testing
	// just for layout testing
	// just for layout testing

}
