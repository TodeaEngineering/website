import { Fragment } from 'react';
import { useTranslations } from 'next-intl';
import FadeIn from '../FadeIn';

type Mark = 'online' | 'onsite' | 'dash';

type Row = {
  key: string;
  marks: [Mark, Mark, Mark];
};

type Category = {
  key: string;
  rows: Row[];
  onDemand?: boolean;
};

// Order: Installation → Technical support → Proactive (included in packages)
//        then Training & Professional services (on-demand, not in packages)
const categories: Category[] = [
  {
    key: 'c1',
    rows: [
      { key: 'r1', marks: ['online', 'onsite', 'onsite'] },
      { key: 'r2', marks: ['online', 'onsite', 'onsite'] },
    ],
  },
  {
    key: 'c2',
    rows: [
      { key: 'r1', marks: ['online', 'online', 'onsite'] },
      { key: 'r2', marks: ['dash', 'onsite', 'onsite'] },
    ],
  },
  {
    key: 'c4',
    rows: [
      { key: 'r1', marks: ['dash', 'online', 'onsite'] },
      { key: 'r2', marks: ['dash', 'dash', 'onsite'] },
    ],
  },
  {
    key: 'c5',
    rows: [
      { key: 'r2', marks: ['dash', 'dash', 'onsite'] },
    ],
  },
  {
    key: 'c3',
    onDemand: true,
    rows: [
      { key: 'r1', marks: ['dash', 'dash', 'dash'] },
      { key: 'r2', marks: ['dash', 'dash', 'dash'] },
    ],
  },
];

function Glyph({ mark }: { mark: Mark }) {
  if (mark === 'online') {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-neutral-400 text-neutral-700 text-[13px]">
        ○
      </span>
    );
  }
  if (mark === 'onsite') {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-[13px]">
        ●
      </span>
    );
  }
  return null;
}

export default function SupportTiers() {
  const t = useTranslations('SupportTiers');
  const tiers = [t('tier_1'), t('tier_2'), t('tier_3')];

  return (
    <section className="py-20 sm:py-24 px-6 border-t border-neutral-100">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-600 uppercase mb-3">
              {t('label')}
            </p>
            <h2 className="text-3xl sm:text-[2.8rem] font-[800] leading-[1.1] tracking-tight mb-5">
              {t('h2')}
            </h2>
            <p className="text-[15px] text-neutral-600 font-light leading-relaxed">{t('desc')}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.04)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left">
                <thead>
                  <tr className="bg-neutral-100/70 border-b border-neutral-200">
                    <th className="px-5 py-4 text-[11px] font-semibold tracking-[.15em] text-neutral-500 uppercase w-[140px]">
                      {t('col_category')}
                    </th>
                    <th className="px-5 py-4 text-[11px] font-semibold tracking-[.15em] text-neutral-500 uppercase w-[200px]">
                      {t('col_item')}
                    </th>
                    <th className="px-5 py-4 text-[11px] font-semibold tracking-[.15em] text-neutral-500 uppercase">
                      {t('col_detail')}
                    </th>
                    {tiers.map((tier) => (
                      <th
                        key={tier}
                        className="px-3 py-4 text-center text-[11px] font-bold tracking-[.1em] text-black uppercase w-[110px]"
                      >
                        {tier}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, ci) => {
                    const firstOnDemandIdx = categories.findIndex((c) => c.onDemand);
                    const isFirstOnDemand = cat.onDemand && ci === firstOnDemandIdx;
                    return (
                      <Fragment key={cat.key}>
                        {isFirstOnDemand && (
                          <tr className="border-b border-neutral-200 bg-neutral-50/80">
                            <td
                              colSpan={6}
                              className="px-5 py-3 text-[11px] font-semibold tracking-[.2em] text-neutral-500 uppercase"
                            >
                              {t('on_demand_heading')}
                            </td>
                          </tr>
                        )}
                        {cat.rows.map((row, ri) => (
                          <tr
                            key={`${cat.key}-${row.key}`}
                            className={`border-b border-neutral-100 last:border-b-0 transition-colors ${
                              cat.onDemand ? 'bg-neutral-50/40 hover:bg-neutral-50' : 'hover:bg-neutral-50/60'
                            }`}
                          >
                            {ri === 0 ? (
                              <td
                                rowSpan={cat.rows.length}
                                className="px-5 py-4 align-top text-[13px] font-bold text-black border-r border-neutral-100"
                              >
                                <div className="flex flex-col gap-1.5">
                                  <span>{t(`${cat.key}_label`)}</span>
                                </div>
                              </td>
                            ) : null}
                            <td className="px-5 py-4 text-[13px] font-semibold text-black">
                              {t(`${cat.key}_${row.key}_item`)}
                            </td>
                            <td className="px-5 py-4 text-[13px] text-neutral-600 font-light leading-relaxed">
                              {t(`${cat.key}_${row.key}_detail`)}
                            </td>
                            {cat.onDemand && ri === 0 ? (
                              <td
                                colSpan={3}
                                rowSpan={cat.rows.length}
                                className="px-3 py-4 text-center align-middle border-l border-neutral-100"
                              >
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[10px] font-semibold tracking-[.15em] uppercase">
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                    <path d="M12 5v14M5 12h14" />
                                  </svg>
                                  {t('on_demand_pill')}
                                </span>
                              </td>
                            ) : cat.onDemand ? null : (
                              row.marks.map((mark, mi) => (
                                <td key={mi} className="px-3 py-4 text-center">
                                  <Glyph mark={mark} />
                                </td>
                              ))
                            )}
                          </tr>
                        ))}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-8 text-[12px] text-neutral-500">
            <div className="flex items-center gap-2">
              <Glyph mark="online" />
              <span>{t('legend_online')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Glyph mark="onsite" />
              <span>{t('legend_onsite')}</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
