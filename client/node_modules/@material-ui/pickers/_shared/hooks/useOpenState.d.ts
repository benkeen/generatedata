import { BasePickerProps } from '../../typings/BasePicker';
export declare function useOpenState({ open, onOpen, onClose }: BasePickerProps): {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
};
