import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

import MainLayout from '@/Layouts/Site/MainLayout';
import {
  claimContactSuccess,
  trackActionEvent,
  trackLeadConversion,
} from '@/helpers/tracking';

const particleCount = 200;
const confettiDefaults = { origin: { y: 0.7 } };
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function fire(particleRatio, options) {
  confetti({
    ...confettiDefaults,
    ...options,
    particleCount: Math.floor(particleCount * particleRatio),
  });
}

function celebrateSuccess() {
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

function SuccessContent({ currentLanguage, success }) {
  const { t } = useTranslation();
  const hasHandledSuccess = useRef(false);

  useEffect(() => {
    window.localStorage.removeItem('contactForm');

    if (
      hasHandledSuccess.current
      || !success?.celebrate
      || !claimContactSuccess(success.completion_id)
    ) {
      return;
    }

    hasHandledSuccess.current = true;
    const trackingPayload = success.tracking || {};

    trackActionEvent('contact_form_submitted', trackingPayload);
    trackLeadConversion(trackingPayload, success.event_id || null);
    celebrateSuccess();

    Toast.fire({
      icon: 'success',
      title: t("Soon I'll be in touch to discuss about your project"),
    });
  }, [success, t]);

  return (
    <section className="mx-auto flex min-h-[55vh] w-full max-w-[900px] items-center justify-center px-5 py-16 text-center">
      <div className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-12 shadow-sm md:px-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl text-emerald-600">
          ✓
        </div>
        <h1 className="text-3xl tracking-tight text-[#595954] md:text-4xl">
          {t('contact_success_title')}
        </h1>
        <p className="mx-auto mt-5 max-w-[650px] text-base leading-7 text-[#747474] md:text-lg">
          {t('contact_success_description')}
        </p>
        <a
          href={route('home.index', { locale: currentLanguage.slug })}
          className="mt-8 inline-flex rounded-full bg-[#595954] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#3f3f3b]"
        >
          {t('contact_success_back_home')}
        </a>
      </div>
    </section>
  );
}

export default function Success({
  languages,
  defaultLang,
  currentLanguage,
  social,
  metatags,
  metaImage,
  success,
}) {
  return (
    <MainLayout
      languages={languages}
      defaultLang={defaultLang}
      social={social}
      metatags={metatags}
      currentLanguage={currentLanguage}
      metaImage={metaImage}
    >
      <SuccessContent currentLanguage={currentLanguage} success={success} />
    </MainLayout>
  );
}
