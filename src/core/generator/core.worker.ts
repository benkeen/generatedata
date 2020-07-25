const context: Worker = self as any;

context.onmessage = (e: any) => {
	console.log('in core worker.');
};

export {};
