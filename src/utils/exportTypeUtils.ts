import exportTypeConfig from '../../build/exportTypeConfig';
import { DropdownOption } from '../components/dropdown/Dropdown';
export const exportTypeOptions: DropdownOption[] = exportTypeConfig.map(({ name, folder }) => ({
	value: folder,
	label: name
}));
