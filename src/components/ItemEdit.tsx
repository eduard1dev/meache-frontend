import * as S from '../styles/components/ItemEdit';
import { useDrag, useDrop } from 'react-dnd';
import { FormEventHandler, useRef } from 'react';
import { Identifier, XYCoord } from 'dnd-core';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface ItemEditProps {
  id: number;
  index: number;
  moveCard: (hoverIndex: number, dragIndex: number) => void;
  name: string;
  onChangeText: (text: string, index: number) => void;
  removeItem: (index: number) => void;
  itemType: 'link' | 'title';
  colorTheme?: {
    primary: string;
    secondary: string;
  };
}

interface TitleItemProps {
  index: number;
  name: string;
  onChangeText: (text: string, index: number) => void;
  removeItem: (index: number) => void;
}

function TitleItem({ index, name, onChangeText, removeItem }: TitleItemProps) {
  return (
    <>
      <S.TitleItemContainer
        value={name}
        onChange={(event) => onChangeText(event.target.value, index)}
      />
      <S.ButtonRemoveItem onClick={() => removeItem(index)} title="X" />
    </>
  );
}

function LinkItem({ name, removeItem, index, colorTheme }) {
  return (
    <>
      <S.LinkItemContainer colorTheme={colorTheme}>{name}</S.LinkItemContainer>
      <S.ButtonRemoveItem onClick={() => removeItem(index)} title="X" />
    </>
  );
}

export default function ItemEdit({
  id,
  index,
  moveCard,
  name,
  onChangeText,
  removeItem,
  itemType,
  colorTheme
}: ItemEditProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'ItemEdit',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex == hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'ItemEdit',
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  const item = {
    title: TitleItem({ index, name, onChangeText, removeItem }),
    link: LinkItem({ name, removeItem, index, colorTheme })
  };

  return (
    <S.ItemContainer ref={ref} isDragging={isDragging}>
      {item[itemType]}
    </S.ItemContainer>
  );
}
