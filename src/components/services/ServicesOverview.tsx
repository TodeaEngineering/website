import { useTranslations } from 'next-intl';
import FadeIn from '../FadeIn';

const rows = [
  'format',
  'duration',
  'bestfor',
  'deliverables',
  'onsite',
] as const;

const cols = ['audit', 'project', 'managed'] as const;

const CARD =
  'bg-white rounded-3xl border border-neutral-200/70 overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.03),0_30px_60px_-25px_rgba(15,23,42,0.15)]';
const HAIRLINE = 'border-neutral-200/50';

function ColLabel({ label }: { label: string }) {
  return (
    <span className="block text-[12px] font-bold tracking-[.22em] uppercase text-neutral-900">
      {label}
    </span>
  );
}

export default function ServicesOverview() {
  const t = useTranslations('ServicesOverview');

  return (
    <section className="py-20 sm:py-28 px-6 border-t border-neutral-100">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-600 uppercase mb-3">
              {t('label')}
            </p>
            <h2 className="text-3xl sm:text-[2.8rem] font-[800] leading-[1.1] tracking-tight mb-5">
              {t('h2')}
            </h2>
            <p className="text-[15px] text-neutral-600 font-light leading-relaxed">
              {t('desc')}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className={CARD}>
            {/* Mobile stacked layout */}
            <div className="lg:hidden divide-y divide-neutral-200/50">
              {cols.map((col, ci) => {
                const bg = ci % 2 === 0 ? 'bg-white' : 'bg-neutral-50/60';
                return (
                  <div key={col} className={`${bg} px-6 py-8`}>
                    <p className="text-[10px] font-bold tracking-[.22em] uppercase text-neutral-400 mb-3">
                      {String(ci + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-[18px] font-bold tracking-tight text-black mb-6">
                      {t(`col_${col}`)}
                    </h3>
                    <div className="space-y-5">
                      {rows.map((row) => (
                        <div key={row}>
                          <p className="text-[10px] font-bold tracking-[.2em] uppercase text-neutral-500 mb-1.5">
                            {t(`row_${row}_label`)}
                          </p>
                          <p className="text-[13.5px] text-neutral-700 font-light leading-relaxed">
                            {t(`row_${row}_${col}`)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop table layout */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full min-w-[1080px] text-left table-fixed">
                <thead>
                  <tr className={`bg-white border-b ${HAIRLINE}`}>
                    <th className="px-6 py-6 align-bottom w-[200px]" />
                    {cols.map((col) => (
                      <th key={col} className="px-6 py-6 align-bottom">
                        <ColLabel label={t(`col_${col}`)} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => {
                    const bg = ri % 2 === 0 ? 'bg-white' : 'bg-neutral-50/60';
                    const isLast = ri === rows.length - 1;
                    const divider = !isLast ? `border-b ${HAIRLINE}` : '';
                    return (
                      <tr key={row} className={`${bg} transition-colors`}>
                        <td className={`px-6 py-5 align-top text-[12px] font-bold tracking-[.18em] uppercase text-neutral-500 ${divider}`}>
                          {t(`row_${row}_label`)}
                        </td>
                        {cols.map((col) => (
                          <td key={col} className={`px-6 py-5 align-top text-[14px] text-neutral-800 font-light leading-relaxed ${divider}`}>
                            {t(`row_${row}_${col}`)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.18}>
          <p className="mt-6 text-[12px] text-neutral-500 font-light leading-relaxed">
            {t('onsite_note')}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
