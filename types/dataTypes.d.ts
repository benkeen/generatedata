export type AnyObject = {
    [key: string]: any;
}

// Data Type <Example /> props
export type ExampleProps = {
    coreI18n: any;
    i18n: any;
    data: any;
    id: string;
    onUpdate: (data: AnyObject) => void;
};

// Data Type <Options /> props
export type OptionsProps = {
    coreI18n: any;
    i18n: any;
    data: any;
    id: string;
    onUpdate: (data: AnyObject) => void;
};

// Data Type <Help /> props
export type HelpProps = {
    coreI18n: any;
    i18n: any;
};

export type GenerationData = {
    rowNum: number;
	rowState: any;
	i18n: any;
    existingRowData: any[];
};

export type DTGenerateReturnType = {
	display: string | number | boolean;
	[key: string]: any;
}