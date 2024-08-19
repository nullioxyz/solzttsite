import InputLabel from "@/Components/InputLabel";
import InputRadio from "@/Components/InputRadio";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";


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
    recaptcha: null
  });

  const recaptchaRef = useRef();

  const onChangeRecaptcha = (e) => {
    const recaptchaValue = recaptchaRef.current.getValue();
    
    setData(prevData => ({ ...prevData, recaptcha: recaptchaValue }))
  }

  const inputOptions = [
    { id: 'upTo15', value: 'Up to 15cm', label: 'Up to 15cm' },
    { id: '16to20', value: '16cm to 20 cm', label: '16cm to 20 cm' },
    { id: '21to25', value: '21cm to 25 cm', label: '21cm to 25 cm' },
    { id: '26to30', value: '26 cm to 30cm', label: '26 cm to 30cm' },
    { id: 'above30', value: 'Above 30cm', label: 'Above 30cm' }
  ];

  const pronounOptions = [
    { id: 'neuter', value: 'Neuter', label: 'Neuter' },
    { id: 'feminine', value: 'Feminine', label: 'Feminine' },
    { id: 'masculine', value: 'Masculine', label: 'Masculine' },
  ];

  const contactOptions = [
    { id: 'whatsapp', value: 'WhatsApp', label: 'WhatsApp' },
    { id: 'email', value: 'E-mail', label: 'E-mail' },
    { id: 'any', value: 'All options', label: 'All options' },
  ];


  const formSubmit = async (e) => {
    e.preventDefault();

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

        document.getElementById("contactForm").reset();
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
              value='Your tattoo idea'
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
              value='Examples of my portfolio and other references'
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
              value='Size in centimeters'
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <div className="space-y-6 mb-5">
              {inputOptions.map((option) => (
                <div key={option.id} className="flex items-center gap-x-3">
                  <InputRadio
                    id={option.id}
                    name="size"
                    type="radio"
                    value={option.value}
                    usedefaultclass={true}
                    onChange={(e) => setData(prevData => ({ ...prevData, size: e.target.value }))}
                  />
                  <label htmlFor={option.id} className="block text-lg font-medium leading-6">
                    {option.label}
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
              value='Part of the body'
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
              value='Your best e-email'
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
              value='Telephone number'
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
              value='First name'
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
              value='Last name'
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
              value='What are your pronouns?'
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <div className="mt-6 space-y-6">
              {pronounOptions.map((option) => (
                <div key={option.id} className="flex items-center gap-x-3">
                  <InputRadio
                    id={option.id}
                    name="pronouns"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-[#d3c1b2]"
                    value={option.value}
                    onChange={(e) => setData(prevData => ({ ...prevData, gender: e.target.value }))}
                  />
                  <label htmlFor={option.id} className="block text-lg font-medium leading-6">
                    {option.label}
                  </label>
                </div>
              ))}

              <div className="flex items-center gap-x-3">
                <TextInput
                  usedefaultclass={false}
                  className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="otherPronoun"
                  type="text"
                  placeholder="Other"
                  value={data.otherPronoun}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                />
              </div>

            </div>
          </div>

          <div className='w-full'>
            <InputLabel
              htmlFor='city'
              value='Your city'
              className='block uppercase tracking-wide text-xl font-bold mb-2 text-white'
            />

            <TextInput
              usedefaultclass={false}
              className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="City"
              onChange={(e) => setData(prevData => ({ ...prevData, city: e.target.value }))}
            />

            {errors.city &&
              <p className="text-[#7d3636] text-lg italic">{errors.city}</p>
            }
          </div>

          <div className="w-full">
            <InputLabel
              htmlFor='availability'
              value='What is your availability for the entire week, from Monday to Sunday?'
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
              value='Contact preference'
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
            className="w-full uppercase rounded-md bg-[#81de7c] px-3 py-2 text-xl font-semibold text-black shadow-sm hover:bg-[#d3c1b2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={(e) => formSubmit(e)}
          >
            Request a quote
          </button>
        </div>
      </form>
    </div>
  )
}