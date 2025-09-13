import React from "react";
import MainLayout from "@/Layouts/Site/MainLayout";


import AvailableDesignDetail from "@/Components/Site/AvailableDesign/AvailableDesignDetail";
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
    >
    <WorkDetail
      metatags={metatags}
      currentLanguage={currentLanguage}
      portfolio={portfolio}
      />
    </MainLayout>
  );
}
