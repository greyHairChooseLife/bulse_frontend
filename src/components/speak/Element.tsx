import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const api = axios.create({
	baseURL: `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`,
})

const errMsg = {
	mobileNumber: '11자리 숫자만 입력 해 주세요.',
	name: '이름을 입력 해 주세요.',
	subject: '필수 입력란입니다.',
	description: '필수 입력란입니다.',
	bankAccount: '계좌번호를 숫자만 정확히 적어주세요.',
	bankHost: '어떤 은행인지 입력 해 주세요.',
	bankHolderName: '계좌 소유자를 입력 해 주세요.'
}

type IdentityInputType = {
	newProject: any
	setNewProject: any
	projectList: any
	setProjectList: any
}

export const IdentityInput = (props: IdentityInputType) => {

	const [ isMobileNumberErr, setIsMobileNumberErr ] = useState(true);
	const [ isNameErr, setIsNameErr ] = useState(true);

	const [ nameLabelClassName, setNameLabelClassName ] = useState('');
	const [ mobileLabelClassName, setMobileLabelClassName ] = useState('');

	// About IDENTITY
	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		props.setNewProject({
			...props.newProject,
			[name]: value
		})

		switch(name){
			case 'identityName':
				if(value.trim() === ''){
					setNameLabelClassName('');
					setIsNameErr(true);
				}
				else{
					setNameLabelClassName('hideText');
					setIsNameErr(false);
				}
				break;
			case 'identityMobileNumber':
				let haveNaN = false;
				value.split('').forEach((ele) => {
					if(isNaN(parseInt(ele))) haveNaN = true;
				})
				if(haveNaN !== false || value.length !== 11){
					setMobileLabelClassName('');
					setIsMobileNumberErr(true);
				}
				if(haveNaN === false && value.length === 11){
					setMobileLabelClassName('hideText');
					setIsMobileNumberErr(false);
				}
			default:
				console.log('something wrong at Project.tsx');
		}
	}

	// 입력된 이름, 전화번호로 등록된 projectList 받아오기
	const getProjectList = async () => {
		const response = await api.get(`/project/${props.newProject.identityMobileNumber}/${props.newProject.identityName}`);
		props.setProjectList(response.data);
	};

	//	모든 요소가 유효한지 확인
	const isFineIdentity = (): boolean => {
		if(isNameErr === false && isMobileNumberErr === false) return true;
		else return false;
	}

	const identityInput = 
		<form onSubmit={e => {e.preventDefault(); return false;}}>
			<input type="text" placeholder="이름" onChange={onChangeInput} value={props.newProject.identityName} name="identityName"></input>
			<label className={nameLabelClassName}>{errMsg.name}</label>
			<input type="text" placeholder="전화번호" onChange={onChangeInput} value={props.newProject.identityMobileNumber} name="identityMobileNumber" autoComplete="off"></input>
			<label className={mobileLabelClassName}>{errMsg.mobileNumber}</label>
			<button onClick={() => {
				if(isFineIdentity()){
					getProjectList();
				}else{
					//else의 경우를 위한 이벤트는 상시 반응형(?)으로 만들자. 말하자면 errMsg를 띄우기보단 그냥 제출 버튼에 투명도 50%를 먹이면서 클릭 자체가 안되도록 한다던가.
				}
			}}>조회하기</button>
		</form>

	return (
		<div className="identityInput">
			{identityInput}
		</div>
	);
}

type projectInputType = {
	newProject: any
	setNewProject: any
}

export const ProjectInput = (props: projectInputType) => {

	const initialValues = {
		classNames: {
			subject: '',
			description: '',
			bankAccount: '',
			bankHost: '',
			bankHolderName: ''
		}
	}

	//	조건부로 부여해서 유저가 유효성 검사 결과를 즉시 확인
	const [ classNames, setClassNames ] = useState(initialValues.classNames);
	//	왜인지 모르겠으나 객체로 만들면 잘 작동하지 않는다.
	const [ isSubjectErr, setIsSubjectErr ] = useState<boolean>(true);
	const [ isDescriptionErr, setIsDescriptionErr ] = useState<boolean>(true);
	const [ isBankAccountErr, setIsBankAccountErr ] = useState<boolean>(true);
	const [ isBankHostErr, setIsBankHostErr ] = useState<boolean>(true);
	const [ isBankHolderNameErr, setIsBankHolderNameErr ] = useState<boolean>(true);
	//	npm모듈 사용하느라 어쩔 수 없이 새로 만듦
	const [ newProjectDate, setNewProjectDate ] = useState<Date>(new Date());
	useEffect(() => {
		props.setNewProject({
			...props.newProject,
			projectDate: newProjectDate
		})
	}, [newProjectDate])

	//	모든 요소가 유효한지 확인
	const onClickIsFineNewProject = (): boolean => {
		if(isSubjectErr === false && isDescriptionErr === false && isBankAccountErr === false && isBankHostErr === false && isBankHolderNameErr === false) return true;
		else return false;
	}

	// 타이핑 할 때마다 setter함수 실행
	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		props.setNewProject({
			...props.newProject,
			[name]: value,
		});
		//	에러메시지 핸들링
		switch (name){
			case 'projectSubject':
				if(value.trim() !== ''){
					setIsSubjectErr(false);
					setClassNames({
						...classNames,
						subject: 'hideText'
					})
				}
				else{
					setIsSubjectErr(true);
					setClassNames({
						...classNames,
						subject: ''
					})
				}
				break;
			case 'projectDescription':
				if(value.trim() !== ''){
					setIsDescriptionErr(false);
					setClassNames({
						...classNames,
						description: 'hideText'
					})
				}
				else{
					setIsDescriptionErr(true);
					setClassNames({
						...classNames,
						description: ''
					})
				}
				break;
			case 'bankAccount':
				let haveNaN = false;
				value.split('').forEach(ele => {
					if(isNaN(parseInt(ele))) haveNaN = true;
				})
				if(haveNaN !== false || parseInt(value) === 0){
					setIsBankAccountErr(true);
					setClassNames({
						...classNames,
						bankAccount: ''
					})
				}
				else{
					setIsBankAccountErr(false);
					setClassNames({
						...classNames,
						bankAccount: 'hideText'
					})
				}
				break;
			case 'bankHost':
				if(value.trim() !== ''){
					setIsBankHostErr(false);
					setClassNames({
						...classNames,
						bankHost: 'hideText'
					})
				}
				else{
					setIsBankHostErr(true);
					setClassNames({
						...classNames,
						bankHost: ''
					})
				}
				break;
			case 'bankHolderName':
				if(value.trim() !== ''){
					setIsBankHolderNameErr(false);
					setClassNames({
						...classNames,
						bankHolderName: 'hideText'
					})
				}
				else{
					setIsBankHolderNameErr(true);
					setClassNames({
						...classNames,
						bankHolderName: ''
					})
				}
				break;
		}
	};

	// 적절한 형식으로 변환
	const sanitizeProjectInput = (keyword?: string) => {
		let sanitized;
		if(keyword !== undefined){
			sanitized = keyword.split(',').map(ele => {return ele.trim()}).join(', ');
			props.setNewProject({
				...props.newProject,
				projectKeyword: sanitized
			});
		}
	}

	const projectInput = {
		formSubmit: 
			<div className="projectInput_formSubmit">
				<form onSubmit={e => {
					e.preventDefault();
					if(!onClickIsFineNewProject()){
						//	이 경우를 위한 이벤트는 상시 반응형(?)으로 만들자. 말하자면 errMsg를 띄우기보단 그냥 제출 버튼에 투명도 50%를 먹이면서 클릭 자체가 안되도록 한다던가.
						alert('잘 입력 해줘요!!');
						return false;
					}else{
						const result = api.post(`project`, props.newProject);
					}
				}}>
					<button type="submit">신청완료</button>
				</form>
			</div>,
		dateTime: 
			<div className="projectInput_dateTime">
				<label>날짜 선택</label>
				<Calendar className="project_calendar" defaultValue={new Date()} minDate={new Date()} onChange={setNewProjectDate} value={newProjectDate}></Calendar>
				<label>시작 시간</label>
				<select size={1} onChange={onChangeInput} name="projectTime">
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
				<label>진행 시간</label>
				<select size={1} onChange={onChangeInput} name="projectHour">
					<option value="1">1시간</option>
					<option value="2">2시간</option>
				</select>
			</div>,
		bank:
			<div className="projectInput_bank">
				<input type="text" placeholder="계좌번호" onChange={onChangeInput} name="bankAccount"></input>
				<label className={classNames.bankAccount}>{errMsg.bankAccount}</label>
				<input type="text" placeholder="은행이름" onChange={onChangeInput} name="bankHost"></input>
				<label className={classNames.bankHost}>{errMsg.bankHost}</label>
				<input type="text" placeholder="계좌소유자" onChange={onChangeInput} name="bankHolderName"></input>
				<label className={classNames.bankHolderName}>{errMsg.bankHolderName}</label>
			</div>,
		project:
			<div className="projectInput_project">
				<h1>제안서</h1>
				<input type="text" placeholder="제목 또는 주제를 써 주세요." onChange={onChangeInput} name="projectSubject"></input>
				<label className={classNames.subject}>{errMsg.subject}</label>
				<input type="text" placeholder="키워드를, 쉼표로, 구분, 해, 써, 주세요." onChange={onChangeInput} onBlur={()=>{sanitizeProjectInput(props.newProject.projectKeyword)}} name="projectKeyword"></input>
				<textarea placeholder="말 할 이야기의 구성을 자유롭게 써 주세요." onChange={onChangeInput} name="projectDescription"></textarea>
				<label className={classNames.description}>{errMsg.description}</label>
			</div>
	}
		

	return (
		<div className="projectInput">
			{projectInput.dateTime}
			{projectInput.bank}
			{projectInput.project}
			{projectInput.formSubmit}
		</div>
	);
}

type projectListType = {
	projectList: any
	setProjectList: any
	whoami: {name: string, mobileNumber: number}
	setMode: any
}
export const ProjectList = (props: projectListType) => {

	const { projectList } = props;
	console.log('sex: ', projectList);

	const onClickNewBtn = () => {
		props.setMode('newProjectInput');
	}

	const identity = 
		<div>
			<p>{props.whoami.name}</p>
			<p>{props.whoami.mobileNumber}</p>
		</div>;

	const tbody = projectList.map((ele: any) => {
		const d = new Date(ele.project_date);
		const formatDate: string = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();

		// <td>{ele.attendee_id}명</td>
		// 이놈 타입이 string인데, 배열을 string으로 만들어서 들어올거다. 그 포맷에 맞춰서 다시 배열로 변환하는 작업을 해 줘야 한다.
	
		// <td>{ele.attendee_message === null? 0 : ele.attendee_message}</td>
		// 이놈도 나중에 mouseOver 이벤트에 팝업 뜨는 방식으로 만들자.

		let confirmatory;
		switch (ele.confirmatory){
			case 1:
				confirmatory = '모집';
				break;
			case 2:
				confirmatory = '확정';
				break;
			case 3:
				confirmatory = '취소';
				break;
			default:
				confirmatory = '대기';
				break;
		}

		return <tr key={ele.id}>
					<td><button>보기/수정</button></td>
					<td>{confirmatory}</td>
					<td>{formatDate}, {ele.project_time}시({ele.project_hour}시간)</td>
					<td>{ele.project_subject}</td>
					<td>{ele.attendee_id === null? 0 : ele.attendee_id} 명</td>
					<td>{ele.visited === null ? 0 : ele.visited} 회</td>
					<td>{ele.attendee_message === null ? 0 : ele.attendee_message} 개</td>
				</tr>
	})

	const tableOfList = 
		<table>
			<thead>
				<tr>
					<th></th>
					<th>상태</th>
					<th>일시</th>
					<th>제목</th>
					<th>참석자</th>
					<th>조회수</th>
					<th>응원</th>
				</tr>
			</thead>
			<tbody>
				{tbody}
			</tbody>
		</table>;

	return (
		<div className="projectList">
			{identity}
			{tableOfList}
			<button onClick={onClickNewBtn}>새로운 제안</button>
		</div>
	);
}
