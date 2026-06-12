type Props = { rows: string[][] };

type RowGroup = { rows: string[][]; columns: number };

function splitGroups(rows: string[][]): RowGroup[] {
  const groups: RowGroup[] = [];
  let current: RowGroup | undefined;

  for (const row of rows) {
    const columns = row.length;
    const isHeader = row.some((cell) => /^(no\.?|dn|size|nominal|nps|class|part|item)$/i.test(cell.trim()));
    const compatible = current && (columns === current.columns || (current.columns >= 4 && Math.abs(columns - current.columns) === 1));

    if (!current || (!compatible && (isHeader || current.rows.length >= 2))) {
      current = { rows: [row], columns };
      groups.push(current);
    } else {
      current.rows.push(row);
      current.columns = Math.max(current.columns, columns);
    }
  }

  return groups;
}

function groupTitle(group: RowGroup, index: number) {
  const text = group.rows.slice(0, 2).flat().join(" ").toLowerCase();
  if (/name of part|material|designation|part name/.test(text)) return "Materials & Components";
  if (/dn|size|nps|dimension|weight|face to face/.test(text) || group.columns >= 6) return "Dimensions";
  if (index === 0 && group.columns <= 3) return "General Specifications";
  return "Technical Data";
}

export function ProductSpecifications({ rows }: Props) {
  const groups = splitGroups(rows);
  return <div className="space-y-6">
    {groups.map((group, groupIndex) => {
      const title = groupTitle(group, groupIndex);
      const normalized = group.rows.map((row) => [...row, ...Array(group.columns - row.length).fill("")]);
      const hasHeader = normalized[0]?.some((cell) => /^(no\.?|dn|size|nominal|nps|class|name|material|part|item|pressure|l|d|d1)$/i.test(cell.trim()));
      return <section key={`${title}-${groupIndex}`}>
        <h3 className="mb-3 text-base font-black text-navy">{title}</h3>
        {group.columns <= 3 && !hasHeader
          ? <dl className="grid overflow-hidden border sm:grid-cols-2">{normalized.map((row, i) => <div className="grid grid-cols-[minmax(140px,1fr)_1fr] border-b bg-card last:border-b-0 sm:odd:border-r" key={i}><dt className="bg-muted px-3 py-2 text-xs font-bold text-navy">{row.slice(0, -1).filter(Boolean).join(" — ")}</dt><dd className="px-3 py-2 text-xs text-muted-foreground">{row.at(-1)}</dd></div>)}</dl>
          : <div className="overflow-x-auto border"><table className="w-full min-w-max table-fixed text-xs"><tbody>{normalized.map((row, i) => <tr className={i % 2 ? "bg-muted" : "bg-card"} key={i}>{row.map((cell, j) => <td style={{ minWidth: group.columns > 7 ? 82 : 130 }} className={`${hasHeader && i === 0 ? "bg-primary font-bold text-primary-foreground" : "text-muted-foreground"} border-r px-3 py-2 last:border-r-0`} key={j}>{cell || "—"}</td>)}</tr>)}</tbody></table></div>}
      </section>;
    })}
  </div>;
}
