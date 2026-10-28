import { AlertTriangle, Info } from 'lucide-react';
import type { ContentBlock } from '../types';
import ComparisonChart from './ComparisonChart';
import { BarList } from './MetricCharts';

const Title = ({ children }: { children?: string }) =>
  children ? <h4 className="font-bold text-rose-950 text-sm sm:text-base mb-2">{children}</h4> : null;

export default function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <div>
          <Title>{block.title}</Title>
          <p>{block.text}</p>
        </div>
      );

    case 'callout':
      return (
        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 flex gap-3">
          <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div>
            {block.title && <h4 className="font-bold text-rose-950 mb-1">{block.title}</h4>}
            <p>{block.text}</p>
          </div>
        </div>
      );

    case 'stats':
      return (
        <div>
          <Title>{block.title}</Title>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {block.items.map((s) => (
              <div key={s.label} className="bg-white border border-rose-200 rounded-2xl p-3 text-center">
                <span className="block font-serif font-extrabold text-xl sm:text-2xl text-rose-600">{s.value}</span>
                <span className="text-[11px] text-rose-900/80 leading-tight block mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'comparison':
      return <ComparisonChart {...block} />;

    case 'bars':
      return (
        <figure className="bg-rose-50/40 border border-rose-100 rounded-2xl p-4 sm:p-5 space-y-4">
          <div>
            <h4 className="font-bold text-rose-950 text-sm">{block.title}</h4>
            {block.caption && <figcaption className="text-xs text-rose-800/70 mt-0.5">{block.caption}</figcaption>}
          </div>
          <BarList items={block.items} />
        </figure>
      );

    case 'table':
      return (
        <div>
          <Title>{block.title}</Title>
          <div className="overflow-x-auto rounded-2xl border border-rose-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-rose-50 text-rose-950">
                <tr>
                  {block.columns.map((c) => (
                    <th key={c} className="px-3 py-2 font-bold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className="border-t border-rose-100">
                    {row.map((cell, j) => (
                      <td key={j} className="px-3 py-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'list':
      return (
        <div>
          <Title>{block.title}</Title>
          <ul className="space-y-2">
            {block.items.map((item) => (
              <li key={item} className="flex gap-2">
                {block.tone === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                )}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'references':
      return (
        <div>
          <Title>{block.title ?? 'Referencias'}</Title>
          <ul className="space-y-1.5 text-xs text-rose-800/80">
            {block.items.map((item) => (
              <li key={item} className="pl-3 border-l-2 border-rose-200">{item}</li>
            ))}
          </ul>
        </div>
      );
  }
}
