import {
  useState,
  useReducer,
  FormEvent,
  useEffect,
  useCallback,
  useContext
} from 'react';
import { useRouter } from 'next/router';
import { BlockPicker } from 'react-color';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { produce } from 'immer';

import * as S from '../../styles/pages/Redirect/Edit';
import ItemEdit from '../../components/ItemEdit';
import Button from '../../components/Button';
import { GetServerSideProps } from 'next';
import { api } from '../../services/api';
import { parseCookies } from 'nookies';
import { AuthContext } from '../../contexts/AuthContext';
import { useModalContext } from '../../contexts/ModalContext';
import { Input } from '../../styles/components/Input';
import { useForm, SubmitHandler, set } from 'react-hook-form';
import { useApi } from '../../hooks/useApi';

interface ItemButtonResponseProps {
  name: string;
  link: string;
  animation?: 'shake' | 'color';
  colorTheme?: {
    primary: string;
    secondary: string;
  };
  id: number;
  itemType: 'title' | 'link';
}

interface EditItemFormProps extends ItemButtonResponseProps {}

export default function Redirect() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    unregister
  } = useForm<EditItemFormProps>();

  const watchType = watch('itemType', 'title');

  const [items, setItems] = useState<ItemButtonResponseProps[]>([]);

  const { user, setUser } = useContext(AuthContext);

  const [editMode, toogleEditMode] = useReducer((s) => !s, false);

  useEffect(() => {
    if (items.length < 1) setItems(user.userLinks);
  }, []);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems(
      produce((draft) => {
        const dragged = draft[dragIndex];
        draft.splice(dragIndex, 1);
        draft.splice(hoverIndex, 0, dragged);
      })
    );
  }, []);

  const onChangeText = useCallback((text: string, index: number) => {
    setItems(
      produce((draft) => {
        draft[index].name = text;
      })
    );
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems(
      produce((draft) => {
        draft.splice(index, 1);
      })
    );
  }, []);

  const addItem: SubmitHandler<EditItemFormProps> = async (item) => {
    try {
      const response = await api.put(
        `/api/user/${user.id}`,
        { userLinks: [...items, item] },
        { withCredentials: true }
      );

      setUser((s) => {
        return { ...s, userLinks: [...items, item] };
      });

      setItems([...items, item]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <S.Container>
        <S.ItemsContainer>
          {items.map((item, index) => (
            <ItemEdit
              index={index}
              id={item.id}
              moveCard={moveCard}
              key={index.toString()}
              itemType={item.itemType}
              name={item.name}
              onChangeText={onChangeText}
              removeItem={removeItem}
            />
          ))}
        </S.ItemsContainer>
        {editMode && (
          <S.AddItemFormContainer>
            <form onSubmit={handleSubmit(addItem)}>
              <div>
                <label htmlFor="itemType">Título</label>
                <input
                  {...register('itemType', { required: true })}
                  type="radio"
                  value="title"
                  id="field-title"
                />
                <label htmlFor="itemType">Link</label>
                <input
                  {...register('itemType', { required: true })}
                  type="radio"
                  value="link"
                  id="field-link"
                />
              </div>
              <Input
                {...register('name', { required: true })}
                placeholder="Title"
              />
              {watchType === 'link' && (
                <>
                  <Input
                    placeholder="Link"
                    {...register('link', { required: true })}
                  />
                  <select
                    placeholder=""
                    {...register('animation', { required: true })}
                  >
                    <option value="" disabled selected>
                      Selecione uma animação
                    </option>
                    <option value="shake">Shake</option>
                    <option value="color">Color</option>
                  </select>
                </>
              )}
              <Button type="submit" title="Criar"></Button>
            </form>
          </S.AddItemFormContainer>
        )}
        <Button
          title={!editMode ? 'Adicionar' : 'Cancelar'}
          onClick={() => toogleEditMode()}
        >
          Adicionar novo item
        </Button>
      </S.Container>
    </DndProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/index',
        permanent: false
      }
    };
  }

  return { props: {} };
};
