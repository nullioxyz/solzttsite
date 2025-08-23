import TableRow from '@/Components/Portfolio/TableRow';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ArrowsUpDownIcon } from '@heroicons/react/24/solid';

export default function Table({ items, onReorder }) {
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const next = Array.from(items);
    const [moved] = next.splice(result.source.index, 1);
    next.splice(result.destination.index, 0, moved);
    onReorder(next);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
                <ArrowsUpDownIcon className="w-5 h-5 text-gray-400" />
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
         <Droppable droppableId="portfolio-table" direction="vertical">
          {(provided) => (
            <tbody ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={String(item.slug)} index={index}>
                  {(provided, snapshot) => (
                    <TableRow
                      ref={provided.innerRef}
                      dragProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      dragging={snapshot.isDragging}
                      index={index}
                      item={item}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>

  )
}