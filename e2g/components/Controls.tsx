
import React from 'react';
import type { Coefficients, Point } from '../types';

interface ControlsProps {
  coeffs: Coefficients;
  onCoeffChange: (coeff: keyof Coefficients, value: number) => void;
  roots: number[];
  vertex: Point | null;
}

const Slider: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; min?: number; max?: number; step?: number }> = ({ label, value, onChange, min = -10, max = 10, step = 0.1 }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label htmlFor={label} className="font-medium text-slate-300">{label}</label>
      <span className="bg-slate-700 text-sky-300 text-sm font-mono px-2 py-1 rounded">{value.toFixed(2)}</span>
    </div>
    <input
      id={label}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-sky-400 [&::-moz-range-thumb]:rounded-full"
    />
  </div>
);

const EquationDisplay: React.FC<{ coeffs: Coefficients }> = ({ coeffs }) => {
    const { a, b, c } = coeffs;
    const formatTerm = (val: number, unit: string, isFirst: boolean) => {
        if (val === 0) return '';
        const sign = val > 0 ? (isFirst ? '' : '+ ') : '- ';
        const absVal = Math.abs(val);
        const num = absVal === 1 && unit !== '' ? '' : absVal.toFixed(2).replace(/\.00$/, '');
        return `${sign}${num}${unit} `;
    };

    return (
        <div className="bg-slate-900/70 p-4 rounded-lg text-center my-4 border border-slate-700">
            <h3 className="text-sm text-slate-400 mb-2">Equació</h3>
            <p className="font-mono text-lg sm:text-xl text-sky-300 break-words">
                {formatTerm(a, 'x²', true)}{formatTerm(b, 'x', a === 0)}{formatTerm(c, '', a === 0 && b === 0)}= 0
            </p>
        </div>
    );
};


export const Controls: React.FC<ControlsProps> = ({ coeffs, onCoeffChange, roots, vertex }) => {
  return (
    <div className="flex flex-col h-full">
      <header>
        <h1 className="text-2xl font-bold text-sky-400">Controls de la Paràbola</h1>
        <p className="text-slate-400 mt-1">Ajusta els coeficients per explorar.</p>
      </header>
      
      <EquationDisplay coeffs={coeffs} />

      <div className="space-y-6 mt-4 flex-grow">
        <Slider label="Coeficient 'a'" value={coeffs.a} onChange={(e) => onCoeffChange('a', parseFloat(e.target.value))} />
        <Slider label="Coeficient 'b'" value={coeffs.b} onChange={(e) => onCoeffChange('b', parseFloat(e.target.value))} />
        <Slider label="Coeficient 'c'" value={coeffs.c} onChange={(e) => onCoeffChange('c', parseFloat(e.target.value))} />
      </div>

      <div className="mt-8 pt-6 border-t border-slate-700">
        <h2 className="text-xl font-semibold text-sky-400 mb-3">Propietats</h2>
        <div className="space-y-3 text-slate-300">
          <div className="flex justify-between">
            <span className="font-medium text-emerald-400">Vèrtex (x, y):</span>
            <span className="font-mono">{vertex ? `(${vertex.x.toFixed(2)}, ${vertex.y.toFixed(2)})` : 'N/A'}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="font-medium text-rose-400">Arrels (x):</span>
            <span className="font-mono text-right">
              {roots.length > 0
                ? roots.map(r => r.toFixed(2)).join(', ')
                : (coeffs.a !== 0 ? 'Cap arrel real' : 'N/A')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
