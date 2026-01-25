import { Tooltip } from '@generatedata/shared';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router';
import { Cell, Pie, PieChart } from 'recharts';
import { useClasses } from './ActivePacketsList.styles';
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
  openPacket: (packetId: string, navigate: any) => void;
};

const ActivePacketsList = ({ packetList, openPacket }: ActivePacketsListProps) => {
  const navigate = useNavigate();
  const classNames = useClasses();

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
            isAnimationActive={false}
            data={pieChartData}
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
          >
            {pieChartData.map((_entry, index) => (
              <Cell key={index} fill={pieChartData[index].color} />
            ))}
          </Pie>
        </PieChart>
      );
    }

    return (
      <Tooltip key={index} title={<span dangerouslySetInnerHTML={{ __html: tooltipContent }} />} arrow>
        <Chip
          size="medium"
          label={
            <span className={classNames.chipLabel}>
              <span>{label}</span>
              {icon}
            </span>
          }
          className={classNames.chip}
          clickable
          color={color}
          onClick={(): void => openPacket(packetId, navigate)}
          variant="outlined"
          style={{ marginLeft: 10 }}
        />
      </Tooltip>
    );
  });

  return <div className={classNames.root}>{chips}</div>;
};

export default ActivePacketsList;
