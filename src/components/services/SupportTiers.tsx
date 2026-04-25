import { useTranslations } from 'next-intl';
import FadeIn from '../FadeIn';

const rows = [
  'bestfor',
  'term',
  'coverage',
  'health',
  'onsiteinc',
] as const;

const tierKeys = ['essential', 'professional', 'enterprise'] as const;

const CARD =
  'bg-white rounded-3xl border border-neutral-200/70 overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.03),0_30px_60px_-25px_rgba(15,23,42,0.15)]';
const HAIRLINE = 'border-neutral-200/50';

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
              {tierKeys.map((tierKey, ti) => {
                const bg = ti % 2 === 0 ? 'bg-white' : 'bg-neutral-50/60';
                return (
                  <div key={tierKey} className={`${bg} px-6 py-8`}>
                    <p className="text-[10px] font-bold tracking-[.22em] uppercase text-neutral-400 mb-3">
                      {String(ti + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-[18px] font-bold tracking-tight text-black mb-6">
                      {tiers[ti]}
                    </h3>
                    <div className="space-y-5">
                      {rows.map((row) => (
                        <div key={row}>
                          <p className="text-[10px] font-bold tracking-[.2em] uppercase text-neutral-500 mb-1.5">
                            {t(`${row}_label`)}
                          </p>
                          <p className="text-[13.5px] text-neutral-700 font-light leading-relaxed whitespace-pre-line">
                            {t(`${row}_${tierKey}`)}
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
              <table className="w-full min-w-[960px] text-left">
                <thead>
                  <tr className={`bg-white border-b ${HAIRLINE}`}>
                    <th className="px-6 py-6 align-bottom w-[220px]" />
                    {tiers.map((tier) => (
                      <th key={tier} className="px-5 py-6 align-bottom">
                        <TierLabel label={tier} />
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
                          {t(`${row}_label`)}
                        </td>
                        {tierKeys.map((tierKey) => (
                          <td key={tierKey} className={`px-5 py-5 align-top text-[13.5px] text-neutral-700 font-light leading-relaxed whitespace-pre-line ${divider}`}>
                            {t(`${row}_${tierKey}`)}
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
            {t('term_note')}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
