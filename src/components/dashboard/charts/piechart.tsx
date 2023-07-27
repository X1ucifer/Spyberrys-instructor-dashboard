import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const sample = [1, 10, 30, 50, 70, 90, 100];

export default function PieCharts() {
  return (
    <LineChart
      xAxis={[{ data: sample }]}
      yAxis={[
        { id: 'linearAxis', scaleType: 'linear' },
        { id: 'logAxis', scaleType: 'log' },
      ]}
      series={[
        { yAxisKey: 'linearAxis', data: sample, label: 'Revenue' },
        { yAxisKey: 'logAxis', data: sample, label: 'Views' },
      ]}
      leftAxis="linearAxis"
      rightAxis="logAxis"
      width={600}
      height={450}
    />
  );
}