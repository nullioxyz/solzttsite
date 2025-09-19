import React from "react";
import MainLayout from "@/Layouts/Site/MainLayout";


import AvailableDesignDetail from "@/Components/Site/AvailableDesign/AvailableDesignDetail";

export default function AvailableDesignShow({
  currentLanguage,
  availableDesign,
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
      metaImage={availableDesign}
    >
    <AvailableDesignDetail
      metatags={metatags}
      currentLanguage={currentLanguage}
      availableDesign={availableDesign}
      />
    </MainLayout>
  );
}
