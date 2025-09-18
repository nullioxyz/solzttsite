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

  const getReservedDesign = () => {
    return data.reservedDesign.find(() => true);
  }

  const reservedDesign = getReservedDesign();

  const handleUnavailableDesign = async () => {
    Swal.fire({
      title: "Do you confirm unavailability of this design?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        
        axios.post(route('available_design.changeAvailability', getReservedDesign().slug), {
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

            {data.media && data.media.length ? (
              <div className="item">
                <h3 className="font-semibold text-lg">
                  References
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data.media?.map((file, index) => (
                    <React.Fragment key={index}>
                      <div key={index} className="p-2">
                        <a target='_blank' href={route('file.index', {'locale': 'lang', 'uuid': file.uuid})}>
                          <img
                            src={route('file.index', {'locale': 'lang', 'uuid': file.uuid})}
                            alt={`Reserved Design Image ${index + 1}`}
                            className="w-full h-[200px] object-cover rounded"
                          />
                        </a>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : null}

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

            {data.portfolioReferences && data.portfolioReferences.length ? (
              <div className="item">
                <h3 className="font-semibold text-lg">
                  Portfolio References
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data.portfolioReferences?.map((design, index) => (
                    <React.Fragment key={index}>
                      {design.media?.map((image, imgIndex) => (
                        <div key={imgIndex} className="p-2">
                          <img
                            src={route('file.index', {'locale': 'lang', 'uuid': uuid})}
                            alt={`Reserved Design Image ${imgIndex + 1}`}
                            className="w-full h-[200px] object-cover rounded"
                          />
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : null}

            {data.reservedDesign && data.reservedDesign.length ? (
              <div className="item">
                <h3 className="font-semibold text-lg">
                  Reserved Design
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data.reservedDesign?.map((design, index) => (
                    <React.Fragment key={index}>
                      {design.media?.map((image, imgIndex) => (
                        <div key={imgIndex} className="p-2">
                          <img
                            src={route('file.index', {'locale': 'lang', 'uuid': uuid})}
                            alt={`Reserved Design Image ${imgIndex + 1}`}
                            className="w-full h-[200px] object-cover rounded"
                          />
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>

                {reservedDesign.available ? (
                  <div className="mt-5 ml-2">
                    <PrimaryButton onClick={() => handleUnavailableDesign() }>Change availability of this design</PrimaryButton>
                  </div>
                ) :
                  <div className="mt-5 ml-2">
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