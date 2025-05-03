import { lazy, useEffect, useRef, useState, Suspense } from 'react'
import axios from '@/Services/requests'
import { Spinner } from "@material-tailwind/react";
import anime from 'animejs';
import { useSelectReferences } from '@/Contexts/SelectReferencesContext';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react'


const LazyImageModalComponent = lazy(() => import('@/Components/Site/Components/ImageToModal'))

export default function AvailableDesign() {
  const boxRefs = useRef([]);
  const [designs, setDesigns] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [newItems, setNewItems] = useState([]);
  const { t } = useTranslation();

  const { addAsReference, setSelectedReferences } = useSelectReferences();

  const handleDesigns = async () => {
    setLoadingMore(true);
    
    try {
      const response = await axios.get(pagination.next_page_url ?? route('site.available_designs.load', 'lang'));
      
      if (response.data) {
        const { data, first_page, current_page, last_page, next_page_url } = response.data.designs;
        
        setNewItems(data);
        setDesigns(prevDesigns => [...prevDesigns, ...data]);
        
        setPagination({
          current_page,
          first_page,
          last_page,
          next_page_url
        });
      }
    } catch (error) {
      console.error("Error fetching designs:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleAddAsReference = (item) => {
    setSelectedReferences([]);
    
    addAsReference({
      id: item.id,
      image: route('file.index', {locale: 'lang', uuid: item.media[0].uuid}),
      name: item.translation ? item.translation.title : item.default_translation.title,
      type: 'available_design',
    });
  };

  useEffect(() => {
    if (newItems.length > 0) {
      boxRefs.current = boxRefs.current.slice(0, designs.length);

      anime({
        targets: boxRefs.current.slice(-newItems.length),
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: (el, i) => i * 100,
      });

      setNewItems([]);
    }
  }, [newItems, designs.length]);

  useEffect(() => {
    handleDesigns();
  }, []);

  const handleBookNow = async (item) => {
    handleAddAsReference(item);
    
    setTimeout(() => {
      router.visit(route('site.contact', 'lang'));
    }, 1000)
  }

  return (
    <section id="available" className="flex flex-col justify-between h-auto mx-auto p-5">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-4">
          <div className="lg:text-left sm:text-center custom:text-center md:text-center">
            <div className="title uppercase">
              <h1 className='text-5xl tracking-tight montSerratBold text-black'>{t('available')}</h1>
            </div>
          </div>

          <div className="lg:text-left sm:text-left custom:text-left md:text-left">
            <Link
              href="/"
              className="text inline-flex m-2 text-gray-600 hover:text-black transition"
            >
              {t('back_to_home')}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-10 mb-24">
          <Suspense fallback={<Spinner />}>
            {designs.length > 0 && designs.map((item, index) => (
              <LazyImageModalComponent
              key={`available_${item.id}`}
                book={true}
                title={item.translation ? item.translation.title : item.default_translation.title}
                description={item.translation ? item.translation.description : item.default_translation.description}
                coverImage={route('file.index', {locale: 'lang', uuid: item.media[0].uuid})}
                images={item.media}
                onAddReference={() => handleAddAsReference(item)}
                onBookNow={() => handleBookNow(item)}
                itemId={item.id}
                available={item.available}
                alt={`Image ${index + 1}`}
                availableDesign={true}
                reference={el => boxRefs.current[index] = el}
              />
            ))}
          </Suspense>
        </div>

        {pagination.current_page < pagination.last_page && (
          <div className="flex justify-center mb-10">
            <button
              className="px-6 py-3 bg-[#272533] text-white text-lg rounded-full hover:bg-[#9a7cae] transition duration-300 uppercase"
              onClick={handleDesigns}
              disabled={loadingMore}
              aria-label={t('load_more')}
              title={t('load_more')}
            >
              {!loadingMore ? t('load_more') : <Spinner />}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
