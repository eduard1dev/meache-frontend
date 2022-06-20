import Link from 'next/link';
import {
  useState,
  useReducer,
  FormEvent,
  useContext,
  useEffect,
  useMemo
} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';
import { useApi } from '../hooks/useApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import { Container } from '../styles/pages/UserStats';
import { useTheme } from 'styled-components';
import DataTable from 'react-data-table-component';

interface IRegions {
  country: string;
  city: string;
  state: string;
  amount: number;
  _id: string;
}

export default function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [regions, setRegions] = useState<IRegions[]>([]);
  const theme = useTheme();

  const getUserStats = () => api.get(`/api/stats/${user.id}`);
  const getUserStatsApi = useApi(getUserStats);

  useEffect(() => {
    const getStats = () => {
      getUserStatsApi
        .request()
        .then(({ accessAdressList }: { accessAdressList: IRegions[] }) => {
          if (accessAdressList.length > 0) {
            setRegions(accessAdressList);
          }
        });
    };

    if (user.id) getStats();
  }, [user.id]);

  const columns = useMemo(() => {
    return [
      { name: 'País', selector: (row) => row.country },
      { name: 'Estado', selector: (row) => row.state },
      { name: 'Cidade', selector: (row) => row.city },
      {
        name: 'Acessos',
        selector: (row) => row.amount,
        sortable: true
      }
    ];
  }, []);

  if (!isAuthenticated) return <></>;

  return (
    <Container>
      {getUserStatsApi.loading ? (
        <ReactLoading type="spin" color={theme.colors.text} />
      ) : (
        <section>
          <h1>
            Os usuários que acessaram o seu link de whatsapp estão nas seguintes
            regiões:
          </h1>
          {regions.length > 0 && (
            <DataTable
              data={regions}
              columns={columns}
              responsive
              defaultSortAsc={false}
              defaultSortFieldId={4}
              customStyles={{
                table: {
                  style: {
                    borderRadius: 8
                  }
                },
                headRow: {
                  style: {
                    borderRadius: 8,
                    backgroundColor: theme.colors.primary,
                    fontFamily: theme.fonts.strong,
                    fontSize: 16,
                    color: theme.colors.text_inner
                  }
                },
                rows: {
                  style: {
                    borderRadius: 8,
                    fontFamily: theme.fonts.normal,
                    fontSize: 16
                  }
                }
              }}
            />
          )}
        </section>
      )}
    </Container>
  );
}
