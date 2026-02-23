import React from 'react';
import PrimaryButton from '../PrimaryButton';
import axios from '@/Services/requests';
import Swal from 'sweetalert2';

export default function Form(props) {

  const data = {
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
    portfolioReferences: props.data.portfolio_references,
    reservedDesign: props.data.reserved_design,
    media: props.data.media,
  };

  const reservedDesign = Array.isArray(data.reservedDesign) ? data.reservedDesign[0] : null;
  const displayValue = (value) => (value === null || value === undefined || value === '' ? '-' : value);

  const handleUnavailableDesign = async () => {
    if (!reservedDesign?.slug) return;

    Swal.fire({
      title: "Do you confirm unavailability of this design?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        
        axios.post(route('available_design.changeAvailability', reservedDesign.slug), {
          available: false
        });

        Swal.fire({
          title: "design unavailable!",
          text: "You have changed the design's availability.",
          icon: "success"
        });
      }
    });
  }

  return (
    <>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
            <h3 className="text-sm font-semibold text-slate-700">Contact Details</h3>
            <p className="text-xs text-slate-500">Full submission data from the contact form.</p>
          </div>
          <div className="space-y-6 p-5 sm:p-7">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</p>
                <p className="mt-1 text-sm font-medium text-slate-800 break-words">{displayValue(`${data.firstname || ''} ${data.lastname || ''}`.trim())}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
                <p className="mt-1 text-sm font-medium text-slate-800 break-all">{displayValue(data.email)}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
                <p className="mt-1 text-sm font-medium text-slate-800 break-words">{displayValue(data.phone)}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contact Method</p>
                <p className="mt-1 text-sm font-medium text-slate-800 break-words">{displayValue(data.contact_me_by)}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Size</p>
                <p className="mt-1 text-sm font-medium text-slate-800 break-words">{displayValue(data.size)}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Body Location</p>
                <p className="mt-1 text-sm font-medium text-slate-800 break-words">{displayValue(data.body_location)}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pronoun</p>
                <p className="mt-1 text-sm font-medium text-slate-800 break-words">{displayValue(data.gender)}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">City</p>
                <p className="mt-1 text-sm font-medium text-slate-800 break-words">{displayValue(data.city)}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Availability</p>
                <p className="mt-1 text-sm font-medium text-slate-800 break-words">{displayValue(data.availability)}</p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white">
              <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tattoo Idea</p>
              </div>
              <div className="px-4 py-4">
                <p className="max-h-72 overflow-y-auto whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700 pr-2">
                  {displayValue(data.tattoo_idea)}
                </p>
              </div>
            </div>

            {data.media && data.media.length ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">References</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {data.media?.map((file, index) => (
                    <React.Fragment key={index}>
                      <div key={index} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-2">
                        <a target="_blank" rel="noreferrer" href={route('file.index', {'locale': 'lang', 'uuid': file.uuid})}>
                          <img
                            src={route('file.index', {'locale': 'lang', 'uuid': file.uuid})}
                            alt={`Reserved Design Image ${index + 1}`}
                            className="h-[180px] w-full rounded object-cover"
                          />
                        </a>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : null}

            {data.portfolioReferences && data.portfolioReferences.length ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Portfolio References</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {data.portfolioReferences?.map((design, index) => (
                    <React.Fragment key={index}>
                      {design.media?.map((image, imgIndex) => (
                        <div key={imgIndex} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-2">
                          <img
                            src={route('file.index', {'locale': 'lang', 'uuid': image.uuid})}
                            alt={`Reserved Design Image ${imgIndex + 1}`}
                            className="h-[180px] w-full rounded object-cover"
                          />
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : null}

            {data.reservedDesign && data.reservedDesign.length ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Reserved Design</h3>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {data.reservedDesign?.map((design, index) => (
                    <React.Fragment key={index}>
                      {design.media?.map((image, imgIndex) => (
                        <div key={imgIndex} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-2">
                          <img
                            src={route('file.index', {'locale': 'lang', 'uuid': image.uuid})}
                            alt={`Reserved Design Image ${imgIndex + 1}`}
                            className="h-[180px] w-full rounded object-cover"
                          />
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>

                {reservedDesign?.available ? (
                  <div className="pt-1">
                    <PrimaryButton onClick={() => handleUnavailableDesign() }>Change availability of this design</PrimaryButton>
                  </div>
                ) :
                  <div className="pt-1">
                    <PrimaryButton disabled={true}>Unavailable design</PrimaryButton>
                  </div>
                }

              </div>
            ): null}
          </div>
        </div>
      </div>
    </>
  )
}
