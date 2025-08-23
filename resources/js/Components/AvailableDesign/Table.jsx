import TableRow from '@/Components/AvailableDesign/TableRow';
import { ArrowsUpDownIcon } from '@heroicons/react/24/solid';
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';

export default function Table({ items, onDragEnd, direction = "vertical" }) {
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <ArrowsUpDownIcon className="w-5 h-5 text-gray-400" />
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Availability
            </th>
            <th scope="col" className="px-6 py-3">
              Active
            </th>
            <th scope="col" className="px-6 py-3" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
          <Droppable droppableId="available-design-table" direction={direction}>
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