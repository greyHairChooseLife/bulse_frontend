import React, { useState, useEffect } from 'react';
import './Element.css';
import axios from 'axios';

const api = axios.create({
	baseURL: `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`,
})

interface IloginProps {
	nickname: string
	setWhoami: any
	setMode: any
}
export const Login = (props: IloginProps) => {

	const onSubmitLogin = async (e: any) => {
		const answer = await api.post('/admin', {proposed: e.target.input.value});
		console.log('obj return as answer: ', answer);
		if(answer.data.msg === 'login success'){
			props.setWhoami(answer.data.value);
			props.setMode('content');
		}else{
			alert(answer.data.msg);
		}
	}

	return (
		<div className="adminElementLogin">
			<p>{props.nickname}님 안녕하세요!!</p>
			<p>로그인 하시면 1시간 동안 유지됩니다.</p>
			<form onSubmit={e => {
				e.preventDefault();
				onSubmitLogin(e);
				}}>
				<input placeholder="로그인 아이디" name="input"></input>
				<button>로그인</button>
			</form>
		</div>
	);
}

export const Register = () => {
	return (
		<div className="adminElementRegister">
			<input placeholder="login_id"></input>
			<input placeholder="login_id again"></input>
			<input placeholder="nickname"></input>
			<button></button>
		</div>
	);
}

export const Identity = () => {
	return (
		<div className="adminElementIdentity">
			<p>//nickname// : welcome, how's it going? :D</p>
			<button>logout</button>
			<button>deregister</button>
		</div>
	);
}

export const StateTaps = () => {
	return (
		<div className="adminElementStateTaps">
			<button>confirm</button>
			<button>pending</button>
			<button>cancel</button>
		</div>
	);
}

export const CalendarFormat = () => {
	return (
		<div className="adminElementCalendarFormat">
			I am a calendar.
		</div>
	);
}

export const DiagramFormat = () => {
	return (
		<div className="adminElementDiagramFormat">
			I am a diagram.
		</div>
	);
}

export const TextTalbeFormat = () => {
	return (
		<div className="adminElementTextTableFormat">
			I am Text Table.
		</div>
	);
}

export const DetailPage = () => {
	return (
		<div className="adminElementDetailPage">
			I am detail Page.
		</div>
	);
}

export const CommentTextarea = () => {
	return (
		<div className="adminElementCommentTextarea">
			I am commoent text area.
		</div>
	);
}

export const PrivateNoteTextarea = () => {
	return (
		<div className="adminElementPrivateNoteTextarea">
			I am private note text area.
		</div>
	);
}

