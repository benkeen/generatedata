import * as React from 'react';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Chip from '@material-ui/core/Chip';
import styles from './ActivityPacketsList.scss';
import { Cell, Pie, PieChart } from 'recharts';
import { Tooltip } from '~components/tooltips';
import { getPercentageLabel } from './generation.helpers';

export type ActivePacketList = {
	packetId: string;
	label: string;
	percentage: number;
	isPaused: boolean;
	numRowsToGenerate: number;
};

export type ActivePacketsListProps = {
	packetList: ActivePacketList[];
	openPacket: (packetId: string) => void;
};

const ActivePacketsList = ({ packetList, openPacket }: ActivePacketsListProps): JSX.Element => {
	const chips = packetList.map(({ packetId, label, percentage, numRowsToGenerate, isPaused }, index) => {
		const color = isPaused ? 'default' : 'primary';
		const pieChartData = [
			{ value: percentage, color: '#003300' },
			{ value: 100 - percentage, color: '#dddddd' }
		];

		// expand with expected time
		const tooltipContent = `${getPercentageLabel(percentage, numRowsToGenerate)}% complete`;

		let icon = <CheckCircle />;
		if (percentage < 100) {
			icon = (
				<PieChart width={28} height={28}>
					<Pie
						dataKey="value"
						stroke=""
						isAnimationActive={true}
						data={pieChartData}
						outerRadius="100%"
						startAngle={90}
						endAngle={-270}
						paddingAngle={0}>
						{pieChartData.map((entry, index) => <Cell key={index} fill={pieChartData[index].color} />)}
					</Pie>
				</PieChart>
			);
		}

		return (
			<Tooltip key={index} title={<span dangerouslySetInnerHTML={{ __html: tooltipContent }} />} arrow>
				<Chip
					size="medium"
					label={
						<span className={styles.chipLabel}>
							<span>{label}</span>
							{icon}
						</span>
					}
					className={styles.chip}
					clickable
					color={color}
					onClick={(): void => openPacket(packetId)}
					variant="outlined"
					style={{ marginLeft: 10 }}
				/>
			</Tooltip>
		);
	});

	return (
		<div>
			{chips}
		</div>
	);
};

export default ActivePacketsList;
