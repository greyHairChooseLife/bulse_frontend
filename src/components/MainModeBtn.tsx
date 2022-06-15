import React from 'react';
import './MainModeBtn.css';


type SpeakerBtnType = {
	onclickEvent: any
}
export const SpeakerBtn = (props: SpeakerBtnType) => {
	return (
		<button className="SpeakerBtn" type="button" onClick={() => props.onclickEvent('speaker')}>
			speaker
		</button>
	);
}

type ListenerBtnType = {
	onclickEvent: any
}
export const ListenerBtn = (props: ListenerBtnType) => {
	return (
		<button className="ListenerBtn" type="button" onClick={() => props.onclickEvent('listener')}>
			listener
		</button>
	);
}

type ChatterBtnType = {
	onclickEvent: any
}
export const ChatterBtn = (props: ChatterBtnType) => {
	return (
		<button className="ChatterBtn" type="button" onClick={() => props.onclickEvent('chatter')}>
			chatter
		</button>
	);
}

type AdminBtnType = {
	onclickEvent: any
}
export const AdminBtn = (props: AdminBtnType) => {
	return (
		<button className="AdminBtn" type="button" onClick={() => props.onclickEvent('admin')}>
			관리자
		</button>
	);
}
