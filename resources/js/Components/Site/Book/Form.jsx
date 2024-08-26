import InputLabel from "@/Components/InputLabel";
import InputRadio from "@/Components/InputRadio";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelectReferences } from "@/Contexts/SelectReferencesContext";
import Attachments from "../Components/Attachments/Index";
import { useEffect } from "react";

export default function Form(props) {
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

  const { t } = useTranslation();
  const recaptchaRef = useRef();
  const { selectedReferences, setSelectedReferences } = useSelectReferences();

  
  useEffect(() => {
    if (JSON.stringify(selectedReferences) !== JSON.stringify(data.attachments)) {
      setData(prevData => ({ ...prevData, attachments: selectedReferences }));
    }
  }, [selectedReferences, setData, data.attachments]);

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


  const formSubmit = async (e) => {
    e.preventDefault();

    setData(prevData => ({ ...prevData, attachments: selectedReferences }));

    await new Promise((resolve) => {
      setTimeout(() => resolve(), 0);
    });
    
    const formData = data;
    post(route('contact.store'), {
      data: data,
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        Swal.fire({
          title: "Thank you!",
          text: "Soon I'll be in touch to discuss about your project",
          icon: "success"
        });

        setData([]);
        document.getElementById("contactForm").reset();
        setSelectedReferences([]);
      },
      onError: (errors) => {

      },
    });
  }

  return (
    <div className="form lg:mt-20 md:mt-10 sm:mt-5 p-5">
      <form id="contactForm">
        <div className="flex flex-wrap space-y-5">
          <div className="w-full">
            <InputLabel
              htmlFor='tatto-idea'
              value={t('tattoo_idea')}
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <div className="mt-2">
              <TextArea
                id="tatto-idea"
                name="idea"
                rows="3"
                className={`block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 ${errors.tattoo_idea ? 'border-red-500' : ''}`}
                onChange={(e) => setData(prevData => ({ ...prevData, tattoo_idea: e.target.value }))}

              />
            </div>

            {errors.tattoo_idea &&
              <p className="text-[#7d3636] text-lg italic">{errors.tattoo_idea}</p>
            }
          </div>

          <div className="w-full">
            <InputLabel
              htmlFor='refenrences'
              value={t('references')}
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <div className="mt-2">
              <TextArea
                id="references"
                name="references"
                rows="3"
                className={`block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 ${errors.references ? 'border-red-500' : ''}`}
                onChange={(e) => setData(prevData => ({ ...prevData, references: e.target.value }))}
              />
            </div>

            {errors.references &&
              <p className="text-[#7d3636] text-lg italic">{errors.references}</p>
            }
          </div>

          <div className='w-full'>
            <InputLabel
              htmlFor='size'
              value={t('size')}
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <div className="space-y-6 mb-5">
              {Object.entries(sizeOptions).map(([key, value]) => (
                <div key={key} className="flex items-center gap-x-3">
                  <InputRadio
                    id={key}
                    name="size"
                    type="radio"
                    value={key}
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
          </div>

          <div className="w-full">
            <InputLabel
              htmlFor='part-of-the-body'
              value={t('body_location')}
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <TextInput
              usedefaultclass={false}
              className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Arm, Forearm"
              onChange={(e) => setData(prevData => ({ ...prevData, body_location: e.target.value }))}
            />

            {errors.body_location &&
              <p className="text-[#7d3636] text-lg italic">{errors.body_location}</p>
            }
          </div>

          <hr className="border-1 w-full" />

          <div className="w-full">
            <InputLabel
              htmlFor='email'
              value={t('email')}
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <TextInput
              usedefaultclass={false}
              className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="email@example"
              onChange={(e) => setData(prevData => ({ ...prevData, email: e.target.value }))}
            />

            {errors.email &&
              <p className="text-[#7d3636] text-lg italic">{errors.email}</p>
            }
          </div>

          <div className="w-full">
            <InputLabel
              htmlFor='phone'
              value={t('phone')}
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <TextInput
              usedefaultclass={false}
              className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="+39 389 748 2409"
              onChange={(e) => setData(prevData => ({ ...prevData, phone: e.target.value }))}
            />

            {errors.phone &&
              <p className="text-[#7d3636] text-lg italic">{errors.phone}</p>
            }
          </div>

          <div className="w-full ">
            <InputLabel
              htmlFor='firstname'
              value={t('firstname')}
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <TextInput
              usedefaultclass={false}
              className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Jane"
              onChange={(e) => setData(prevData => ({ ...prevData, firstname: e.target.value }))}
            />

            {errors.firstname &&
              <p className="text-[#7d3636] text-lg italic">{errors.firstname}</p>
            }
          </div>

          <div className="w-full">
            <InputLabel
              htmlFor='lastname'
              value={t('lastname')}
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <TextInput
              usedefaultclass={false}
              className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Pack"
              onChange={(e) => setData(prevData => ({ ...prevData, lastname: e.target.value }))}
            />

            {errors.lastname &&
              <p className="text-[#7d3636] text-lg italic">{errors.lastname}</p>
            }
          </div>

          <div className='w-full'>
            <InputLabel
              htmlFor='pronouns'
              value={t('pronouns')}
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <div className="mt-6 space-y-6">
              {Object.entries(pronounsOpt).map(([key, value]) => (
                <div key={key} className="flex items-center gap-x-3">
                  <InputRadio
                    id={key}
                    name="pronouns"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-[#d3c1b2]"
                    value={value}
                    onChange={(e) => setData(prevData => ({ ...prevData, gender: e.target.value }))}
                  />
                  <label htmlFor={key} className="block text-lg font-medium leading-6">
                    {value}
                  </label>
                </div>
              ))}

              <div className="flex items-center gap-x-3">
                <TextInput
                  usedefaultclass={false}
                  className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="otherPronoun"
                  type="text"
                  placeholder={t('other')}
                  value={data.otherPronoun}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                />
              </div>

            </div>
          </div>

          <div className='w-full'>
            <InputLabel
              htmlFor='city'
              value={t('city')}
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <TextInput
              usedefaultclass={false}
              className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder={t('city')}
              onChange={(e) => setData(prevData => ({ ...prevData, city: e.target.value }))}
            />

            {errors.city &&
              <p className="text-[#7d3636] text-lg italic">{errors.city}</p>
            }
          </div>

          <div className="w-full">
            <InputLabel
              htmlFor='availability'
              value={t('availability')}
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <div className="mt-2">
              <TextArea
                id="availability"
                name="availability"
                rows="3"
                className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                onChange={(e) => setData(prevData => ({ ...prevData, availability: e.target.value }))}
              />
            </div>

            {errors.availability &&
              <p className="text-[#7d3636] text-lg italic">{errors.availability}</p>
            }
          </div>

          <div className='w-full'>
            <InputLabel
              htmlFor='contact_me_by'
              value={t('contact_preference')}
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <div className="space-y-6 mb-5">
              {contactOptions.map((option) => (
                <div key={option.id} className="flex items-center gap-x-3">
                  <InputRadio
                    id={option.id}
                    name="contact_me_by"
                    type="radio"
                    value={option.value}
                    usedefaultclass={true}
                    onChange={(e) => setData({ ...data, contact_me_by: e.target.value })}
                  />
                  <label htmlFor={option.id} className="block text-lg font-medium leading-6">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {selectedReferences.length ? (
            <Attachments />
          ): null}

          <div className="w-full">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Ld72ikqAAAAAAmt1MyYV29nLzR_bVW450-yrWnu"
              onChange={(e) => onChangeRecaptcha()}
            />
          </div>
        </div>

        <div className="w-full mt-10">
          <button
            className="w-full uppercase rounded-md bg-[#272533] px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-[#9a7cae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={(e) => formSubmit(e)}
          >
            {t('requestquote')}
          </button>
        </div>
      </form>
    </div>
  )
}