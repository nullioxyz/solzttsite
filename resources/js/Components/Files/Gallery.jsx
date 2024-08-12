import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

export function Gallery({ files, onDelete }) {
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {files.map(({ original_url, name, uid, id }, index) => (
                <div key={index} className="flex flex-col items-center">
                    <img
                        className="h-40 max-w-full rounded-lg object-cover object-center shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                        src={original_url}
                        alt={name || "Image"}
                    />
                    <div className="flex space-x-2 mt-2">
                        <IconButton
                            size="md"
                            color="red"
                            className="bg-white text-red-500 hover:bg-red-50"
                            onClick={() => onDelete(id)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                    </div>
                </div>
            ))}
        </div>
    );
}
