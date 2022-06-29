import React, { useState, useEffect } from 'react';
import { Login, Register, Identity, StateTaps, CalendarFormat, DiagramFormat, TextTalbeFormat, DetailPage, CommentTextarea, PrivateNoteTextarea } from './Element';
import axios from 'axios';
import './Admin.css';

const api = axios.create({
	baseURL: `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`,
})

type modeType = 'register' | 'login' | 'content'
type classNameType = 'adminRegister' | 'adminLogin' | 'adminContent'
interface IlastAdmin {
	nickname: string
	status: 1 | 2
}
interface Iwhoami {
	id: number
    login_id: string
    nickname: string
    mobile_number: string
    status: number
    login_record: string | null
    register: Date
	deregister: Date | null
}

export const Admin = () => {

	const [ mode, setMode ] = useState<modeType>('register');
	const [ classNames, setClassNames ] = useState<classNameType>('adminRegister');
	const [ lastAdmin, setLastAdmin ] = useState<IlastAdmin | null>(null);
	const [ whoami, setWhoami ] = useState<Iwhoami | null>(null);

	const [ article2, setArticle ]  = useState<any>(null);

	useEffect(() => {
		const getLastAndSet = async () => {
			const result = await api.get('admin');	//최근 계정의 status와 nickname을 가져온다.
			setLastAdmin(result.data);
		};
		getLastAndSet();
	}, [])

	useEffect(() => {
		if(lastAdmin !== null){
			switch (lastAdmin.status){
				case 1:
					setMode('login');
					break;
				case 2:
					setMode('register');
					break;
			}
		}
	}, [lastAdmin])

	useEffect(() => {
		switch (mode){
			case 'register':
				setClassNames('adminRegister')
				setArticle(<Register></Register>)
				break;
			case 'login':
				setClassNames('adminLogin')
				setArticle(<Login nickname={lastAdmin!.nickname} setWhoami={setWhoami} setMode={setMode}></Login>)
				break;
			case 'content':
				setClassNames('adminContent')
				setArticle(
					<div className="Format">
						<Identity></Identity>
						<StateTaps></StateTaps>
						<CalendarFormat></CalendarFormat>
						<DiagramFormat></DiagramFormat>
					</div>
				)
				break;
		}
	}, [mode])


	// just for layout testing
	// just for layout testing
	// just for layout testing
	// just for layout testing
	const [ article, SET ]  = useState<any>(null);

	const actLogin = () => { SET(<Login nickname='adf' setWhoami={setWhoami} setMode={setMode}></Login>) }
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
