import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


export default function Footer({ social }) {
     const { t } = useTranslation();
    
    return (
        <div className="footer bg-white text-black py-6 px-4 mt-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} {t('footer_information')}</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                
                <div className="flex justify-start space-x-3 mt-4 px-4">
                    {social.instagram && (
                    <a href={social.instagram.url} target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={20} className="text-black" />
                    </a>
                    )}

                    {social.facebook && (
                    <a href={social.facebook.url} target="_blank" rel="noopener noreferrer">
                        <FaFacebookF size={20} className="text-black" />
                    </a>
                    )}
                </div>
                </div>
            </div>
        </div>
    )
}