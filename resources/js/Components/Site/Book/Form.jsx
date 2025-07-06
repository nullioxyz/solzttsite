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
import axios from '@/Services/requests'
import { FiX } from 'react-icons/fi';


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
    captcha_question: null,
    attachments: null,
    files: null,
  });

  const [files, setFiles] = useState([]);

  const [countryPhone, setCountryPhone] = useState('us');

  const { t } = useTranslation();

  const { selectedReferences, setSelectedReferences } = useSelectReferences();

  useEffect(() => {
    setData({ ...data, files });
  }, [files]);


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

  const sizeOptions = t('sizes', { returnObjects: true });
  const pronounsOpt = t('pronouns_opt', { returnObjects: true });

  const contactOptions = [
    { id: 'whatsapp', value: 'WhatsApp', label: 'WhatsApp' },
    { id: 'email', value: 'E-mail', label: 'E-mail' },
    { id: 'any', value: t('all'), label: t('all') },
  ];


  const formSubmit = async (e) => {
    e.preventDefault();

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
        setFiles([]);
        document.getElementById("contactForm").reset();
        setSelectedReferences([]);
      },
      onError: (error) => {
        Toast.fire({
          icon: "warning",
          title: t("Check your information and submit the form again")
        });
      },
    });
  }

  //TODO: FIX THIS.
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "6LcNenErAAAAAJBKpTssnlu_Z66_uvf46nDU_WOF";
  
  return (
    <div className="form">
      <form id="contactForm" onSubmit={(e) => formSubmit(e)} encType="multipart/form-data"      >
        <div className="xl:w-[1240px] lg:w-[1240px] mx-auto space-y-6">
          
          <div className="text-xl text-[#4d4c4c]" dangerouslySetInnerHTML={{ __html: considerationTranslation.description }} />
  
          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("First name")}</label>
            <TextInput
              className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] focus:border-none"
              type="text"
              value={data.firstname}
              onChange={(e) => setData({ ...data, firstname: e.target.value })}
            />
            {errors.firstname && <p className="text-[#7d3636] text-md italic">{errors.firstname}</p>}
          </div>

          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("Last name")}</label>
            <TextInput
              className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] focus:border-none"
              type="text"
              value={data.lastname}
              onChange={(e) => setData({ ...data, lastname: e.target.value })}
            />
            {errors.lastname && <p className="text-[#7d3636] text-md italic">{errors.lastname}</p>}
          </div>
  

          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("Email")}</label>
            <TextInput
              className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] focus:border-none"
              type="text"
              placeholder={t("my@email.com")}
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            {errors.email && <p className="text-[#7d3636] text-md italic">{errors.email}</p>}
          </div>
  
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
            {errors.phone && <p className="text-[#7d3636] text-md italic">{errors.phone}</p>}
          </div>

          <div className="">
            <label className="block text-md text-[#4d4c4c]">{t("Your tattoo idea")}</label>
            <TextArea
              id="tattoo-idea"
              name="idea"
              rows="10"
              value={data.tattoo_idea}
              className={`block w-full rounded-none py-3 px-4 text-[#4d4c4c] border border-gray-300 focus:outline-none focus:ring-0 ${errors.references ? '#7d3636' : ''}`}
              onChange={(e) => setData({ ...data, tattoo_idea: e.target.value })}
            />

            {errors.size && <p className="text-[#7d3636] text-md italic">{errors.size}</p>}
          </div>

          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("Visual references or tattoos (optional) - (max 5)")}</label>
            <input
              type="file"
              name="file_upload"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => {
                const newFiles = Array.from(e.target.files);
                const total = files.length + newFiles.length;
          
                if (total > 5) {
                  Swal.fire({
                    icon: "warning",
                    title: t("You can only upload up to 5 files"),
                  });
                }
          
                const allowedFiles = newFiles.slice(0, 5 - files.length);
                setFiles(prev => [...prev, ...allowedFiles]);
          
                // optional: reset input to allow same file re-selection
                e.target.value = null;
              }}
              className="block w-full text-[#4d4c4c] file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
            />
            {data.files?.map((file, index) => (
              <div key={index}>
                <span>{file.name}</span>
                {errors[`files.${index}`] && (
                  <p className="text-[#7d3636] text-md italic">
                    {errors[`files.${index}`]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-none shadow-sm"
                  >
                    <span className="text-sm text-[#4d4c4c] truncate max-w-[70%]">{file.name}</span>
                    <button
                      type="button"
                      className="text-[#7d3636] hover:underline text-sm"
                      onClick={() => {
                        const updated = [...files];
                        updated.splice(index, 1);
                        setFiles(updated);
                      }}
                    >
                      <FiX size={30} color='#747474' style={{ strokeWidth: 1 }} className="cursor-pointer" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

  
          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("sizePlaceholder")}</label>
            {Object.entries(sizeOptions).map(([key, value]) => (
              <div key={key} className="flex items-center gap-x-3">
                <InputRadio
                  id={key}
                  name="size"
                  value={key}
                  checked={data.size === key}
                  usedefaultclass={false}
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
              usedefaultclass={false}
              type="text"
              placeholder={t("Arm, Forearm")}
              value={data.body_location}
              onChange={(e) => setData({ ...data, body_location: e.target.value })}
            />

            {errors.body_location && <p className="text-[#7d3636] text-md italic">{errors.body_location}</p>}
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
  
          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("cityPlaceholder")}</label>

            <TextInput
              className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] focus:border-none"
              type="text"
              value={data.city}
              onChange={(e) => setData({ ...data, city: e.target.value })}
            />

            {errors.city && <p className="text-[#7d3636] text-md italic">{errors.city}</p>}
          </div>
  
          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("availabilityPlaceholder")}</label>
            <TextArea
              id="availability"
              name="availability"
              rows="3"
              value={data.availability}
              className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] border border-gray-300 focus:outline-none focus:ring-0"

              onChange={(e) => setData({ ...data, availability: e.target.value })}
            />

            {errors.availability && <p className="text-[#7d3636] text-md italic">{errors.availability}</p>}
          </div>
  
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

          <input
            type="text"
            name="company"
            className="hidden"
            autoComplete="off"
          />

          <div className="space-y-3">
            <label className="block text-md text-[#4d4c4c]">{t("captcha_question")}</label>
            <TextInput
              className="block w-full rounded-none py-3 px-4 text-[#4d4c4c] focus:border-none"
              type="text"
              placeholder={t("captcha_question")}
              value={data.captcha_question}
              onChange={(e) => setData({ ...data, captcha_question: e.target.value })}
            />
          </div>

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