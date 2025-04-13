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

export default function Form({ currentLanguage, criativeProcessTranslation, considerationTranslation, paymentMethodTranslation }) {
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
    <div className="form lg:mt-20 md:mt-10">
      <form id="contactForm">
        <div>
          {stepIndex === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-xl text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: criativeProcessTranslation.description }} />

              <div className="text-xl text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: considerationTranslation.description }} />

              <div className="text-xl text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: paymentMethodTranslation.description }} />

              <button
                onClick={() => setStepIndex(1)}
                className="mt-4 bg-black text-white px-4 py-2 rounded"
              >
                {t('btnStart')}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={steps[stepIndex].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <InputLabel
                htmlFor={steps[stepIndex].question}
                value={steps[stepIndex].question}
                className='block tracking-wide text-xl font-bold mb-2'
              />

              <div className="w-full">
                {steps[stepIndex].id == 'tattooIdea' ? (
                  <div className="mt-2">
                    <TextArea
                      id="tatto-idea"
                      name="idea"
                      rows="10"
                      value={data.tattoo_idea}
                      className={`block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 ${errors.tattoo_idea ? 'border-red-500' : ''}`}
                      onChange={(e) => setData(prevData => ({ ...prevData, tattoo_idea: e.target.value }))}

                    />
                  </div>
                ) : null}

                {steps[stepIndex].id == 'references' ? (
                  <div className="mt-2">
                    <TextArea
                      id="references"
                      name="references"
                      rows="3"
                      value={data.references}
                      className={`block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 ${errors.references ? 'border-red-500' : ''}`}
                      onChange={(e) => setData(prevData => ({ ...prevData, references: e.target.value }))}
                      />
      
                      {selectedReferences.length ? (
                        <Attachments />
                      ) : null}
                  </div>
                ) : null}

                {steps[stepIndex].id == 'size' ? (
                  <div className="space-y-6 mb-5">
                    {Object.entries(sizeOptions).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-x-3">
                        <InputRadio
                          id={key}
                          name="size"
                          type="radio"
                          value={key}
                          checked={key == data.size}
                          usedefaultclass={true}
                          onChange={(e) => setData(prevData => ({ ...prevData, size: e.target.value }))}
                        />
                        <label htmlFor={key} className="block text-lg font-medium leading-6">
                          {value}
                        </label>
                      </div>
                    ))}
      
                    {errors.size &&
                      <p className="text-[#7d3636] text-lg italic">{errors.size}</p>
                    }
                  </div>
                ) : null}

                {steps[stepIndex].id == 'bodyPart' ? (
                  <TextInput
                    usedefaultclass={false}
                    className="appearance-none text-gray-900 block w-full border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    value={data.body_location}
                    placeholder={t("Arm, Forearm")}
                    onChange={(e) => setData(prevData => ({ ...prevData, body_location: e.target.value }))}
                  />
                ) : null}

                {steps[stepIndex].id == 'email' ? (
                  <TextInput
                    usedefaultclass={false}
                    className="appearance-none text-gray-900 block w-full border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder={t("email@email.com")}
                    value={data.email}
                    onChange={(e) => setData(prevData => ({ ...prevData, email: e.target.value }))}
                  />
                ) : null}

                {steps[stepIndex].id == 'phone' ? (
                  <PhoneInput
                    country={countryPhone}
                    value={data.phone}
                    onChange={(phone) => setData(prevData => ({ ...prevData, phone }))}
                    inputProps={{
                      className: "appearance-none text-gray-900 block w-full border py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white text-black",
                      placeholder: t("+39 389 748 2409"),
                    }}
                  />
                ) : null}

                {steps[stepIndex].id == 'firstname' ? (
                  <TextInput
                    usedefaultclass={false}
                    className="appearance-none text-gray-900 w- block w-full border py-3 px- mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder={t("Jane")}
                    value={data.firstname}
                    onChange={(e) => setData(prevData => ({ ...prevData, firstname: e.target.value }))}
                  />
                ) : null}

                {steps[stepIndex].id == 'lastname' ? (
                  <TextInput
                    usedefaultclass={false}
                    className="appearance-none text-gray-900 block w-full border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder={t("Joseph")}
                    value={data.lastname}
                    onChange={(e) => setData(prevData => ({ ...prevData, lastname: e.target.value }))}
                  />
                ) : null}


                {steps[stepIndex].id == 'pronouns' ? (
                  <div className="mt-6 space-y-6">
                    {Object.entries(pronounsOpt).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-x-3">
                        <InputRadio
                          id={key}
                          name="pronouns"
                          type="radio"
                          checked={value == data.gender}
                          className="h-4 w-4 border-gray-300 text-[#d3c1b2]"
                          value={value}
                          onChange={(e) => setData(prevData => ({ ...prevData, gender: e.target.value }))}
                        />
                        <label htmlFor={key} className="block text-lg font-medium leading-6">
                          {value}
                        </label>
                      </div>
                    ))}
      
                  </div>
                ) : null}

                {steps[stepIndex].id == 'city' ? (
                  <TextInput
                    usedefaultclass={false}
                    className="appearance-none text-gray-900 block w-full border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    value={data.city}
                    onChange={(e) => setData(prevData => ({ ...prevData, city: e.target.value }))}
                  />
                ) : null}

                {steps[stepIndex].id == 'availability' ? (
                  <div className="mt-2">
                    <TextArea
                      id="availability"
                      name="availability"
                      rows="3"
                      value={data.availability}
                      className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                      onChange={(e) => setData(prevData => ({ ...prevData, availability: e.target.value }))}
                    />
                  </div>
                ) : null}

                {steps[stepIndex].id == 'contact_preference' ? (
                  <div className="space-y-6 mb-5">
                    {contactOptions.map((option) => (
                      <div key={option.id} className="flex items-center gap-x-3">
                        <InputRadio
                          id={option.id}
                          name="contact_me_by"
                          type="radio"
                          value={option.value}
                          usedefaultclass={true}
                          checked={option.value == data.contact_me_by}
                          onChange={(e) => setData({ ...data, contact_me_by: e.target.value })}
                        />
                        <label htmlFor={option.id} className="block text-lg font-medium leading-6">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : null}
              
                {steps[stepIndex].id == 'recaptcha' ? (
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    onChange={(e) => onChangeRecaptcha()}
                  />
                ) : null}
              </div>

              {stepIndex > 1 && (
                <button
                  onClick={handleBack}
                  className="bg-black text-white px-4 py-2 mr-2 rounded"
                >
                  {t('previous')}
                </button>
              )}

              {steps[stepIndex].id == 'recaptcha' ? (
                  <button
                    onClick={(e) => formSubmit(e)}
                    className="mt-4 bg-black text-white px-4 py-2 rounded"
                  >
                    {t('requestquote')}
                  </button>
                ) : 
                
                <button
                  onClick={() => handleNext()}
                  className="mt-4 bg-black text-white px-4 py-2 rounded"
                >
                  {t('next')}
                </button>
              }
              
            </motion.div>
          )}

          {steps[stepIndex].id == 'recaptcha' && data.firstname !== null ? (
            <div id="dataCheck"> 
              <div className="mt-20 max-w-full overflow-hidden space-y-4">
                
                <div className="text-xl break-words flex flex-col">
                  <strong>{t('firstnamePlaceholder')}:</strong>
                  <span>{data.firstname}</span>
                  {errors.firstname &&
                    <p className="text-[#7d3636] text-lg italic">{errors.firstname}</p>
                  }
                </div>

                <div className="text-xl break-words flex flex-col">
                  <strong>{t('lastnamePlaceholder')}:</strong>
                  <span>{data.lastname}</span>
                  {errors.lastname &&
                    <p className="text-[#7d3636] text-lg italic">{errors.lastname}</p>
                  }
                </div>

                <div className="text-xl break-words flex flex-col">
                  <strong>{t('tattoTattoIdeaPlaceholder')}:</strong>
                  <span>{data.tattoo_idea}</span>
                </div>

                <div className="text-xl break-words flex flex-col">
                  <strong>{t('pronouns')}:</strong>
                  <span>{data.gender}</span>
                </div>

                <div className="text-xl break-words flex flex-col">
                  <strong>{t('referencesPlaceholder')}:</strong>
                  <span>{data.references}</span>
                </div>

                <div className="text-xl break-words flex flex-col">
                  <strong>{t('sizePlaceholder')}:</strong>
                  <span>{data.size}</span>
                  {errors.size &&
                    <p className="text-[#7d3636] text-lg italic">{errors.size}</p>
                  }
                </div>

                <div className="text-xl break-words flex flex-col">
                  <strong>{t('body_location')}:</strong>
                  <span>{data.body_location}</span>
                  {errors.body_location &&
                    <p className="text-[#7d3636] text-lg italic">{errors.body_location}</p>
                  }
                </div>

                <div className="text-xl break-words flex flex-col">
                  <strong>{t('email')}:</strong>
                  <span>{data.email}</span>
                  {errors.email &&
                    <p className="text-[#7d3636] text-lg italic">{errors.email}</p>
                  }
                </div>

                <div className="text-xl break-words flex flex-col">
                  <strong>{t('phone')}:</strong>
                  <span>{data.phone}</span>
                  {errors.phone &&
                    <p className="text-[#7d3636] text-lg italic">{errors.phone}</p>
                  }
                </div>

                <div className="text-xl break-words flex flex-col">
                  <strong>{t('cityPlaceholder')}:</strong>
                  <span>{data.city}</span>
                  {errors.city &&
                    <p className="text-[#7d3636] text-lg italic">{errors.city}</p>
                  }
                </div>

                <div className="text-xl break-words flex flex-col">
                  <strong>{t('availabilityPlaceholder')}:</strong>
                  <span>{data.availability}</span>
                  {errors.availability &&
                    <p className="text-[#7d3636] text-lg italic">{errors.availability}</p>
                  }
                </div>

                <div className="text-xl break-words flex flex-col">
                  <strong>{t('contact_preference')}:</strong>
                  <span>{data.contact_me_by}</span>
                </div>

              </div>


              {selectedReferences.length ? (
                <Attachments />
              ) : null}

            </div>
          ) : null}

        </div>
      </form>
    </div>
  )
}