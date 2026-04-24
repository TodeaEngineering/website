import { Fragment } from 'react';
import { useTranslations } from 'next-intl';
import FadeIn from '../FadeIn';

type Mark = 'included' | 'preferential' | 'dash';

type Row = {
  key: string;
  marks: [Mark, Mark, Mark];
  credits: 'standard' | 'quote';
};

type Category = {
  key: string;
  rows: Row[];
};

// Installation → Technical support → Proactive → Enablement → Scoped per engagement
const categories: Category[] = [
  {
    key: 'c1',
    rows: [
      { key: 'r1', marks: ['included', 'included', 'included'], credits: 'standard' },
      { key: 'r2', marks: ['included', 'included', 'included'], credits: 'standard' },
    ],
  },
  {
    key: 'c2',
    rows: [
      { key: 'r1', marks: ['included', 'included', 'included'], credits: 'standard' },
      { key: 'r2', marks: ['dash', 'included', 'included'], credits: 'standard' },
    ],
  },
  {
    key: 'c4',
    rows: [
      { key: 'r1', marks: ['dash', 'included', 'included'], credits: 'standard' },
      { key: 'r2', marks: ['dash', 'dash', 'included'], credits: 'standard' },
    ],
  },
  {
    key: 'c6',
    rows: [
      { key: 'r1', marks: ['included', 'included', 'included'], credits: 'standard' },
    ],
  },
  {
    key: 'c5',
    rows: [
      { key: 'r1', marks: ['dash', 'preferential', 'included'], credits: 'quote' },
      { key: 'r2', marks: ['dash', 'preferential', 'included'], credits: 'quote' },
      { key: 'r3', marks: ['dash', 'preferential', 'included'], credits: 'quote' },
    ],
  },
];

// Tier envelope rows
const envelopeRows = [
  'term',
  'products',
  'addproduct',
  'credits',
  'coverage',
  'severity',
];

// Category-grouped zebra banding
const categoryBg = ['bg-white', 'bg-neutral-50/60'];

// Shared tokens
const CARD =
  'bg-white rounded-3xl border border-neutral-200/70 overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.03),0_30px_60px_-25px_rgba(15,23,42,0.15)]';
const HAIRLINE = 'border-neutral-200/50';

function Glyph({ mark }: { mark: Mark }) {
  const wrap = 'inline-flex items-center justify-center w-7 h-7 align-middle';
  if (mark === 'included') {
    return (
      <span className={wrap} role="img" aria-label="Included">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" fill="#111" />
          <path
            d="m8 12 3 3 5-6"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (mark === 'preferential') {
    return (
      <span className={wrap} role="img" aria-label="Available at preferential rate">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#111"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m8 12 3 3 5-6" />
        </svg>
      </span>
    );
  }
  return (
    <span className={wrap} role="img" aria-label="Not available">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d4d4d4"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M6 12h12" />
      </svg>
    </span>
  );
}

function TierLabel({ label }: { label: string }) {
  return (
    <span className="block text-[12px] font-bold tracking-[.22em] uppercase text-neutral-900 whitespace-nowrap">
      {label}
    </span>
  );
}

export default function SupportTiers() {
  const t = useTranslations('SupportTiers');
  const tiers = [t('tier_1'), t('tier_2'), t('tier_3')];
  const tierKeys = ['essential', 'professional', 'enterprise'] as const;
  const creditLabels = {
    standard: t('credits_standard'),
    quote: t('credits_quote'),
  };

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
            <div className="lg:hidden">
              {categories.map((cat, catIdx) => {
                const bg = categoryBg[catIdx % categoryBg.length];
                return (
                  <div
                    key={cat.key}
                    className={`${bg} px-6 py-8 border-b ${HAIRLINE} last:border-b-0`}
                  >
                    <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-500 uppercase mb-5">
                      {t(`${cat.key}_label`)}
                    </p>
                    {/* Shared tier header for the whole category */}
                    <div className="grid grid-cols-3 gap-2 pb-3 mb-6 border-b border-neutral-200/50">
                      {tiers.map((tier, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-bold tracking-[.18em] uppercase text-neutral-400 leading-none text-center"
                        >
                          {tier}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-6">
                      {cat.rows.map((row, ri) => (
                        <div
                          key={row.key}
                          className={ri > 0 ? 'pt-6 border-t border-neutral-200/40' : ''}
                        >
                          <p className="text-[14.5px] font-semibold text-black mb-1.5 leading-snug">
                            {t(`${cat.key}_${row.key}_item`)}
                          </p>
                          <p className="text-[13px] text-neutral-600 font-light leading-relaxed mb-4">
                            {t(`${cat.key}_${row.key}_detail`)}
                          </p>
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            {row.marks.map((mark, mi) => (
                              <div key={mi} className="flex justify-center">
                                <Glyph mark={mark} />
                              </div>
                            ))}
                          </div>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-[10px] font-semibold tracking-[.2em] uppercase text-neutral-400">
                              {t('col_credits_title')}
                            </span>
                            {row.credits === 'standard' ? (
                              <span className="text-[13px] font-semibold text-black tabular-nums tracking-[.05em]">
                                {creditLabels.standard}
                              </span>
                            ) : (
                              <span className="text-[12px] italic text-neutral-500 tracking-wide">
                                {creditLabels.quote}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Desktop table layout */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full min-w-[960px] text-left">
                <thead>
                  <tr className={`bg-white border-b ${HAIRLINE}`}>
                    <th className="px-6 py-5 text-[11px] font-semibold tracking-[.2em] text-neutral-400 uppercase align-bottom w-[160px]">
                      {t('col_category')}
                    </th>
                    <th className="px-6 py-5 text-[11px] font-semibold tracking-[.2em] text-neutral-400 uppercase align-bottom w-[180px]">
                      {t('col_item')}
                    </th>
                    <th className="px-6 py-5 text-[11px] font-semibold tracking-[.2em] text-neutral-400 uppercase align-bottom">
                      {t('col_detail')}
                    </th>
                    {tiers.map((tier) => (
                      <th key={tier} className="px-3 py-5 text-center align-bottom w-[110px]">
                        <TierLabel label={tier} />
                      </th>
                    ))}
                    <th className={`px-5 py-5 text-center align-bottom w-[170px] border-l ${HAIRLINE}`}>
                      <div className="text-[11px] font-semibold tracking-[.2em] text-neutral-400 uppercase leading-tight">
                        {t('col_credits_title')}
                      </div>
                      <div className="mt-1 text-[10px] font-normal tracking-wide text-neutral-400 normal-case">
                        {t('col_credits_sub')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, catIdx) => {
                    const bg = categoryBg[catIdx % categoryBg.length];
                    return (
                      <Fragment key={cat.key}>
                        {cat.rows.map((row, ri) => {
                          const isLastInCat = ri === cat.rows.length - 1;
                          const innerDivider = !isLastInCat ? `border-b ${HAIRLINE}` : '';
                          const catEndDivider = isLastInCat ? `border-b ${HAIRLINE}` : '';
                          return (
                            <tr key={`${cat.key}-${row.key}`} className={`${bg} transition-colors`}>
                              {ri === 0 ? (
                                <td
                                  rowSpan={cat.rows.length}
                                  className={`px-6 py-5 align-top ${catEndDivider}`}
                                >
                                  <span className="text-[13px] font-bold text-black tracking-tight">
                                    {t(`${cat.key}_label`)}
                                  </span>
                                </td>
                              ) : null}
                              <td className={`px-6 py-5 text-[13.5px] font-semibold text-black ${innerDivider || catEndDivider}`}>
                                {t(`${cat.key}_${row.key}_item`)}
                              </td>
                              <td className={`px-6 py-5 text-[13px] text-neutral-600 font-light leading-relaxed ${innerDivider || catEndDivider}`}>
                                {t(`${cat.key}_${row.key}_detail`)}
                              </td>
                              {row.marks.map((mark, mi) => (
                                <td key={mi} className={`px-3 py-5 text-center ${innerDivider || catEndDivider}`}>
                                  <Glyph mark={mark} />
                                </td>
                              ))}
                              <td className={`px-5 py-5 text-center whitespace-nowrap border-l ${HAIRLINE} ${innerDivider || catEndDivider}`}>
                                {row.credits === 'standard' ? (
                                  <span className="inline-block text-[14px] font-semibold text-black tabular-nums tracking-[.05em]">
                                    {creditLabels.standard}
                                  </span>
                                ) : (
                                  <span className="inline-block text-[11px] italic text-neutral-500 tracking-wide">
                                    {creditLabels.quote}
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </Fragment>
                    );
                  })}
                  {/* remove trailing border on the very last row by overriding */}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-[12px] text-neutral-600">
            <span className="inline-flex items-center gap-2">
              <Glyph mark="included" />
              <span>{t('legend_included')}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Glyph mark="preferential" />
              <span>{t('legend_preferential')}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Glyph mark="dash" />
              <span>{t('legend_dash')}</span>
            </span>
          </div>
          <p className="mt-4 text-[12px] text-neutral-500 font-light leading-relaxed">
            {t('onsite_note')}
          </p>
        </FadeIn>

        <FadeIn delay={0.22}>
          <div className="mt-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-600 uppercase mb-3">
                {t('envelope_label')}
              </p>
              <h3 className="text-2xl sm:text-[2rem] font-[800] leading-[1.15] tracking-tight mb-4">
                {t('envelope_h3')}
              </h3>
              <p className="text-[14px] text-neutral-600 font-light leading-relaxed">
                {t('envelope_desc')}
              </p>
            </div>
            <div className={CARD}>
              {/* Mobile stacked layout */}
              <div className="lg:hidden divide-y divide-neutral-200/50">
                {envelopeRows.map((rowKey, rIdx) => {
                  const bg = rIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/60';
                  return (
                    <div key={rowKey} className={`${bg} px-6 py-6`}>
                      <p className="text-[13.5px] font-semibold text-black mb-4 leading-snug">
                        {t(`env_${rowKey}_label`)}
                      </p>
                      <div className="space-y-3">
                        {tierKeys.map((tierKey, ti) => (
                          <div key={tierKey} className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold tracking-[.18em] uppercase text-neutral-400 leading-none">
                              {tiers[ti]}
                            </span>
                            <span className="text-[13px] text-neutral-700 font-light leading-relaxed">
                              {t(`env_${rowKey}_${tierKey}`)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Desktop table layout */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full min-w-[780px] text-left">
                  <thead>
                    <tr className={`bg-white border-b ${HAIRLINE}`}>
                      <th className="px-6 py-5 text-[11px] font-semibold tracking-[.2em] text-neutral-400 uppercase align-bottom w-[220px]">
                        {t('envelope_col_attribute')}
                      </th>
                      {tiers.map((tier) => (
                        <th key={tier} className="px-5 py-5 text-center align-bottom">
                          <TierLabel label={tier} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {envelopeRows.map((rowKey, rIdx) => {
                      const bg = rIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/60';
                      const isLast = rIdx === envelopeRows.length - 1;
                      const divider = !isLast ? `border-b ${HAIRLINE}` : '';
                      return (
                        <tr key={rowKey} className={`${bg} transition-colors`}>
                          <td className={`px-6 py-5 align-top text-[13px] font-semibold text-black ${divider}`}>
                            {t(`env_${rowKey}_label`)}
                          </td>
                          {tierKeys.map((tierKey) => (
                            <td key={tierKey} className={`px-5 py-5 align-top text-[13px] text-neutral-700 font-light leading-relaxed text-center ${divider}`}>
                              {t(`env_${rowKey}_${tierKey}`)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
