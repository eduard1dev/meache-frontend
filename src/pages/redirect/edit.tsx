import { useReducer, useEffect, useCallback, useContext } from 'react';
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
import { AuthContext, UserLinkProps } from '../../contexts/AuthContext';
import { Input } from '../../styles/components/Input';
import { useForm, SubmitHandler, set } from 'react-hook-form';

interface EditItemFormProps extends UserLinkProps {}

export default function Redirect() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<EditItemFormProps>({ defaultValues: { itemType: 'title' } });

  const watchType = watch('itemType', 'title');

  const { user, setUser } = useContext(AuthContext);

  const [editMode, toogleEditMode] = useReducer((s) => !s, false);

  const [isSaveLoading, toogleSaveLoading] = useReducer((s) => !s, false);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setUser(
      produce((draft) => {
        const dragged = draft.userLinks[dragIndex];
        draft.userLinks.splice(dragIndex, 1);
        draft.userLinks.splice(hoverIndex, 0, dragged);
      })
    );
  }, []);

  const onChangeText = useCallback((text: string, index: number) => {
    setUser(
      produce((draft) => {
        draft.userLinks[index].name = text;
      })
    );
  }, []);

  const removeItem = useCallback((index: number) => {
    setUser(
      produce((draft) => {
        draft.userLinks.splice(index, 1);
      })
    );
  }, []);

  const addItem: SubmitHandler<EditItemFormProps> = useCallback((item) => {
    setUser(
      produce((draft) => {
        draft.userLinks.push(item);
      })
    );
  }, []);

  async function saveItems() {
    toogleSaveLoading();
    try {
      const response = await api.put(
        `/api/user/${user.id}`,
        { userLinks: user.userLinks },
        { withCredentials: true }
      );
      toogleSaveLoading();
    } catch (err) {
      toogleSaveLoading();
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <S.Container>
        <S.ItemsContainer>
          {user.userLinks.map((item, index) => (
            <ItemEdit
              index={index}
              id={index}
              moveCard={moveCard}
              key={item._id}
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
                <input
                  {...register('itemType', { required: true })}
                  type="radio"
                  value="title"
                  id="field-title"
                />
                <label htmlFor="field-title">Título</label>
                <input
                  {...register('itemType', { required: true })}
                  type="radio"
                  value="link"
                  id="field-link"
                />
                <label htmlFor="field-link">Link</label>
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
                    defaultValue=""
                    placeholder="animation"
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
        />
        <Button
          title="Salvar"
          onClick={() => saveItems()}
          disabled={isSaveLoading}
          loading={isSaveLoading}
        />
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
