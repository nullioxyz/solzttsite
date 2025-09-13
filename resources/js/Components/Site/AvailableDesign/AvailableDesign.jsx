import { useEffect, useRef, useState } from 'react'
import axios from '@/Services/requests'
import { Card, Spinner } from "@material-tailwind/react";
import anime from 'animejs';
import { useSelectReferences } from '@/Contexts/SelectReferencesContext';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react'
import { SkeletonCard } from '@/Components/Skeleton/SkeletonCard';
import { Thumb } from '../Components/Thumb';

export default function AvailableDesign() {
  const boxRefs = useRef([]);
  const [designs, setDesigns] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [newItems, setNewItems] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { t } = useTranslation();

  const initialPage = Number(new URLSearchParams(window.location.search).get("page") || 1);

  const handleDesigns = async (page = null) => {
    setLoadingMore(true);
    
    try {
      const url =
        page !== null
          ? route("site.available_designs.load", { locale: "lang", page })
          : pagination.next_page_url ?? route("site.available_designs.load", "lang");

      const response = await axios.get(url);

      if (response.data) {
        const { data, first_page, current_page, last_page, next_page_url } = response.data.designs;
        const { currentLang } = response.data;

        setNewItems(data);
        setDesigns(prevDesigns => {
          // merge sem duplicar
          const merged = [...prevDesigns, ...data];
          return Array.from(new Map(merged.map(item => [item.id, item])).values());
        });

        setCurrentLanguage(currentLang);
        setPagination({
          current_page,
          first_page,
          last_page,
          next_page_url,
        });

        // atualiza a URL com Inertia
        router.get(
          window.location.pathname + `?page=${current_page}`,
          {},
          {
            replace: true,
            preserveScroll: true,
            preserveState: true,
          }
        );
      }
    } catch (error) {
      console.error("Error fetching designs:", error);
    } finally {
      setLoadingMore(false);
    }
  };
  
  useEffect(() => {
    if (isInitialLoad) {
      handleDesigns(initialPage).finally(() => setIsInitialLoad(false));
    }
  }, [isInitialLoad]);

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

  return (
    <section id="available" className="flex flex-col justify-between xl:mt-20 lg:mt-20 md:mt-20 sm:mt-5 xs:mt-5 h-auto px-5 py-10">
      <div className="max-w-[1240px] mx-auto w-full">
        
        <div className="mb-10">
          <h1 className="text-[2.0rem] tracking-tight text-[#595954] lg:text-center xl:text-left md:text-center sm:text-center xs:text-center text-center">
            {t('available')}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xs:grid-cols-2 md:grid-cols-2 gap-x-3 gap-y-4 mb-24">
          {isInitialLoad && designs.length === 0 ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`sk_${i}`} />)
          ) : (
            <>
              {designs.length > 0 && designs.map((item, index) => (
                <Card
                  key={index}
                  className="
                    relative w-full rounded-none 
                    aspect-[3/4]
                    lg:h-[800px] xl:h-[800px] 
                    cursor-pointer overflow-hidden
                  "
                >
                  <a href={route('site.available_designs.show', { locale: currentLanguage.slug, slug: item.slug })}>
                    <div className="w-full h-full">
                      <Thumb
                        uuid={item.media[0].uuid}
                        alt={item.translation ? item.translation.title : item.default_translation.title}
                        className={`object-cover w-full h-full ${!item.available ? 'grayscale' : ''}`}
                        loading="lazy"
                      />
                    </div>
                  </a>
                </Card>
              ))}
            </>
          )}
        </div>
  
        {pagination.current_page < pagination.last_page && (
          <div className="flex justify-center mb-10">
            <button
              className="px-6 py-3 bg-[#595954] text-white text-lg hover:bg-[#fff] hover:text-[#595954] transition duration-300 uppercase border-[#595954] border"
              onClick={() => handleDesigns()}
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
