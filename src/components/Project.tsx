import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const api = axios.create({
	baseURL: `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`,
})
console.log('axios baseURL : ', `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`);

interface IIdentity {
	mobileNumber: number | ''
	name: string
	entered: boolean
}

interface INewProject {
	projectTime: number
	projectHour: number 
	projectSubject: string
	projectKeyword?: string
	projectDescription: string
	bankAccount: number
	bankHost: string
	bankHolderName: string
}

export const Project = () => {

	const [ identity, setIdentity ] = useState<IIdentity>({mobileNumber: '', name: '', entered: false});
	const [ projectList, setProjectList ] = useState<null>(null);
	const [ newProject, setNewProject ] = useState<INewProject>({
		projectTime: 14,
		projectHour: 1,
		projectSubject: '',
		projectDescription: '',
		bankAccount: 0,
		bankHost: '',
		bankHolderName:'' 
	});
	const [ newProjectDate, setNewProjectDate ] = useState<Date>(new Date());

	interface IValidationErrMsg {
		subject: string | null
		description: string | null
		bankAccount: string | null
		bankHost: string | null
		bankHolderName: string | null
	}

	const [ validationErrMsg, setValidationErrMsg ] = useState<IValidationErrMsg>({
		subject: '제목을 입력 해 주세요.',
		description: '상세 설명을 조금만 입력 해 주세요.',
		bankAccount: '계좌번호를 정확히 적어주세요.',
		bankHost: '어떤 은행인지 입력 해 주세요.',
		bankHolderName: '계좌 소유자를 입력 해 주세요.',
	});

	interface IValidationErrCheck {
		subject: boolean
		description: boolean
		bankAccount: boolean
		bankHost: boolean
		bankHolderName: boolean
	}

	const [ validationErrCheck, setValidationErrCheck ] = useState<IValidationErrCheck>({
		subject: true,
		description: true,
		bankAccount: true,
		bankHost: true,
		bankHolderName: true,
	})

	// About IDENTITY
	// 타이핑 할 때마다 setter함수 실행
	const onChangeIdentity = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setIdentity({
			...identity,
			[name]: value,
		});
	};

	// 이름, 전화번호 유효성 확인
	const checkValideIdentity = (name: string, mobileNumber: number | ''): boolean => {
		if(String(mobileNumber).length !== 11){
			alert('11자리 전화번호를 정확히 입력해 주세요.');
			return false;
		}
		let haveNaN = false;
		String(mobileNumber).split('').forEach((ele) => {
			console.log(parseInt(ele));
			if(isNaN(parseInt(ele))) haveNaN = true;
		})
		if(haveNaN !== false){
			alert('숫자만 넣어 주세요.');
			return false;
		}
		if(name.trim() === ''){
			alert('이름을 입력 해 주세요.')
			return false;
		}

		return true;
	};

	// 입력된 이름, 전화번호로 등록된 projectList 받아오기
	const getProjectList = async () => {
		const response = await api.get(`/project/${identity.mobileNumber}/${identity.name}`);
		setProjectList(response.data);
	};

	const identityInput = 
		<div>
			<h2>identity</h2>
			<input placeholder="name" onChange={onChangeIdentity} value={identity.name} name="name"></input>
			<input placeholder="mobile" onChange={onChangeIdentity} value={identity.mobileNumber} name="mobileNumber"></input>
			<button onClick={() => {
				if(checkValideIdentity(identity.name, identity.mobileNumber)){
					getProjectList();
					setIdentity({
						...identity,
						entered: true
					});
					console.log('identity validation success');
				}
			}}>확인</button>
		</div>;

	// 타이핑 할 때마다 setter함수 실행
	const onChangeProject = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setNewProject({
			...newProject,
			[name]: value,
		});
		console.log('kkk: ', validationErrCheck);
	};

	useEffect(() => {
		if(newProject.projectSubject.trim() === ''){
			setValidationErrCheck({
				...validationErrCheck,
				subject: true
			})
		}else{
			setValidationErrCheck({
				...validationErrCheck,
				subject: false
			})
		}

		if(newProject.projectDescription.trim() === ''){
			setValidationErrCheck({
				...validationErrCheck,
				description: true
			})
		}else{
			setValidationErrCheck({
				...validationErrCheck,
				description: false
			})
		}

		let haveNaN = false;
		String(newProject.bankAccount).split('').forEach(ele => {
			if(isNaN(parseInt(ele))) haveNaN = true;
		})
		if(haveNaN !== false || newProject.bankAccount === 0){
			setValidationErrCheck({
				...validationErrCheck,
				bankAccount: true
			})
		}else{
			setValidationErrCheck({
				...validationErrCheck,
				bankAccount: false
			})
		}

		if(newProject.bankHost.trim() === ''){
			setValidationErrCheck({
				...validationErrCheck,
				bankHost: true
			})
		}else{
			setValidationErrCheck({
				...validationErrCheck,
				bankHost: false
			})
		}

		if(newProject.bankHolderName.trim() === ''){
			setValidationErrCheck({
				...validationErrCheck,
				bankHolderName: true
			})
		}else{
			setValidationErrCheck({
				...validationErrCheck,
				bankHolderName: false
			})
		}
	}, [newProject])

	const onChangeProjectCheckErr = (index: string) => {
		switch(index){
			case 'subject':
				if(newProject.projectSubject.trim() === ''){
					setValidationErrCheck({
						...validationErrCheck,
						subject: true
					})
					console.log('subject wrong');
				}else{
					setValidationErrCheck({
						...validationErrCheck,
						subject: false
					})
					console.log('subject fine');
				}
				break;
			case 'description':
				if(newProject.projectDescription.trim() === ''){
					setValidationErrCheck({
						...validationErrCheck,
						description: true
					})
					console.log('description wrong');
				}else{
					setValidationErrCheck({
						...validationErrCheck,
						description: false
					})
					console.log('description fine');
				}
				break;
			case 'bankAccount':
				let haveNaN = false;
				String(newProject.bankAccount).split('').forEach(ele => {
					if(isNaN(parseInt(ele))) haveNaN = true;
				})
				if(haveNaN !== false || newProject.bankAccount === 0){
					setValidationErrCheck({
						...validationErrCheck,
						bankAccount: true
					})
				}else{
					setValidationErrCheck({
						...validationErrCheck,
						bankAccount: false
					})
				}
				break;
			case 'bankHost':
				if(newProject.bankHost.trim() === ''){
					setValidationErrCheck({
						...validationErrCheck,
						bankHost: true
					})
				}else{
					setValidationErrCheck({
						...validationErrCheck,
						bankHost: false
					})
				}
				break;
			case 'bankHolderName':
				if(newProject.bankHolderName.trim() === ''){
					setValidationErrCheck({
						...validationErrCheck,
						bankHolderName: true
					})
				}else{
					setValidationErrCheck({
						...validationErrCheck,
						bankHolderName: false
					})
				}
				break;
			default :
				console.log('wrong string');
		}
	}

//			<button onClick={async () => {
//				const form: {sanitizing: ISanitizeNewProject, posting: IPostNewProject} = {
//					sanitizing: {
//						keyword: newProject.projectKeyword,
//					},
//					posting: {
//						readyToPost: false,
//						identity: identity,
//						newProject: newProject,
//						newProjectDate: newProjectDate
//					}
//				}
//				console.log('validaty confirmed');
//				sanitizeProjectInput(form.sanitizing).then(() => console.log(newProject))
//			}}>신청완료</button>

	//
	// 적절한 형식으로 변환
	interface ISanitizeNewProject {
		keyword?: string
	}
	const sanitizeProjectInput = async (form: ISanitizeNewProject) => {
		const {keyword} = form;
		let sanitized;
		if(keyword !== undefined){
			sanitized = keyword.split(',').map(ele => {return ele.trim()}).join(', ');
		}
		setNewProject({
			...newProject,
			projectKeyword: sanitized
		});
	}
	
	// 
	interface IPostNewProject {
		readyToPost: boolean
		identity: IIdentity
		newProject: INewProject
		newProjectDate: Date
	}
	// 입력된 이름, 전화번호로 등록된 projectList 받아오기
	// const postNewProject = () => { api.post() }

	const projectInput =
		<div>
			<h2>about Project</h2>
			<Calendar defaultValue={new Date()} minDate={new Date()} onChange={setNewProjectDate} value={newProjectDate}></Calendar>
			<select size={1} onChange={onChangeProject} name="projectTime">
				<option value="14">오후 2시</option>
				<option value="15">오후 3시</option>
				<option value="16">오후 4시</option>
				<option value="17">오후 5시</option>
				<option value="18">오후 6시</option>
				<option value="19">오후 7시</option>
				<option value="20">오후 8시</option>
				<option value="21">오후 9시</option>
				<option value="22">오후 10시</option>
			</select>
			<select size={1} onChange={onChangeProject} name="projectHour">
				<option value="1">1시간</option>
				<option value="2">2시간</option>
			</select>
			<input type="text" placeholder="projectSubject" onChange={(e)=>{onChangeProject(e); onChangeProjectCheckErr('subject')}} name="projectSubject"></input>
			<label>{validationErrMsg.subject}</label>

			<input type="text" placeholder="projectKeyword" onChange={(e)=>{onChangeProject(e);}} name="projectKeyword"></input>

			<textarea placeholder="projectDescription" onChange={(e)=>{onChangeProject(e); onChangeProjectCheckErr('description')}} name="projectDescription"></textarea>
			<label>{validationErrMsg.description}</label>

			<h2>about Bank</h2>
			<input type="text" placeholder="bankAccount" onChange={(e)=>{onChangeProject(e); onChangeProjectCheckErr('bankAccount')}} name="bankAccount"></input>
			<label>{validationErrMsg.bankAccount}</label>

			<input type="text" placeholder="bankHost" onChange={(e)=>{onChangeProject(e); onChangeProjectCheckErr('bankHost')}} name="bankHost"></input>
			<label>{validationErrMsg.bankHost}</label>

			<input type="text" placeholder="bankHolderName" onChange={(e)=>{onChangeProject(e); onChangeProjectCheckErr('bankHolderName')}} name="bankHolderName"></input>
			<label>{validationErrMsg.bankHolderName}</label>

			<button onClick={() => {
				console.log('clicked');
				console.log('how is it?: ', validationErrCheck);
			}}>신청완료</button>
		</div>;

	return (
		<div className="projectBoard">
			{identity.entered ? null : identityInput}
			{identity.entered ? <div>[{projectList}]</div> : null}
			{!identity.entered ? projectInput : null}
		</div>
	);
}
