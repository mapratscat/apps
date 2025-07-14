
import React, { useState, useMemo } from 'react';
import type { Coefficients, Point } from './types';
import { EquationGraph } from './components/EquationGraph';
import { Controls } from './components/Controls';

const App: React.FC = () => {
  const [coeffs, setCoeffs] = useState<Coefficients>({ a: 1, b: -2, c: -3 });

  const handleCoeffChange = (coeff: keyof Coefficients, value: number) => {
    setCoeffs(prev => ({ ...prev, [coeff]: value }));
  };

  const { data, roots, vertex } = useMemo(() => {
    const { a, b, c } = coeffs;
    const calculatedData: Point[] = [];
    const minX = -15;
    const maxX = 15;
    const steps = 200;

    for (let i = 0; i <= steps; i++) {
      const x = minX + (i * (maxX - minX)) / steps;
      const y = a * x * x + b * x + c;
      calculatedData.push({ x, y });
    }

    let calculatedRoots: number[] = [];
    let calculatedVertex: Point | null = null;

    if (a !== 0) {
      // Quadratic equation: ax^2 + bx + c
      const discriminant = b * b - 4 * a * c;
      if (discriminant >= 0) {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        calculatedRoots = discriminant === 0 ? [root1] : [root1, root2];
      }
      
      const vertexX = -b / (2 * a);
      const vertexY = a * vertexX * vertexX + b * vertexX + c;
      calculatedVertex = { x: vertexX, y: vertexY };

    } else if (b !== 0) {
        // Linear equation: bx + c
        calculatedRoots = [-c / b];
        calculatedVertex = null; // A line doesn't have a vertex
    } else {
        // Constant: y = c
        calculatedRoots = [];
        calculatedVertex = null;
    }


    return { data: calculatedData, roots: calculatedRoots, vertex: calculatedVertex };
  }, [coeffs]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 lg:p-8 font-sans">
      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-slate-700">
          <Controls 
            coeffs={coeffs} 
            onCoeffChange={handleCoeffChange}
            roots={roots}
            vertex={vertex}
          />
        </div>
        <div className="lg:col-span-2 h-[60vh] lg:h-auto bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-2xl border border-slate-700">
          <EquationGraph data={data} roots={roots} vertex={vertex} />
        </div>
      </main>
      <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>Creat per a visualitzar equacions de 2n grau de forma interactiva.</p>
      </footer>
    </div>
  );
};

export default App;
