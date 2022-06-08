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
import { Bar } from 'react-chartjs-2';
import { useTheme } from 'styled-components';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  const data = useMemo(() => {
    return {
      labels: regions.map((item) => item.city),
      datasets: [
        {
          label: 'Regiões',
          data: regions.map((item) => item.amount),
          backgroundColor: theme.colors.primary,
          color: theme.colors.primary
        }
      ]
    };
  }, [regions]);

  if (!isAuthenticated) return <></>;

  return (
    <Container>
      <h1>
        Os usuários que acessaram o seu link de whatsapp estão nas seguintes
        regiões:
      </h1>
      <section>
        {getUserStatsApi.loading ? (
          <ReactLoading type="spin" />
        ) : (
          regions.length > 0 && (
            <Bar
              data={data}
              options={{ responsive: true, color: theme.colors.primary }}
              style={{
                backgroundColor: theme.colors.grey
              }}
            />
          )
        )}
      </section>
    </Container>
  );
}
