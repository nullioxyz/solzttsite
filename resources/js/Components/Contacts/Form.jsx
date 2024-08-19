import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import { Gallery } from '../Files/Gallery';
import Swal from 'sweetalert2';


export default function Form(props) {

  const { data, setData, post, processing, errors, reset } = useForm({
    read: props.data ? props.data.read : false,
    firstname: props.data.firstname,
    lastname: props.data.lastname,
    email: props.data.email,
    phone: props.data.phone,
    contact_me_by: props.data.contact_me_by,
    tattoo_idea: props.data.tattoo_idea,
    references: props.data.references,
    size: props.data.size,
    body_location: props.data.body_location,
    gender: props.data.gender,
    city: props.data.city,
    availability: props.data.availability,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('contact.update', props.data.slug), {
      preserveScroll: true,
      data: data,
      onSuccess: () => {
        Swal.fire({
          title: "Saved!",
          text: "Your record has been saved.",
          icon: "success"
        });
      },
      onError: (errors) => {
        console.log(errors);
      },
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">


        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <div className="space-y-6">
            <div className="item">
              <h3 className="font-semibold text-lg">Name:</h3>
              <p className="text-gray-700">{data.firstname} {data.lastname}</p>
            </div>

            <div className="item">
              <h3 className="font-semibold text-lg">Email:</h3>
              <p className="text-gray-700">{data.email}</p>
            </div>

            <div className="item">
              <h3 className="font-semibold text-lg">Phone:</h3>
              <p className="text-gray-700">{data.phone}</p>
            </div>

            <div className="item">
              <h3 className="font-semibold text-lg">Contact method:</h3>
              <p className="text-gray-700">{data.contact_me_by}</p>
            </div>

            <div className="item">
              <h3 className="font-semibold text-lg">Tattoo idea:</h3>
              <p className="text-gray-700">{data.tattoo_idea}</p>
            </div>

            <div className="item">
              <h3 className="font-semibold text-lg">Size:</h3>
              <p className="text-gray-700">{data.size}</p>
            </div>

            <div className="item">
              <h3 className="font-semibold text-lg">References:</h3>
              <p className="text-gray-700">{data.references}</p>
            </div>

            <div className="item">
              <h3 className="font-semibold text-lg">Body location:</h3>
              <p className="text-gray-700">{data.body_location}</p>
            </div>

            <div className="item">
              <h3 className="font-semibold text-lg">Pronoun:</h3>
              <p className="text-gray-700">{data.gender}</p>
            </div>

            <div className="item">
              <h3 className="font-semibold text-lg">City:</h3>
              <p className="text-gray-700">{data.city}</p>
            </div>

            <div className="item">
              <h3 className="font-semibold text-lg">Availability:</h3>
              <p className="text-gray-700">{data.availability}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}