export type URLsState = {
	example: string;
	protocolEnabled: boolean;
	protocolOptions: string;
	hostnameEnabled: boolean;
	hostnameOptions: string;
	pathEnabled: boolean;
	pathOptions: string;
	queryParamsEnabled: boolean;
	queryParamsOptions: string;
}

export type GenerationOptionsType = {
	protocolEnabled: boolean;
	protocolOptions: string[];
	hostnameEnabled: boolean;
	hostnameOptions: string[];
	pathEnabled: boolean;
	pathOptions: string[];
	queryParamsEnabled: boolean;
	queryParamsOptions: string[];
}

export const defaultGenerationOptions = {
	protocolEnabled: true,
	protocolOptions: 'http://,https://',
	hostnameEnabled: true,
	hostnameOptions: 'facebook.com,google.com,instagram.com,bbc.co.uk,guardian.co.uk,nytimes.com,cnn.com,youtube.com,wikipedia.org,netflix.com,twitter.com,whatsapp.com,zoom.us,reddit.com,naver.com,pinterest.com,yahoo.com,baidu.com,walmart.com,ebay.com',
	pathEnabled: false,
	pathOptions: 'one,sub/cars,group/9,site,en-us,en-ca,fr,settings,sub,user/110',
	queryParamsEnabled: false,
	queryParamsOptions: 'search=1,page=1&offset=1,q=test,client=g,ad=115,gi=100,p=8,ab=441&aad=2,g=1,str=se,k=0,q=4,q=11,q=0,search=1&q=de'
};

export const initialState: URLsState = {
	example: '',
	...defaultGenerationOptions
};
