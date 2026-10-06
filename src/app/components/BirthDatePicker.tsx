import { useEffect, useRef, useState } from 'react';

interface Props {
  /** Fecha en formato ISO `YYYY-MM-DD` o vacío. */
  value: string;
  /** Callback con la fecha ISO seleccionada (o vacío si incompleta). */
  onChange: (iso: string) => void;
  /** Marca el picker en rojo si el campo está inválido. */
  hasError?: boolean;
}

const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

type Kind = 'day' | 'month' | 'year';

interface DropdownProps {
  kind: Kind;
  label: string;
  value: number | null;
  options: { value: number; label: string }[];
  onSelect: (v: number) => void;
  error?: boolean;
}

function Dropdown({ kind, label, value, options, onSelect, error }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    // Al abrir, scrollear a la opción seleccionada
    const sel = listRef.current?.querySelector<HTMLDivElement>('.bdp-option-selected');
    if (sel) sel.scrollIntoView({ block: 'center' });
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const displayText = value !== null
    ? (options.find(o => o.value === value)?.label ?? label)
    : label;

  return (
    <div
      ref={rootRef}
      className={`bdp-select${open ? ' bdp-open' : ''}${error ? ' bdp-error' : ''}`}
      role="combobox"
      aria-expanded={open}
      aria-label={label}
      data-kind={kind}
    >
      <button type="button" className="bdp-trigger" onClick={() => setOpen(v => !v)}>
        <span className={value !== null ? 'bdp-value' : 'bdp-placeholder'}>{displayText}</span>
        <svg className="bdp-chevron" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="bdp-options" role="listbox" ref={listRef}>
        {options.map(o => (
          <div
            key={o.value}
            role="option"
            aria-selected={o.value === value}
            className={`bdp-option${o.value === value ? ' bdp-option-selected' : ''}`}
            onClick={() => { onSelect(o.value); setOpen(false); }}
          >
            {o.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BirthDatePicker({ value, onChange, hasError }: Props) {
  const today = new Date();
  const anioMax = today.getFullYear() - 18;
  const anioMin = anioMax - 82;

  // State local para preservar selecciones parciales — si `value` es "" y
  // el usuario elige solo "día", tenemos que recordar ese día para que el
  // trigger lo muestre aunque `value` siga vacío hasta que complete los 3.
  const parsed = value ? value.split('-').map(n => parseInt(n, 10)) : [NaN, NaN, NaN];
  const [dia, setDia] = useState<number | null>(isNaN(parsed[2]) ? null : parsed[2]);
  const [mes, setMes] = useState<number | null>(isNaN(parsed[1]) ? null : parsed[1]);
  const [anio, setAnio] = useState<number | null>(isNaN(parsed[0]) ? null : parsed[0]);

  // Si el `value` externo cambia (ej: reset del form), rehidratamos el state
  // local a partir de él.
  useEffect(() => {
    const p = value ? value.split('-').map(n => parseInt(n, 10)) : [NaN, NaN, NaN];
    setAnio(isNaN(p[0]) ? null : p[0]);
    setMes(isNaN(p[1]) ? null : p[1]);
    setDia(isNaN(p[2]) ? null : p[2]);
  }, [value]);

  const emitChange = (nd: number | null, nm: number | null, ny: number | null) => {
    // Actualizamos el state local siempre (para que la UI refleje la
    // selección parcial), y solo emitimos al padre cuando los 3 valores
    // están presentes.
    setDia(nd);
    setMes(nm);
    setAnio(ny);
    if (nd == null || nm == null || ny == null) {
      if (value) onChange('');
      return;
    }
    const diasMes = new Date(ny, nm, 0).getDate();
    const dAjustado = Math.min(nd, diasMes);
    const iso = `${ny}-${String(nm).padStart(2, '0')}-${String(dAjustado).padStart(2, '0')}`;
    onChange(iso);
  };

  const diasEnMesActual = (mes && anio) ? new Date(anio, mes, 0).getDate() : 31;
  const dayOptions = Array.from({ length: diasEnMesActual }, (_, i) => ({ value: i + 1, label: String(i + 1) }));
  const monthOptions = MONTHS.map((n, i) => ({ value: i + 1, label: n }));
  const yearOptions = Array.from({ length: anioMax - anioMin + 1 }, (_, i) => ({
    value: anioMax - i,
    label: String(anioMax - i),
  }));

  return (
    <div className="bdp-picker">
      <Dropdown
        kind="day"
        label="Día"
        value={dia}
        options={dayOptions}
        onSelect={(v) => emitChange(v, mes, anio)}
        error={hasError}
      />
      <Dropdown
        kind="month"
        label="Mes"
        value={mes}
        options={monthOptions}
        onSelect={(v) => emitChange(dia, v, anio)}
        error={hasError}
      />
      <Dropdown
        kind="year"
        label="Año"
        value={anio}
        options={yearOptions}
        onSelect={(v) => emitChange(dia, mes, v)}
        error={hasError}
      />
    </div>
  );
}
