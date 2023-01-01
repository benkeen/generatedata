export type LatLngState = {
	lat: boolean;
	lng: boolean;
};

export type GenerationOptionsType = {
	lat: string;
	lng: string;
}

export const initialState: LatLngState = {
	lat: true,
	lng: true
};

export const defaultGenerationOptions = {};
