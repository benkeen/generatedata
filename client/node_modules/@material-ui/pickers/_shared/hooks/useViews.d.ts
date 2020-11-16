import * as React from 'react';
import { PickerView } from '../../Picker/Picker';
import { MaterialUiPickersDate } from '../../typings/date';
export declare function useViews(views: PickerView[], openTo: PickerView, onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void): {
    handleChangeAndOpenNext: (date: MaterialUiPickersDate, isFinish?: boolean | undefined) => void;
    openView: "date" | "year" | "month" | "hours" | "minutes" | "seconds";
    setOpenView: React.Dispatch<React.SetStateAction<"date" | "year" | "month" | "hours" | "minutes" | "seconds">>;
};
