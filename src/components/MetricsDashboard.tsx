import { useState, useEffect } from 'react';
import { TrendingUp, Activity, Zap, Database } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function MetricsDashboard() {
  const { theme } = useTheme();
  const [metrics, setMetrics] = useState({
    latency: { value: 142, trend: -12 },
    throughput: { value: 98500, trend: 23 },
    uptime: { value: 99.98, trend: 0.5 },
    activeConnections: { value: 1543, trend: 18 },
  });

  const [selectedMetric, setSelectedMetric] = useState('latency');
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        latency: { value: Math.max(100, Math.min(200, prev.latency.value + (Math.random() - 0.5) * 30)), trend: (Math.random() - 0.5) * 50 },
        throughput: { value: Math.max(90000, Math.min(110000, prev.throughput.value + (Math.random() - 0.5) * 5000)), trend: (Math.random() - 0.5) * 50 },
        uptime: { value: Math.min(100, prev.uptime.value + (Math.random() - 0.5) * 0.1), trend: 0 },
        activeConnections: { value: Math.max(1000, Math.min(2000, prev.activeConnections.value + Math.round((Math.random() - 0.5) * 200))), trend: (Math.random() - 0.5) * 50 },
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const baseValue = selectedMetric === 'latency' ? 150 : selectedMetric === 'throughput' ? 100000 : selectedMetric === 'uptime' ? 99.9 : 1500;
    const newData = Array.from({ length: 12 }, () => baseValue + (Math.random() - 0.5) * baseValue * 0.1);
    setChartData(newData);
  }, [selectedMetric]);

  const metricsList = [
    { key: 'latency', label: 'Latency', icon: Zap, unit: 'ms', value: metrics.latency.value, trend: metrics.latency.trend },
    { key: 'throughput', label: 'Throughput', icon: Activity, unit: 'req/s', value: Math.round(metrics.throughput.value), trend: metrics.throughput.trend },
    { key: 'uptime', label: 'Uptime', icon: TrendingUp, unit: '%', value: metrics.uptime.value, trend: metrics.uptime.trend },
    { key: 'activeConnections', label: 'Connections', icon: Database, unit: 'active', value: metrics.activeConnections.value, trend: metrics.activeConnections.trend },
  ];

  const bgLight = theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1A1A1A] border-white/10';
  const textLight = theme === 'light' ? 'text-gray-900' : 'text-white';
  const subTextLight = theme === 'light' ? 'text-gray-600' : 'text-gray-400';

  return (
    <section className={`py-12 sm:py-20 md:py-32 px-4 sm:px-6 ${theme === 'light' ? 'bg-white' : 'bg-[#0A0A0A]'} relative overflow-hidden transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className={`text-5xl md:text-6xl font-light mb-6 tracking-tight ${textLight}`}>
            Live Metrics Dashboard
          </h2>
          <p className={`text-lg font-light max-w-2xl mx-auto ${subTextLight}`}>
            Real-time system performance monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metricsList.map((metric) => {
            const MetricIcon = metric.icon;
            const isPositive = metric.trend >= 0;
            return (
              <button
                key={metric.key}
                onClick={() => setSelectedMetric(metric.key)}
                className={`${bgLight} border rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:border-blue-500 ${
                  selectedMetric === metric.key ? 'ring-2 ring-blue-500 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-500/10'} rounded-xl`}>
                    <MetricIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className={`text-sm font-light ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '+' : ''}{metric.trend.toFixed(1)}%
                  </span>
                </div>
                <div className={`text-3xl font-light mb-2 ${textLight}`}>
                  {typeof metric.value === 'number' && metric.value.toFixed(metric.key === 'uptime' ? 2 : 0)}
                </div>
                <div className={`text-sm font-light ${subTextLight}`}>
                  {metric.label} • {metric.unit}
                </div>
              </button>
            );
          })}
        </div>

        <div className={`${bgLight} border rounded-2xl p-8 transition-colors duration-300`}>
          <h3 className={`text-2xl font-light mb-6 tracking-wide ${textLight}`}>
            {metricsList.find(m => m.key === selectedMetric)?.label} Trend
          </h3>

          <div className="h-64 flex items-end gap-1">
            {chartData.map((value, i) => {
              const maxValue = Math.max(...chartData);
              const minValue = Math.min(...chartData);
              const range = maxValue - minValue || 1;
              const height = ((value - minValue) / range) * 100;

              return (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-80 hover:opacity-100 transition-opacity duration-300 relative group"
                  style={{ height: `${Math.max(5, height)}%` }}
                >
                  <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
                    theme === 'light' ? 'bg-gray-900 text-white' : 'bg-white/10 text-gray-100'
                  }`}>
                    {value.toFixed(0)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`flex justify-between mt-6 pt-6 border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
            <div>
              <div className={`text-sm font-light ${subTextLight}`}>Min</div>
              <div className={`text-lg font-light ${textLight}`}>{Math.min(...chartData).toFixed(0)}</div>
            </div>
            <div>
              <div className={`text-sm font-light ${subTextLight}`}>Avg</div>
              <div className={`text-lg font-light ${textLight}`}>{(chartData.reduce((a, b) => a + b, 0) / chartData.length).toFixed(0)}</div>
            </div>
            <div>
              <div className={`text-sm font-light ${subTextLight}`}>Max</div>
              <div className={`text-lg font-light ${textLight}`}>{Math.max(...chartData).toFixed(0)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
