import { GenerationTemplate } from '~types/general';

export enum GenerationWorkerActionType {
	Generate = 'GENERATE',
	ProcessDataTypesOnly = 'PROCESS_DATA_TYPES_ONLY',
	ProcessExportTypesOnly = 'PROCESS_EXPORT_TYPES_ONLY',
	Pause = 'PAUSE',
	Abort = 'ABORT',
	Continue = 'CONTINUE',
	SetSpeed = 'SET_SPEED'
}

export type GenGenerateAction = {
	data: {
		action: GenerationWorkerActionType.Generate;
		numResults: number;
		batchSize: number;
		speed: number;
		i18n: any;
		template: GenerationTemplate;

		workerResources: any; // TODO
		// unchanged: data.unchanged || {},
	};
};

export type GenPauseAction = {
	data: {
		action: GenerationWorkerActionType.Pause;
	};
}

export type GenAbortAction = {
	data: {
		action: GenerationWorkerActionType.Abort;
	};
}

export type GenContinueAction = {
	data: {
		action: GenerationWorkerActionType.Continue;
	};
}

export type GenSetSpeedAction = {
	data: {
		action: GenerationWorkerActionType.SetSpeed;
		speed: number;
	};
};
