import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const estados = [
  { label: 'Pendiente', value: 'PENDING', color: 'border-yellow-400 text-yellow-600', dot: 'bg-yellow-400' },
  { label: 'En proceso', value: 'PROCESSING', color: 'border-blue-400 text-blue-600', dot: 'bg-blue-400' },
  { label: 'Completado', value: 'COMPLETED', color: 'border-cyan-400 text-cyan-600', dot: 'bg-cyan-400' },
  { label: 'Cancelado', value: 'CANCELLED', color: 'border-pink-400 text-pink-600', dot: 'bg-pink-400' },
  { label: 'Todos', value: 'ALL', color: 'border-purple-400 text-purple-600', dot: 'bg-purple-400' },
];

// Datos simulados por semana y estado (máximo 20)
const ventasSimuladas = {
  PENDING:   [1, 7, 8, 11, 9, 12, 14],
  PROCESSING: [3, 6, 3, 5, 7, 10, 11],
  COMPLETED: [5, 7, 12, 14, 16, 19, 20],
  CANCELLED: [2, 1, 4, 3, 2, 5, 2],
};

const semanas = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7'];

const colores = {
  PENDING: 'rgba(255, 206, 86, 1)',
  PROCESSING: 'rgba(54, 162, 235, 1)',
  COMPLETED: 'rgba(75, 192, 192, 1)',
  CANCELLED: 'rgba(255, 99, 132, 1)',
};

const bgColores = {
  PENDING: 'rgba(255, 206, 86, 0.2)',
  PROCESSING: 'rgba(54, 162, 235, 0.2)',
  COMPLETED: 'rgba(75, 192, 192, 0.2)',
  CANCELLED: 'rgba(255, 99, 132, 0.2)',
};

const SalesChart = () => {
  const [estado, setEstado] = useState('ALL');
  const [visibleLines, setVisibleLines] = useState({
    PENDING: true,
    PROCESSING: true,
    COMPLETED: true,
    CANCELLED: true,
  });

  const handleToggleLine = (key) => {
    setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  let data;
  if (estado === 'ALL') {
    data = {
      labels: semanas,
      datasets: Object.keys(ventasSimuladas)
        .filter((key) => visibleLines[key])
        .map((key) => ({
          label: estados.find((e) => e.value === key).label,
          data: ventasSimuladas[key],
          borderColor: colores[key],
          backgroundColor: bgColores[key],
          tension: 0.4,
          fill: false,
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 3,
        })),
    };
  } else {
    data = {
      labels: semanas,
      datasets: [
        {
          label: `Pedidos ${estados.find((e) => e.value === estado).label.toLowerCase()}`,
          data: ventasSimuladas[estado],
          borderColor: colores[estado],
          backgroundColor: bgColores[estado],
          tension: 0.4,
          fill: false,
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 3,
        },
      ],
    };
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Ventas semanales',
        font: {
          size: 24,
          family: 'Montserrat, sans-serif',
          weight: 'bold',
        },
        color: '#1e293b',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 20,
        ticks: {
          stepSize: 5,
          color: '#334155',
          font: {
            size: 14,
            family: 'Montserrat, sans-serif',
          },
        },
        title: {
          display: true,
          text: 'Cantidad de ventas',
          color: '#1e293b',
          font: {
            size: 16,
            family: 'Montserrat, sans-serif',
            weight: 'bold',
          },
        },
        grid: {
          color: '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: '#334155',
          font: {
            size: 14,
            family: 'Montserrat, sans-serif',
          },
        },
        title: {
          display: true,
          text: 'Semana',
          color: '#1e293b',
          font: {
            size: 16,
            family: 'Montserrat, sans-serif',
            weight: 'bold',
          },
        },
        grid: {
          color: '#e5e7eb',
        },
      },
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10 border border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Ventas semanales</h2>
      </div>
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {estados.map((op) => (
          <button
            key={op.value}
            onClick={() => setEstado(op.value)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 font-semibold text-base shadow-sm transition-all duration-200
              ${op.color} bg-white hover:bg-slate-50
              ${estado === op.value ? 'ring-2 ring-offset-2 ring-blue-300 scale-105' : ''}`}
          >
            <span className={`inline-block w-3 h-3 rounded-full ${op.dot}`}></span>
            {op.label}
          </button>
        ))}
      </div>
      {estado === 'ALL' && (
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {Object.keys(ventasSimuladas).map((key) => (
            <button
              key={key}
              onClick={() => handleToggleLine(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition font-semibold text-sm shadow-sm
                ${visibleLines[key] ? 'bg-white border-blue-500 text-blue-700' : 'bg-slate-100 border-slate-300 text-slate-400'}
                hover:border-blue-700 hover:text-blue-900`}
              style={{ borderColor: colores[key] }}
            >
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: colores[key] }}
              ></span>
              {estados.find((e) => e.value === key).label}
            </button>
          ))}
        </div>
      )}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesChart; 