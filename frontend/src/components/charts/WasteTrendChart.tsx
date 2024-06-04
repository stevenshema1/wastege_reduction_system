import React from 'react';

interface DataPoint {
    label: string;
    value: number;
}

interface ChartProps {
    data: DataPoint[];
    height?: number;
    color?: string;
}

const WasteTrendChart: React.FC<ChartProps> = ({ data, height = 200, color = '#10B981' }) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);
    const chartWidth = 500;
    const padding = 40;
    
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * (chartWidth - padding * 2) + padding;
        const y = height - (d.value / maxValue) * (height - padding * 2) - padding;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="w-full overflow-hidden bg-white dark:bg-gray-800 rounded-lg p-4">
            <svg viewBox={`0 0 ${chartWidth} ${height}`} className="w-full h-auto">
                {/* Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
                    <line
                        key={i}
                        x1={padding}
                        y1={height - padding - p * (height - padding * 2)}
                        x2={chartWidth - padding}
                        y2={height - padding - p * (height - padding * 2)}
                        stroke="#E5E7EB"
                        strokeDasharray="4"
                        className="dark:stroke-gray-700"
                    />
                ))}
                
                {/* Area Path */}
                <path
                    d={`M${padding},${height - padding} L${points} L${chartWidth - padding},${height - padding} Z`}
                    fill={color}
                    fillOpacity="0.1"
                />
                
                {/* Line Path */}
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                />
                
                {/* Data Points */}
                {data.map((d, i) => {
                    const x = (i / (data.length - 1)) * (chartWidth - padding * 2) + padding;
                    const y = height - (d.value / maxValue) * (height - padding * 2) - padding;
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="white"
                            stroke={color}
                            strokeWidth="2"
                        />
                    );
                })}
            </svg>
            <div className="flex justify-between mt-2 px-8">
                {data.map((d, i) => (
                    <span key={i} className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {d.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default WasteTrendChart;
