import React from "react";
import MainLayout from "@/Layouts/Site/MainLayout";
import WorkDetail from "@/Components/Site/Works/WorkDetail";

export default function AvailableDesignShow({
  currentLanguage,
  portfolio,
  metatags,
  languages,
  defaultLang,
  social,
}) {

  return (
    <MainLayout
      languages={languages}
      defaultLang={defaultLang}
      social={social}
      metatags={metatags}
      currentLanguage={currentLanguage}
      metaImage={portfolio}
    >
    <WorkDetail
      metatags={metatags}
      currentLanguage={currentLanguage}
      portfolio={portfolio}
      />
    </MainLayout>
  );
}
