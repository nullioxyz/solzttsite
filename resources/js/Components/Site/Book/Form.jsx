import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import InputLabel from "@/Components/InputLabel";
import InputRadio from "@/Components/InputRadio";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelectReferences } from "@/Contexts/SelectReferencesContext";
import Attachments from "../Components/Attachments/Index";
import axios from '@/Services/requests';
import { motion } from "framer-motion";


const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export default function Form({ currentLanguage, considerationTranslation }) {
  const [stepIndex, setStepIndex] = useState(0);

  const { data, setData, post, processing, errors, reset } = useForm({
    firstname: null,
    lastname: null,
    email: null,
    email_confirmation: null,
    phone: null,
    contact_me_by: null,
    tattoo_idea: null,
    references: null,
    size: null,
    body_location: null,
    gender: null,
    city: null,
    availability: null,
    recaptcha: null,
    attachments: null
  });

  const [phone, setPhone] = useState('');
  const [countryPhone, setCountryPhone] = useState('us');

  const { t } = useTranslation();

  const recaptchaRef = useRef();
  const { selectedReferences, setSelectedReferences } = useSelectReferences();

  useEffect(() => {
    if (JSON.stringify(selectedReferences) !== JSON.stringify(data.attachments)) {
      setData(prevData => ({ ...prevData, attachments: selectedReferences }));
    }
  }, [selectedReferences, setData, data.attachments]);

  const countryPhoneMapping = {
    'it': 'it',
    'en': 'gb',
    'pt': 'br',
  };

  useEffect(() => {

    const fetchLanguage = async () => {
      try {
        const response = await axios.get(route('site.currentLanguage', { locale: currentLanguage.slug }));

        if (response.status === 200) {
          const mappedCountry = countryPhoneMapping[response.data.lang] || 'us';
          setCountryPhone(mappedCountry);
        }
      } catch (error) {

      }

    };

    fetchLanguage();

  }, [setCountryPhone]);

  const onChangeRecaptcha = (e) => {
    const recaptchaValue = recaptchaRef.current.getValue();

    setData(prevData => ({ ...prevData, recaptcha: recaptchaValue }))
  }

  const sizeOptions = t('sizes', { returnObjects: true });
  const pronounsOpt = t('pronouns_opt', { returnObjects: true });

  const contactOptions = [
    { id: 'whatsapp', value: 'WhatsApp', label: 'WhatsApp' },
    { id: 'email', value: 'E-mail', label: 'E-mail' },
    { id: 'any', value: t('all'), label: t('all') },
  ];


  const steps = [
    { id: "instructions", question: t('instructions'), placeholder: t('instructionsPlaceholder') },
    { id: "tattooIdea", question: t('tattoo_idea'), placeholder: t('tattooIdeaPlaceholder') },
    { id: "bodyPart", question: t('body_location'), placeholder: t('bodyLocationPlaceholder') },
    { id: "size", question: t('size'), placeholder: t('sizePlaceholder') },
    { id: "references", question: t('references'), placeholder: t('referencesPlaceholder') },
    { id: "availability", question: t('availability'), placeholder: t('availability')},
    { id: "firstname", question: t('firstname'), placeholder: t('firstnamePlaceholder') },
    { id: "lastname", question: t('lastname'), placeholder: t('lastnamePlaceholder') },
    { id: "pronouns", question: t('pronouns'), placeholder: t('pronounsPlaceholder') },
    { id: "email", question: t('email'), placeholder: t('emailPlaceholder') },
    { id: "phone", question: t('phone'), placeholder: t('phonePlaceholder') },
    { id: "city", question: t('city'), placeholder: t('cityPlaceholder') },
    { id: "contact_preference", question: t('contact_preference'), placeholder: t('contact_preference')},
    { id: "recaptcha", question: t('data_check_and_recaptcha'), placeholder: t('recaptcha')}
  ];

    const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };


  const formSubmit = async (e) => {
    e.preventDefault();

    if (!data.recaptcha) {
      alert(t('Complete the recaptcha'));
      return;
    }

    post(route('contact.store', { locale: currentLanguage.slug }), {
      data: data,
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        Toast.fire({
          icon: "success",
          title: t("Soon I'll be in touch to discuss about your project")
        });

        setData([]);
        document.getElementById("contactForm").reset();
        setSelectedReferences([]);
      },
      onError: (error) => {
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: t("Check your information and submit the form again")
        });
      },
    });
  }

  //TODO: FIX THIS.
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "6LczDUEqAAAAAKoD4bTeyfKynwGmZZLpw3XU2ekL";

  return (
    <div className="form">
      <form id="contactForm" onSubmit={(e) => formSubmit(e)}>
        <div className="xl:w-[1240px] lg:w-[1240px] mx-auto space-y-6">
          
          <div className="text-xl text-[#4d4c4c]" dangerouslySetInnerHTML={{ __html: considerationTranslation.description }} />
  
          <TextInput
            className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] focus:border-none"
            type="text"
            placeholder={t("First name")}
            value={data.firstname}
            onChange={(e) => setData({ ...data, firstname: e.target.value })}
          />
  
          <TextInput
            className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] focus:border-none"
            type="text"
            placeholder={t("Last name")}
            value={data.lastname}
            onChange={(e) => setData({ ...data, lastname: e.target.value })}
          />

          <TextInput
            className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] focus:border-none"
            type="text"
            placeholder={t("my@email.com")}
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
  
          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("Phone Number")}</label>
            <PhoneInput
              country={countryPhone}
              value={data.phone}
              onChange={(phone) => setData({ ...data, phone })}
              inputProps={{
                className: "block w-full rounded-none py-3 text-[#4d4c4c] focus:border-none",
                placeholder: t("+39 389 748 2409"),
              }}
            />
          </div>

          <TextArea
            id="tattoo-idea"
            name="idea"
            rows="10"
            value={data.tattoo_idea}
            usedefaultclass
            className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] border border-gray-300 focus:outline-none focus:ring-0"

            onChange={(e) => setData({ ...data, tattoo_idea: e.target.value })}
            placeholder={t("tattoTattoIdeaPlaceholder")}
          />
  
          <TextArea
            id="references"
            name="references"
            rows="3"
            value={data.references}
            className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] border border-gray-300 focus:outline-none focus:ring-0"

            onChange={(e) => setData({ ...data, references: e.target.value })}
            placeholder={t("referencesPlaceholder")}
          />
  
          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("sizePlaceholder")}</label>
            {Object.entries(sizeOptions).map(([key, value]) => (
              <div key={key} className="flex items-center gap-x-3">
                <InputRadio
                  id={key}
                  name="size"
                  value={key}
                  checked={data.size === key}
                  usedefaultclass
                  onChange={(e) => setData({ ...data, size: e.target.value })}
                />
                <label htmlFor={key} className="text-md text-[#4d4c4c]">{value}</label>
              </div>
            ))}
            {errors.size && <p className="text-[#7d3636] text-md italic">{errors.size}</p>}
          </div>
  
          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("Place of the tattoo")}</label>
            <TextInput
              className="block w-full rounded-none py-3 px-4 text-[#4d4c4c]"
              usedefaultclass
              type="text"
              placeholder={t("Arm, Forearm")}
              value={data.body_location}
              onChange={(e) => setData({ ...data, body_location: e.target.value })}
            />
          </div>
  
          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("pronouns")}</label>
            {Object.entries(pronounsOpt).map(([key, value]) => (
              <div key={key} className="flex items-center gap-x-3">
                <InputRadio
                  id={key}
                  name="pronouns"
                  type="radio"
                  value={value}
                  checked={data.gender === value}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                />
                <label htmlFor={key} className="text-md text-[#4d4c4c]">{value}</label>
              </div>
            ))}
          </div>
  
          <TextInput
            className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] focus:border-none"
            type="text"
            placeholder={t("cityPlaceholder")}
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
          />
  
          <TextArea
            id="availability"
            name="availability"
            rows="3"
            value={data.availability}
            className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] border border-gray-300 focus:outline-none focus:ring-0"

            onChange={(e) => setData({ ...data, availability: e.target.value })}
            placeholder={t("availabilityPlaceholder")}
          />
  
          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("contact_preference")}</label>
            {contactOptions.map((option) => (
              <div key={option.id} className="flex items-center gap-x-3">
                <InputRadio
                  id={option.id}
                  name="contact_me_by"
                  value={option.value}
                  checked={data.contact_me_by === option.value}
                  onChange={(e) => setData({ ...data, contact_me_by: e.target.value })}
                  usedefaultclass
                />
                <label htmlFor={option.id} className="text-md text-[#4d4c4c]">{option.label}</label>
              </div>
            ))}
          </div>
  
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={onChangeRecaptcha}
          />
  
          {selectedReferences.length > 0 && <Attachments />}
  
          <button
            type="submit"
            className="mt-6 bg-black text-white px-6 py-3 rounded-none"
          >
            {t('requestquote')}
          </button>
        </div>
      </form>
    </div>
  );
}