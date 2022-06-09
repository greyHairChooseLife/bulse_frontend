import React, { useState, useEffect } from 'react';
import { IdentityInput, ProjectInput } from './Element';
import './Speak.css';

// TYPE & INTERFACE
interface INewProject {
	registerDate: Date
	identityName: string
	identityMobileNumber: number | ''
	projectDate: Date
	projectTime: number
	projectHour: number 
	projectSubject: string
	projectKeyword?: string
	projectDescription: string
	bankAccount: number
	bankHost: string
	bankHolderName: string
}

export const Speak = () => {

	const initialValues: {initNewProject: INewProject, } = {
		initNewProject: {
			registerDate: new Date(), 
			identityName: '',
			identityMobileNumber: '',
			projectDate: new Date(),
			projectTime: 14,
			projectHour: 1,
			projectSubject: '',
			projectDescription: '',
			bankAccount: 0,
			bankHost: '',
			bankHolderName:'' 
			},
	}

	const [ projectList, setProjectList ] = useState<null>(null);
	const [ newProject, setNewProject ] = useState<INewProject>(initialValues.initNewProject);
	const [ isIdentified, setIsIdentified ] = useState(false);

	useEffect(() => {
		if(projectList !== null) setIsIdentified(true);
	}, [projectList])

	//	그냥 경우에 따라 className바꿔주는 것. 
	useEffect(() => {
		if(isIdentified) setClassNames('speaker_project');
		else setClassNames('speaker_identity');
	}, [isIdentified])

	const identityInput = <IdentityInput newProject={newProject} setNewProject={setNewProject} projectList={projectList} setProjectList={setProjectList}></IdentityInput>;
	const projectInput = <ProjectInput newProject={newProject} setNewProject={setNewProject}></ProjectInput>;

	const [ classNames, setClassNames ] = useState<'speaker_identity' | 'speaker_project'>('speaker_identity');
	return (
		<div className={classNames}>
			{!isIdentified ? identityInput : projectInput}
		</div>
	);
}
