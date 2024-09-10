import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export function Gallery({ files, onDelete, onReorder }) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedFiles = Array.from(files);
    const [movedItem] = reorderedFiles.splice(result.source.index, 1);
    
    reorderedFiles.splice(result.destination.index, 0, movedItem);

    const orderArray = reorderedFiles.map((file, index) => ({
      id: file.id,
      order_column: index + 1,
    }));
  
    onReorder(orderArray, reorderedFiles);
  };


  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div
            className="grid grid-cols-4 gap-4 p-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {files.map(({ original_url, name, uuid, id }, index) => (
              <Draggable key={id} draggableId={id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex flex-col items-center"
                  >
                    <img
                      className="h-40 max-w-full rounded-lg object-cover object-center shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                      src={route('file.index', {'locale': 'lang', 'uuid': uuid})}
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
